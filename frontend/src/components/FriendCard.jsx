import { Link } from "react-router";
import { MapPinIcon, MessageSquareIcon } from "lucide-react";
import GlassCard from "./GlassCard";
import AnimatedDiv from "./AnimatedDiv";
import LanguageBadge from "./LanguageBadge";

const FriendCard = ({
	friend,
	isLoading,
	variant = "default",
	onMessageClick,
}) => {
	const handleMessageClick = () => {
		if (onMessageClick) {
			onMessageClick(friend._id);
		}
	};

	if (variant === "compact") {
		return (
			<AnimatedDiv
				delay={0}
				duration={500}
				direction="bottom"
				isLoading={isLoading}
			>
				<GlassCard
					className="relative p-4 overflow-hidden"
					gradient={true}
				>
					<div className="relative z-10 flex items-center gap-4">
						{/* Avatar */}
						<div className="avatar flex-shrink-0">
							<div className="size-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
								<img
									src={friend.profilePic}
									alt={friend.fullName}
									className="size-full object-cover"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src =
											"https://placehold.co/64x64/E0E7FF/4338CA?text=Avatar";
									}}
								/>
							</div>
						</div>
						{/* Content */}
						<div className="flex-1 min-w-0 flex flex-col gap-3">
							{/* Name */}
							<h3 className="font-bold text-lg text-base-content truncate">
								{friend.fullName}
							</h3>
							{/* Action Button */}
							<Link
								to={`/chat/${friend._id}`}
								onClick={handleMessageClick}
								className="btn btn-primary text-base-100 w-full gap-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
							>
								<MessageSquareIcon className="size-4 text-base-100" />
								Message
							</Link>
						</div>
					</div>
				</GlassCard>
			</AnimatedDiv>
		);
	}

	// Full variant
	return (
		<AnimatedDiv
			delay={0}
			duration={500}
			direction="bottom"
			isLoading={isLoading}
		>
			<GlassCard className="relative p-6 overflow-hidden" gradient={true}>
				<div className="relative z-10 flex flex-col h-full">
					{/* Header with Avatar and Name */}
					<div className="flex items-center gap-4 mb-6">
						{/* Avatar */}
						<div className="avatar flex-shrink-0">
							<div className="size-20 rounded-full overflow-hidden ring-2 ring-offset-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
								<img
									src={friend.profilePic}
									alt={friend.fullName}
									className="size-full object-cover"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src =
											"https://placehold.co/80x80/E0E7FF/4338CA?text=Avatar";
									}}
								/>
							</div>
						</div>
						{/* Name */}
						<div className="space-y-1">
							<div className="flex-1 min-w-0">
								<h3 className="font-bold text-xl text-base-content mb-1 truncate">
									{friend.fullName}
								</h3>
							</div>
							{friend.location && (
								<p className="text-sm text-base-content/60 flex items-center gap-1">
									<MapPinIcon className="size-3" />
									{friend.location}
								</p>
							)}
						</div>
					</div>
					{/* Language Badges */}
					<div className="flex-1 mb-3">
						<div className="flex flex-row gap-2">
							<LanguageBadge
								language={friend.nativeLanguage}
								label="Native"
								type="native"
							/>
							<LanguageBadge
								language={friend.learningLanguage}
								label="Learning"
								type="learning"
							/>
						</div>
					</div>
					{/* Action Button */}
					<div className="pt-3 border-t border-base-content/10">
						<Link
							to={`/chat/${friend._id}`}
							onClick={handleMessageClick}
							className="btn btn-primary text-base-100 w-full gap-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
						>
							<MessageSquareIcon className="size-4 text-base-100" />
							Send a Message
						</Link>
					</div>
				</div>
			</GlassCard>
		</AnimatedDiv>
	);
};

export default FriendCard;
