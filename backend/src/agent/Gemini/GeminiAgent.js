import { GoogleGenAI } from "@google/genai";

export class GeminiAgent {
	/**
	 * @param {any} chatClient - The chat client instance.
	 * @param {any} channel - The chat channel instance.
	 */
	constructor(chatClient, channel) {
		this.chatClient = chatClient;
		this.channel = channel;
		this.ai = null;
		this.lastInteractionTs = Date.now();
	}

	/**
	 * Disposes of the GeminiAgent resources.
	 * @returns {Promise<void>}
	 */
	dispose = async () => {
		this.chatClient.off("message.new", this.handleMessage);
		await this.chatClient.disconnectUser();
		console.log("GeminiAgent disposed.");
	};

	/**
	 * Returns the timestamp of the last interaction.
	 * @returns {number}
	 */
	getLastInteraction = () => this.lastInteractionTs;

	/**
	 * Initializes the GeminiAgent by setting up the API key.
	 * @returns {Promise<void>}
	 * @throws {Error} If the Gemini API key is not found.
	 */
	init = async () => {
		const apiKey = process.env.GEMINI_API_KEY;
		if (!apiKey) {
			console.error("GEMINI_API_KEY environment variable is missing.");
			throw new Error("Gemini API key is required");
		}

		this.ai = new GoogleGenAI({ apiKey: apiKey });
		this.chatClient.on("message.new", this.handleMessage);
		console.log("GeminiAgent initialized. Listening for messages.");
	};

	/**
	 * Handles incoming chat messages, processes them with Gemini, and sends back responses.
	 * @param {object} e - The event object containing message details.
	 * @returns {Promise<void>}
	 */
	handleMessage = async (e) => {
		if (!this.ai) {
			console.error("Gemini AI client is not initialized.");
			return;
		}

		if (
			!e.message ||
			e.message.ai_generated ||
			!e.message.text ||
			e.message.text.trim() === ""
		) {
			return;
		}

		const rawMessageText = e.message.text;
		this.lastInteractionTs = Date.now();

		const aiKeyword = "@ai";
		if (!rawMessageText.toLowerCase().startsWith(aiKeyword)) {
			return;
		}

		let messageContent = rawMessageText.substring(aiKeyword.length).trim();
		if (!messageContent) {
			return;
		}
		console.log(`Processing message with AI keyword: "${messageContent}"`);

		const conversationHistory = this.channel.state.messages
			.slice(-5)
			.filter((msg) => msg.text && msg.text.trim() !== "")
			.map((msg) => {
				let text = msg.text || "";
				if (
					!msg.user?.id.startsWith("ai-bot") &&
					text.toLowerCase().startsWith(aiKeyword)
				) {
					text = text.substring(aiKeyword.length).trim();
				}
				if (
					msg.user?.id.startsWith("ai-bot") &&
					text.includes("[Response truncated]")
				) {
					text = text.split("[Response truncated]")[0].trim();
				}
				return {
					role: msg.user?.id.startsWith("ai-bot") ? "model" : "user",
					parts: [{ text: text }],
				};
			});

		const conciseInstruction =
			"Please keep your answer concise and to the point: ";
		const finalPromptForGemini = conciseInstruction + messageContent;

		conversationHistory.push({
			role: "user",
			parts: [{ text: finalPromptForGemini }],
		});

		let channelMessage = null;

		try {
			const { message: sentChannelMessage } =
				await this.channel.sendMessage({
					text: "",
					ai_generated: true,
				});
			channelMessage = sentChannelMessage;

			try {
				await this.channel.sendEvent({
					type: "ai_indicator.update",
					ai_state: "AI_STATE_THINKING",
					message_id: channelMessage.id,
				});
			} catch (error) {
				console.error("Failed to send AI thinking indicator:", error);
			}

			await new Promise((resolve) => setTimeout(resolve, 750));

			const result = await this.ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: conversationHistory,
				config: {
					maxOutputTokens: 2048,
					temperature: 0.7,
				},
			});

			let responseText = "Sorry, I couldn't generate a response.";
			let finishReason = null;

			if (result && result.candidates && result.candidates.length > 0) {
				const candidate = result.candidates[0];
				finishReason = candidate.finishReason;

				if (
					candidate.content &&
					candidate.content.parts &&
					candidate.content.parts.length > 0 &&
					typeof candidate.content.parts[0].text === "string"
				) {
					responseText = candidate.content.parts[0].text;
				} else {
					console.error(
						"Gemini candidate content or text was missing/invalid."
					);
				}
			} else {
				console.error(
					"Gemini response did not contain any candidates."
				);
				if (
					result &&
					result.promptFeedback &&
					result.promptFeedback.blockReason
				) {
					responseText = `AI blocked response due to: ${result.promptFeedback.blockReason}`;
				} else {
					responseText =
						"AI generated no candidates for the given prompt or an unexpected error occurred.";
				}
			}

			if (finishReason === "LENGTH") {
				const truncationNotice =
					"\n\n[Response truncated. Please ask a shorter question or break it into parts.]";
				responseText += truncationNotice;
				console.warn(
					"Gemini response was truncated due to LENGTH. Appending notice."
				);
			}

			if (responseText) {
				await this.chatClient.partialUpdateMessage(channelMessage.id, {
					set: { text: responseText, generating: false },
				});
			} else {
				console.warn(
					"Final response text was empty after all processing."
				);
				await this.chatClient.partialUpdateMessage(channelMessage.id, {
					set: {
						text: "Sorry, I couldn't generate a response.",
						generating: false,
					},
				});
			}

			await this.channel.sendEvent({
				type: "ai_indicator.clear",
				message_id: channelMessage.id,
			});
		} catch (error) {
			console.error(
				"Error during Gemini content generation or message handling:",
				error
			);

			try {
				if (channelMessage) {
					const errorMessageForUser = `Error: ${
						error.message || "Failed to get a response from AI."
					}`;
					await this.chatClient.partialUpdateMessage(
						channelMessage.id,
						{
							set: {
								text: errorMessageForUser,
								generating: false,
							},
						}
					);
					await this.channel.sendEvent({
						type: "ai_indicator.update",
						ai_state: "AI_STATE_ERROR",
						message_id: channelMessage.id,
					});
				}
			} catch (eventError) {
				console.error("Failed to send error indicator:", eventError);
			}
		}
	};
}
