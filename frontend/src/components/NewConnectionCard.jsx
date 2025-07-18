import { CheckIcon, ClockIcon } from "lucide-react";
import GlassCard from "./GlassCard";
import AnimatedDiv from "./AnimatedDiv";

const NewConnectionCard = ({
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

export default NewConnectionCard;