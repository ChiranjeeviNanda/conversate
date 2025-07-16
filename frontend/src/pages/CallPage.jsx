import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
	StreamVideo,
	StreamVideoClient,
	StreamCall,
	CallControls,
	SpeakerLayout,
	StreamTheme,
	CallingState,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/Loaders";
import {
	AlertCircleIcon,
	MaximizeIcon,
	MinimizeIcon,
	Share2Icon,
	Users2Icon,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import HoverButton from "../components/HoverButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
	const { id: callId } = useParams();
	const [client, setClient] = useState(null);
	const [call, setCall] = useState(null);
	const [isConnecting, setIsConnecting] = useState(true);
	const [connectionStatus, setConnectionStatus] = useState("connecting");
	const { authUser, isLoading } = useAuthUser();

	const { data: tokenData } = useQuery({
		queryKey: ["streamToken"],
		queryFn: getStreamToken,
		enabled: !!authUser,
	});

	useEffect(() => {
		const initCall = async () => {
			if (!tokenData?.token || !authUser || !callId) return;

			try {
				console.log("Initializing Stream video client...");
				setConnectionStatus("connecting");

				const user = {
					id: authUser._id,
					name: authUser.fullName,
					image: authUser.profilePic,
				};

				const videoClient = new StreamVideoClient({
					apiKey: STREAM_API_KEY,
					user,
					token: tokenData.token,
				});

				const callInstance = videoClient.call("default", callId);
				await callInstance.join({ create: true });

				console.log("Joined call successfully");
				setConnectionStatus("connected");
				setClient(videoClient);
				setCall(callInstance);
			} catch (error) {
				console.error("Error joining call:", error);
				setConnectionStatus("error");
				toast.error("Could not join the call. Please try again.");
			} finally {
				setIsConnecting(false);
			}
		};

		initCall();
	}, [tokenData, authUser, callId]);

	if (isLoading || isConnecting) {
		return <PageLoader />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 relative overflow-hidden">
			<div className="relative h-screen flex flex-col">
				{client && call ? (
					<div className="pt-10">
						<StreamVideo client={client}>
							<StreamCall call={call}>
								<CallContent callId={callId} />
							</StreamCall>
						</StreamVideo>
					</div>
				) : (
					<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
						<GlassCard className="p-8">
							<div className="flex flex-col items-center space-y-4">
								<div className="size-16 bg-error rounded-full flex items-center justify-center">
									<AlertCircleIcon className="size-10 text-error-content" />
								</div>
								<p className="text-error text-lg font-medium text-center">
									Could not initialize call.
									<br />
									Please refresh or try again later.
								</p>
								<button
									onClick={() => window.location.reload()}
									className="px-6 py-2 btn btn-primary"
								>
									Refresh
								</button>
							</div>
						</GlassCard>
					</div>
				)}
			</div>
		</div>
	);
};

const CallContent = ({ callId }) => {
	const { useCallCallingState, useParticipantCount } = useCallStateHooks();
	const callingState = useCallCallingState();
	const participantCount = useParticipantCount();

	const [joinTime, setJoinTime] = useState(null);
	const [timeElapsed, setTimeElapsed] = useState("00:00");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isDisconnecting, setIsDisconnecting] = useState(false);

	// Set join time when call is joined
	useEffect(() => {
		if (callingState === CallingState.JOINED && !joinTime) {
			setJoinTime(Date.now());
		}
	}, [callingState, joinTime]);

	// Update elapsed time
	useEffect(() => {
		if (!joinTime) return;

		const interval = setInterval(() => {
			const elapsed = Date.now() - joinTime;
			const minutes = Math.floor(elapsed / 60000);
			const seconds = Math.floor((elapsed % 60000) / 1000);
			setTimeElapsed(
				`${minutes.toString().padStart(2, "0")}:${seconds
					.toString()
					.padStart(2, "0")}`
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [joinTime]);

	// Handle call state changes
	useEffect(() => {
		if (callingState === CallingState.LEFT) {
			setIsDisconnecting(true);
			toast.success("Call ended");

			// Close tab after a brief delay
			setTimeout(() => {
				window.close();
				// Fallback if window.close() doesn't work
				setTimeout(() => {
					if (!window.closed) {
						window.location.href = "/home";
					}
				}, 500);
			}, 1000);
		}
	}, [callingState]);

	const copyCallLink = () => {
		const callLink = `${window.location.origin}/call/${callId}`;
		navigator.clipboard
			.writeText(callLink)
			.then(() => {
				toast.success("Call link copied to clipboard!");
			})
			.catch(() => {
				toast.error("Failed to copy link");
			});
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setIsFullscreen(true);
		} else {
			document.exitFullscreen();
			setIsFullscreen(false);
		}
	};

	// Handle fullscreen change
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () =>
			document.removeEventListener(
				"fullscreenchange",
				handleFullscreenChange
			);
	}, []);

	// Show disconnecting state
	if (isDisconnecting) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
				<GlassCard className="p-8">
					<div className="flex flex-col items-center space-y-4">
						<span className="loading loading-spinner loading-xl text-primary" />
						<p className="text-base-content text-lg font-medium">
							Disconnecting...
						</p>
					</div>
				</GlassCard>
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col">
			{/* Top Bar */}
			<div className="absolute top-4 left-4 right-4 z-50">
				<div
					className="flex items-center justify-between gap-4 px-6 py-3 backdrop-blur-xl rounded-2xl border border-base-content/30 shadow-xl"
					style={{
						backdropFilter: "blur(12px) saturate(180%)",
						WebkitBackdropFilter: "blur(12px) saturate(180%)",
						backgroundColor: "hsla(var(--b3) / 0.2)",
					}}
				>
					{/* Left side - Call info */}
					<div className="flex items-center space-x-6">
						<div className="flex items-center space-x-2">
							<div className="size-3 bg-success rounded-full animate-pulse"></div>
							<p className="font-medium">{timeElapsed}</p>
						</div>
						<div className="flex items-center space-x-1">
							<Users2Icon className="size-4" />
							<p>{participantCount}</p>
							<p className="hidden sm:block">
								{participantCount === 1 ? "friend" : "friends"}
							</p>
						</div>
					</div>

					{/* Right side - Actions */}
					<div className="flex items-center space-x-3">
						<HoverButton
							onClick={copyCallLink}
							title="Copy call link"
							className="btn-primary md:btn-sm text-primary-content"
						>
							<Share2Icon className="size-4 sm:size-5" />
							<p className="hidden sm:block">Share Link</p>
						</HoverButton>

						<HoverButton
							onClick={toggleFullscreen}
							title={
								isFullscreen
									? "Exit fullscreen"
									: "Enter fullscreen"
							}
							className="btn-neutral md:btn-sm text-neutral-content"
						>
							{isFullscreen ? (
								<MinimizeIcon className="size-4 sm:size-5" />
							) : (
								<MaximizeIcon className="size-4 sm:size-5" />
							)}
						</HoverButton>
					</div>
				</div>
			</div>

			{/* Main call content */}
			<div className="flex-1 flex items-center justify-center">
				<StreamTheme>
					<SpeakerLayout />

					{/* Custom call controls overlay */}
					<div
						className="px-4 mt-2 backdrop-blur-xl rounded-2xl border border-base-content/30 shadow-xl"
						style={{
							backdropFilter: "blur(12px) saturate(180%)",
							WebkitBackdropFilter: "blur(12px) saturate(180%)",
							backgroundColor: "hsla(var(--b3) / 0.2)",
						}}
					>
						<CallControls />
					</div>
				</StreamTheme>
			</div>
		</div>
	);
};

export default CallPage;
