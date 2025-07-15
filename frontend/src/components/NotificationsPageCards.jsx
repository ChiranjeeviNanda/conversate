import { CheckIcon, ClockIcon, XIcon } from "lucide-react";
import GlassCard from "./GlassCard";
import AnimatedDiv from "./AnimatedDiv";
import LanguageBadge from "./LanguageBadge";

export const FriendRequestCard = ({
	request,
	index,
	isLoading,
	processingAccepts,
	processingRejects,
	onAccept,
	onReject,
}) => {
	const isAcceptProcessing = processingAccepts.has(request._id);
	const isRejectProcessing = processingRejects.has(request._id);
	const isAnyProcessing = isAcceptProcessing || isRejectProcessing;

	return (
		<AnimatedDiv
			delay={500 + index * 100}
			duration={500}
			direction="bottom"
			isLoading={isLoading}
		>
			<GlassCard className="relative p-6 overflow-hidden" gradient={true}>
				<div className="relative z-10">
					<div className="flex flex-col gap-4 mb-4">
						<div className="flex flex-col sm:flex-row sm:items-start gap-4">
							{/* Avatar and Name Section */}
							<div className="flex items-center gap-4 flex-1">
								<div className="avatar">
									<div className="size-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
										<img
											src={request.sender.profilePic}
											alt={request.sender.fullName}
											className="size-full object-cover"
											onError={(e) => {
												e.target.onerror = null;
												e.target.src =
													"https://placehold.co/64x64/E0E7FF/4338CA?text=Avatar";
											}}
										/>
									</div>
								</div>
								<div className="flex-1 min-w-0 flex flex-col justify-center">
									<h3 className="font-bold text-lg text-base-content truncate">
										{request.sender.fullName}
									</h3>
									<p className="text-sm text-base-content/60 font-medium">
										Wants to connect with you
									</p>
								</div>
							</div>

							{/* Language Badges */}
							<div className="flex flex-row gap-2">
								<LanguageBadge
									language={request.sender.nativeLanguage}
									label="Native"
									type="native"
									
								/>
								<LanguageBadge
									language={request.sender.learningLanguage}
									label="Learning"
									type="learning"
									
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-3 pt-4 border-t border-base-content/10">
						{/* Accept Button */}
						<button
							className={`flex-1 btn btn-success gap-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 relative ${
								isAnyProcessing
									? "pointer-events-none opacity-70"
									: ""
							}`}
							onClick={() => onAccept(request._id)}
							disabled={isAnyProcessing}
						>
							{!isAcceptProcessing ? (
								<>
									<CheckIcon className="size-4 mr-1" />
									Accept
								</>
							) : (
								<>
									<span className="loading loading-dots loading-sm mr-1" />
									Accepting...
								</>
							)}
						</button>
						{/* Decline Button */}
						<button
							className={`flex-1 btn btn-outline btn-error gap-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
								isAnyProcessing
									? "pointer-events-none opacity-70"
									: ""
							}`}
							onClick={() => onReject(request._id)}
							disabled={isAnyProcessing}
						>
							{isRejectProcessing ? (
								<span className="loading loading-spinner loading-sm"></span>
							) : (
								<XIcon className="size-4" />
							)}
							{isRejectProcessing ? "Processing..." : "Decline"}
						</button>
					</div>
				</div>
			</GlassCard>
		</AnimatedDiv>
	);
};

export const NewConnectionCard = ({
	notification,
	index,
	isLoading,
	getRelativeTime,
}) => {
	return (
		<AnimatedDiv
			delay={500 + index * 100}
			duration={500}
			direction="bottom"
			isLoading={isLoading}
		>
			<GlassCard className="relative p-6 overflow-hidden border border-success/20 hover:border-success/40 transition-all duration-300">
				<div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				<div className="relative z-10">
					<div className="flex items-start gap-4">
						<div className="avatar relative">
							<div className="size-12 rounded-full bg-gradient-to-br from-success/20 to-success/10 overflow-hidden ring-2 ring-success/30">
								<img
									src={notification.recipient.profilePic}
									alt={notification.recipient.fullName}
									className="size-full object-cover"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src =
											"https://placehold.co/48x48/86EFAC/16A34A?text=Avatar";
									}}
								/>
							</div>
							<div className="absolute -bottom-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
								<CheckIcon className="relative top-0.25 left-0.25 size-2.5 text-white" />
							</div>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-base-content mb-1 truncate">
								{notification.recipient.fullName}
							</h3>
							<p className="text-sm text-base-content/80 mb-2">
								Accepted your friend request
							</p>
							<div className="flex items-center justify-between">
								<p className="text-xs flex items-center text-base-content/60 gap-1">
									<ClockIcon className="size-3" />
									{getRelativeTime(notification.createdAt)}
								</p>
								<div className="badge badge-success badge-md">
									Connected
								</div>
							</div>
						</div>
					</div>
				</div>
			</GlassCard>
		</AnimatedDiv>
	);
};
