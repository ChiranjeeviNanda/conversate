import { CheckIcon, XIcon } from "lucide-react";
import GlassCard from "./GlassCard";
import AnimatedDiv from "./AnimatedDiv";
import LanguageBadge from "./LanguageBadge";

const FriendRequestCard = ({
	request,
	index,
	isLoading,
	processingAccepts,
	processingRejects,
	onAccept,
	onReject,
}) => {
	if (!request?.sender) return null;

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

export default FriendRequestCard;