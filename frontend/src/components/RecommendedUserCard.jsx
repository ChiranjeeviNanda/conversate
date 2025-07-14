import { CheckCircleIcon, MapPinIcon, UserPlus2Icon } from "lucide-react";
import useFriendRequestStatus from "../hooks/useFriendRequestStatus";
import GlassCard from "./GlassCard";
import AnimatedDiv from "./AnimatedDiv";
import LanguageBadge from "./LanguageBadge";

const RecommendedUserCard = ({
    user,
    index,
    isLoading,
    outgoingReqIds,
    setOutgoingReqIds,
}) => {
    const { isRequestSent, isSending, sendRequest, hasError } = useFriendRequestStatus(
        user._id,
        outgoingReqIds,
        setOutgoingReqIds
    );

    return (
        <AnimatedDiv
            delay={500 + index * 100}
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
                                    src={user.profilePic}
                                    alt={user.fullName}
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
                                    {user.fullName}
                                </h3>
                            </div>
                            {user.location && (
                                <p className="text-sm text-base-content/60 flex gap-1 leading-snug">
                                    <MapPinIcon className="size-3 mt-[4px] flex-shrink-0" />
                                    <span className="break-words">
                                        {user.location}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Languages Badges */}
                    <div className="flex flex-row gap-2 mb-3">
                        <LanguageBadge
                            language={user.nativeLanguage}
                            label="Native"
                            type="native"
                        />
                        <LanguageBadge
                            language={user.learningLanguage}
                            label="Learning"
                            type="learning"
                        />
                    </div>
                    {/* Bio Section */}
                    {user.bio && (
                        <div className="mb-4 p-3 rounded-lg bg-base-content/5 border border-base-content/10 h-18 overflow-y-auto">
                            <p className="text-sm text-base-content/70 leading-relaxed">
                                {user.bio}
                            </p>
                        </div>
                    )}
                    {/* Action Button */}
                    <div className="pt-3 border-t border-base-content/10">
                        <button
                            className={`w-full btn gap-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                                isRequestSent && !hasError
                                    ? "btn-outline btn-success pointer-events-none"
                                    : "btn-primary"
                            } `}
                            onClick={sendRequest}
                            disabled={isRequestSent || isSending}
                        >
                            {isRequestSent && !hasError ? (
                                <>
                                    <CheckCircleIcon className="size-4" />
                                    Request Sent
                                </>
                            ) : isSending ? (
                                <>
                                    <span className="loading loading-dots loading-sm" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <UserPlus2Icon className="size-4" />
                                    Send Friend Request
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </GlassCard>
        </AnimatedDiv>
    );
};

export default RecommendedUserCard;