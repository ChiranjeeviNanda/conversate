import { useChannelStateContext, useChatContext } from "stream-chat-react";
import {
	VideoIcon,
	Circle,
	ChevronLeftIcon,
	BotOffIcon,
	BotIcon,
} from "lucide-react";
import HoverButton, { NavigationButton } from "./HoverButton";
import toast from "react-hot-toast";
import { useWatchers } from "../hooks/useWatchers";
import { axiosInstance } from "../lib/axios";

const StreamChannelHeader = () => {
	const { channel } = useChannelStateContext();
	const { watchers } = useWatchers({ channel });
	const { client } = useChatContext();
	const members = Object.values(channel?.state?.members || {});
	const receiver = members.find((m) => m.user.id !== client.userID)?.user;

	const aiInChannel =
		(watchers ?? []).filter((watcher) => watcher.includes("ai-bot"))
			.length > 0;

	const handleVideoCall = () => {
		if (channel) {
			const callUrl = `${window.location.origin}/call/${channel.id}`;
			const userName = client.user.name;

			channel.sendMessage({
				text: `📹 **${userName}** has started a video call!\n\n **Join the call:** ${callUrl}\n\n *Click the link above to join the video conversation*`,
			});
			toast.success("Video call invitation sent!");
		}
	};

	const handleAIAssistant = async () => {
		if (!channel || !channel.id) {
			toast.error("Channel information is missing.");
			return;
		}

		const endpoint = aiInChannel ? "stop-ai-agent" : "start-ai-agent";
		const loadingMessage = aiInChannel
			? "Removing AI Assistant..."
			: "Adding AI Assistant...";
		const successMessage = aiInChannel
			? "AI Assistant removed from this chat!"
			: "AI Assistant added to this chat!";
		const failureMessage = aiInChannel
			? "Failed to remove AI Assistant"
			: "Failed to add AI Assistant";

		toast.loading(loadingMessage);

		try {
			const response = await axiosInstance.post(`/ai/${endpoint}`, {
				channel_id: channel.id,
			});
			const data = response.data;

			toast.dismiss();
			toast.success(successMessage);
			console.log("AI Assistant operation response:", data);
		} catch (error) {
			toast.dismiss();
			toast.error(
				`${failureMessage}: ${
					error.response?.data?.reason || error.message
				}`
			);
			console.error("AI Assistant operation error:", error);
		}
	};

	return (
		<div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-3 border-b border-base-content/30 bg-base-200">
			{/* Left: Home button and Receiver info */}
			<div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
				<NavigationButton
					to="/home"
					icon={ChevronLeftIcon}
					compact={true}
					title="Go Home"
				/>
				<div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
					<div className="relative shrink-0">
						<img
							src={receiver?.image}
							alt={receiver?.name}
							className="size-8 sm:size-10 rounded-full border border-base-300 ring-2 ring-offset-2 ring-primary/20 overflow-hidden"
						/>
						<div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1">
							<Circle
								className={`w-3 h-3 sm:w-4 sm:h-4 ${
									receiver?.online
										? "text-success"
										: "text-error"
								} bg-base-100 rounded-full border-2 border-base-100`}
								fill={
									receiver?.online ? "currentColor" : "none"
								}
							/>
						</div>
					</div>
					<div className="min-w-0 flex-1">
						<h2 className="font-semibold text-base-content text-sm sm:text-base truncate">
							{receiver?.name}
						</h2>
						<p className="text-xs sm:text-sm text-base-content/70">
							{receiver?.online ? "Online" : "Offline"}
						</p>
					</div>
				</div>
			</div>

			{/* Right: AI and Video call buttons */}
			<div className="flex items-center gap-2 shrink-0">
				<HoverButton
					title="AI Assistant"
					className="btn-neutral md:btn-sm text-neutral-content"
					onClick={handleAIAssistant}
				>
					{aiInChannel ? (
						<BotOffIcon className=" size-6 sm:size-5" />
					) : (
						<BotIcon className="size-6 sm:size-5" />
					)}
					<p className="font-semibold pl-1 hidden md:inline">
						{aiInChannel ? "Remove AI" : "Add AI"}
					</p>
				</HoverButton>

				<HoverButton
					title="Start Video Call"
					className="btn-primary md:btn-sm text-primary-content"
					onClick={handleVideoCall}
				>
					<VideoIcon className="size-6 sm:size-5" />
					<p className="hidden md:inline font-semibold pl-1">
						Video Call
					</p>
				</HoverButton>
			</div>
		</div>
	);
};

export default StreamChannelHeader;
