import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY; // This should be your public API key
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Stream API key or secret missing. Please ensure STREAM_API_KEY and STREAM_API_SECRET are set in your .env file.");
    // In a production environment, you might want to exit the process or throw a fatal error here.
    process.exit(1);
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

/**
 * Upserts (creates or updates) a user in Stream Chat.
 * @param {object} userData - The user data object (e.g., { id: 'user123', name: 'John Doe' }).
 * @returns {Promise<object>} The upserted user data.
 * @throws {Error} If the user upsert operation fails.
 */
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        console.log(`Stream user upserted: ${userData.id}`);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user: ", error);
        throw new Error("Failed to upsert Stream user.");
    }
};

/**
 * Generates a client-side token for a given user ID.
 * This token is used by client applications (including our bot's client-like connection)
 * to connect to Stream Chat.
 * @param {string} userId - The ID of the user for whom to generate the token.
 * @returns {string} The generated client token.
 * @throws {Error} If token generation fails.
 */
export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString();
        const token = streamClient.createToken(userIdString);
        console.log(`Stream token generated for user: ${userIdString}`);
        return token;
    } catch (error) {
        console.error("Error generating Stream token: ", error.message);
        throw new Error("Failed to generate Stream token.");
    }
};

// Export both the server-side client and the API key
export { streamClient, apiKey };
