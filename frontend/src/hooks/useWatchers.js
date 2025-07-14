import { useCallback, useEffect, useState } from "react";

/**
 * @typedef {import('stream-chat').Channel} Channel
 * @typedef {import('stream-chat').Event} StreamChatEvent
 */

/**
 * A React hook to manage and track channel watchers, specifically focusing on 'ai-bot' users.
 *
 * @param {object} props - The properties for the hook.
 * @param {Channel} props.channel - The StreamChat Channel instance to watch.
 * @returns {{watchers: string[], error: Error | null}} An object containing the list of watcher IDs and any error encountered.
 */
export const useWatchers = ({ channel }) => {
	const [watchers, setWatchers] = useState([]);
	const [error, setError] = useState(null);

	/**
	 * Queries the channel for its current watchers.
	 */
	const queryWatchers = useCallback(async () => {
		setError(null);

		try {
			const result = await channel.query({
				watchers: { limit: 5, offset: 0 },
			});
			setWatchers(result?.watchers?.map((watcher) => watcher.id) || []);
		} catch (err) {
			console.error("Error querying watchers:", err);
			setError(/** @type {Error} */ (err));
		}
	}, [channel]);

	useEffect(() => {
		queryWatchers();
	}, [queryWatchers]);

	/**
	 * Effect hook to subscribe to StreamChat 'user.watching.start' and 'user.watching.stop' events.
	 * This keeps the 'watchers' state updated in real-time.
	 */
	useEffect(() => {
		const watchingStartListener = channel.on(
			"user.watching.start",
			(event) => {
				const userId = event?.user?.id;
				if (userId && userId.startsWith("ai-bot")) {
					setWatchers((prevWatchers) => {
						const currentWatchers = prevWatchers || [];
						return [
							userId,
							...currentWatchers.filter(
								(watcherId) => watcherId !== userId
							),
						];
					});
				}
			}
		);

		const watchingStopListener = channel.on(
			"user.watching.stop",
			(event) => {
				const userId = event?.user?.id;
				if (userId && userId.startsWith("ai-bot")) {
					setWatchers((prevWatchers) =>
						(prevWatchers || []).filter(
							(watcherId) => watcherId !== userId
						)
					);
				}
			}
		);

		return () => {
			watchingStartListener.unsubscribe();
			watchingStopListener.unsubscribe();
		};
	}, [channel]);

	return { watchers, error };
};
