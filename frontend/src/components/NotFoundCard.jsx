import AnimatedDiv from "./AnimatedDiv";
import GlassCard from "./GlassCard";

const NotFoundCard = ({
    icon: Icon,
    title = "Nothing found",
    description = "",
    isLoading = false,
    variant = "default",
}) => {
    if (variant === "compact") {
        return (
            <AnimatedDiv
                duration={700}
                delay={400}
                direction="bottom"
                isLoading={isLoading}
                className="w-full"
            >
                <GlassCard
                    className="p-6 overflow-hidden"
                    gradient={true}
                >
                    <div className="flex items-center gap-4 z-10">
                        <div className="size-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
                            {Icon && (
                                <Icon className="size-6 text-primary animate-pulse" />
                            )}
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="font-bold text-lg mb-1 text-base-content">
                                {title}
                            </h3>
                            {description && (
                                <p className="text-sm text-base-content/70 leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </AnimatedDiv>
        );
    }

    return (
        <AnimatedDiv
            duration={700}
            delay={400}
            direction="bottom"
            isLoading={isLoading}
            className="text-center space-y-6"
        >
            <GlassCard
                className="p-12 text-center overflow-hidden"
                gradient={true}
            >
                <div className="z-10 max-w-md mx-auto">
                    <div className="size-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                        {Icon && (
                            <Icon className="size-10 text-primary animate-pulse" />
                        )}
                    </div>
                    <h3 className="font-bold text-2xl mb-4 text-base-content">
                        {title}
                    </h3>
                    <p className="text-base-content/70 leading-relaxed">
                        {description}
                    </p>
                </div>
            </GlassCard>
        </AnimatedDiv>
    );
};

export default NotFoundCard;