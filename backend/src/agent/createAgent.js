import { StreamChat } from "stream-chat";
import { geminiAgent } from "./Gemini/geminiAgent.js";
import {
	streamClient,
	generateStreamToken,
	apiKey as streamApiKey,
	upsertStreamUser,
} from "../lib/stream.js";

/**
 * @typedef {import('./types.js').AIAgent} AIAgent
 */

/**
 * Creates and initializes a Gemini AI agent.
 * @param {string} user_id - The ID of the user (AI bot) connecting to the chat.
 * @param {string} channel_type - The type of the chat channel.
 * @param {string} channel_id - The ID of the chat channel.
 * @returns {Promise<AIAgent>} A promise that resolves to the initialized Gemini AI agent.
 */
export const createAgent = async (user_id, channel_type, channel_id) => {
	// Upsert the AI bot user in Stream Chat using the server-side client
	await upsertStreamUser({
		id: user_id,
		name: "AI Assistant",
		image: "https://www.svgrepo.com/show/374555/bot.svg",
		role: "admin",
	});

	// Add AI bot as a member to the channel using the admin client
	const adminChannel = streamClient.channel(channel_type, channel_id);
	try {
		await adminChannel.addMembers([user_id]);
		console.log(`AI Bot ${user_id} added to channel ${channel_id}.`);
	} catch (error) {
		console.error("Failed to add members to channel:", error);
	}

	// Create and connect a dedicated StreamChat client for the AI bot's live connection
	const botClient = new StreamChat(streamApiKey, {
		allowServerSideConnect: true,
	});
	const botToken = generateStreamToken(user_id);
	await botClient.connectUser({ id: user_id }, botToken);
	console.log(`AI Bot ${user_id} connected to Stream Chat.`);

	// Get and watch the channel instance from the bot's dedicated client
	const botChannel = botClient.channel(channel_type, channel_id);
	await botChannel.watch();
	console.log(`AI Bot watching channel ${channel_id}.`);

	// Initialize the geminiAgent with the bot's client and channel
	const agent = new geminiAgent(botClient, botChannel);
	await agent.init();
	console.log(`geminiAgent initialized.`);

	return agent;
};
