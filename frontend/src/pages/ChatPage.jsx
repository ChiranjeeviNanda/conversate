import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
	AIStateIndicator,
	Channel,
	Chat,
	MessageInput,
	MessageList,
	Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ComponentLoader from "../components/ComponentLoader";
import StreamChannelHeader from "../components/StreamChannelHeader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
	const { id: targetUserId } = useParams();
	const [chatClient, setChatClient] = useState(null);
	const [channel, setChannel] = useState(null);
	const [loading, setLoading] = useState(true);
	const { authUser } = useAuthUser();

	const { data: tokenData } = useQuery({
		queryKey: ["streamToken"],
		queryFn: getStreamToken,
		enabled: !!authUser,
	});

	useEffect(() => {
		const initChat = async () => {
			if (!tokenData?.token || !authUser) return;

			try {
				console.log("Initializing stream chat client...");
				const client = StreamChat.getInstance(STREAM_API_KEY);
				await client.connectUser(
					{
						id: authUser._id,
						name: authUser.fullName,
						image: authUser.profilePic,
					},
					tokenData.token
				);

				const channelId = [authUser._id, targetUserId].sort().join("-");
				const currChannel = client.channel("messaging", channelId, {
					members: [authUser._id, targetUserId],
				});

				await currChannel.watch();
				setChatClient(client);
				setChannel(currChannel);
			} catch (error) {
				console.error("Error initializing chat:", error);
				toast.error("Could not connect to chat. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		initChat();
	}, [tokenData, authUser, targetUserId]);

    const isMessageAIGenerated = (message) => !!message.ai_generated;

	if (loading || !chatClient || !channel) return <ComponentLoader />;

	return (
		<div className="flex flex-col h-dvh sm:p-4">
			<Chat client={chatClient} theme="str-chat__theme-dark" isMessageAIGenerated={isMessageAIGenerated}>
				<Channel channel={channel}>
					<div className="flex flex-col size-full">
						<div className="sticky top-0 z-10 md:static">
							<StreamChannelHeader />
						</div>

						<div className="flex-1 overflow-y-auto">
							<Window>
								<MessageList disableThreading />
								<AIStateIndicator />
							</Window>
						</div>

						<div className="sticky bottom-0 z-10 md:static">
							<MessageInput focus audioRecordingEnabled />
						</div>
					</div>
				</Channel>
			</Chat>
		</div>
	);
};

export default ChatPage;
