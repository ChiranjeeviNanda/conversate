/**
 * @typedef {object} AIAgent
 * @property {() => Promise<void>} init - Initializes the AI agent, setting up API connections and listeners.
 * @property {() => Promise<void>} dispose - Disposes of the AI agent's resources, cleaning up connections and listeners.
 * @property {() => number} getLastInteraction - Returns the timestamp of the last interaction with the agent.
 * @property {import('stream-chat').StreamChat} chatClient - The StreamChat client instance associated with this agent.
 * @property {import('stream-chat').Channel} channel - The StreamChat channel instance the agent is operating within.
 */
