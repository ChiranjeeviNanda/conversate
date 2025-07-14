import { createAgent } from "../Agent/CreateAgent.js";
import { streamClient, upsertStreamUser } from "../lib/stream.js";

/**
 * @typedef {import('../agents/types.js').AIAgent} AIAgent
 */

// Map to store the AI Agent instances, keyed by user ID (ai-bot-channelId)
/** @type {Map<string, AIAgent>} */
const aiAgentCache = new Map();
/** @type {Set<string>} */
const pendingAiAgents = new Set();

const inactivityThreshold = 480 * 60 * 1000;

setInterval(async () => {
	const now = Date.now();
	for (const [userId, aiAgent] of aiAgentCache) {
		if (now - aiAgent.getLastInteraction() > inactivityThreshold) {
			console.log(`Disposing AI Agent due to inactivity: ${userId}`);
			await disposeAiAgent(aiAgent, userId);
			aiAgentCache.delete(userId);
		}
	}
}, 5000);

async function disposeAiAgent(aiAgent, userId) {
	await aiAgent.dispose();

	const channel = streamClient.channel(
		aiAgent.channel.type,
		aiAgent.channel.id
	);
	await channel.removeMembers([userId]);
	console.log(`AI Agent ${userId} removed from channel ${channel.id}.`);
}

export const getAgentStatus = (req, res) => {
	res.json({
		message: "GetStream AI Server is running",
		activeAgents: aiAgentCache.size,
	});
};

export const startAiAgent = async (req, res) => {
	const { channel_id, channel_type = "messaging" } = req.body;

	if (!channel_id) {
		res.status(400).json({ error: "Missing required fields: channel_id" });
		return;
	}

	let channel_id_updated = channel_id;
	if (channel_id.includes(":")) {
		const parts = channel_id.split(":");
		if (parts.length > 1) {
			channel_id_updated = parts[1];
		}
	}

	const user_id = `ai-bot-${channel_id_updated.replace(/!/g, "")}`;

	const botName = "AI Assistant";
	const botImage = "https://www.svgrepo.com/show/374555/bot.svg";

	try {
		if (!aiAgentCache.has(user_id) && !pendingAiAgents.has(user_id)) {
			pendingAiAgents.add(user_id);

			await upsertStreamUser({
				id: user_id,
				name: botName,
				image: botImage,
				role: "admin",
			});
			console.log(
				`AI Bot user upserted with name: ${botName} and image: ${botImage}`
			);

			const agent = await createAgent(
				user_id,
				channel_type,
				channel_id_updated
			);

			const adminChannel = streamClient.channel(
				channel_type,
				channel_id_updated
			);
			try {
				await adminChannel.addMembers([user_id]);
				console.log(
					`AI Bot ${user_id} added to channel ${channel_id_updated} via admin client.`
				);
			} catch (error) {
				console.error(
					"Failed to add members to channel (admin client):",
					error
				);
			}

			if (aiAgentCache.has(user_id)) {
				console.log(
					`Duplicate AI Agent ${user_id} detected, disposing new instance.`
				);
				await agent.dispose();
			} else {
				aiAgentCache.set(user_id, agent);

				// Send welcome message from the bot
				try {
					// Use agent.channel.sendMessage directly, as agent.channel is the bot's channel instance
					await agent.channel.sendMessage({
						text: `Hello! I'm your AI Assistant. To get my attention, please start your message with \`@ai\` followed by your question.`,
						user: { id: user_id, name: botName, image: botImage }, // Ensure message is from the bot
						ai_generated: true, // Mark as AI-generated
					});
					console.log(
						`AI Assistant welcome message sent to channel ${channel_id_updated}.`
					);
				} catch (messageError) {
					console.error(
						"Failed to send AI Assistant welcome message:",
						messageError
					);
				}
			}
			console.log(`AI Agent ${user_id} started successfully.`);
		} else {
			console.log(`AI Agent ${user_id} already active or pending.`);
		}

		res.json({ message: "AI Agent started", data: [] });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : String(error);
		console.error("Failed to start AI Agent:", errorMessage);
		res.status(500).json({
			error: "Failed to start AI Agent",
			reason: errorMessage,
		});
	} finally {
		pendingAiAgents.delete(user_id);
	}
};

export const stopAiAgent = async (req, res) => {
	const { channel_id } = req.body;
	try {
		const userId = `ai-bot-${channel_id.replace(/!/g, "")}`;
		const aiAgent = aiAgentCache.get(userId);
		if (aiAgent) {
			await disposeAiAgent(aiAgent, userId);
			aiAgentCache.delete(userId);
			console.log(`AI Agent ${userId} stopped successfully.`);
		} else {
			console.log(`AI Agent ${userId} not found or already stopped.`);
		}
		res.json({ message: "AI Agent stopped", data: [] });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : String(error);
		console.error("Failed to stop AI Agent:", errorMessage);
		res.status(500).json({
			error: "Failed to stop AI Agent",
			reason: errorMessage,
		});
	}
};
