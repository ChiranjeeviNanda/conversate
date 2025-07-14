import GlassCard from "./GlassCard";
import AnimatedDiv from "./AnimatedDiv";

const FeatureCard = ({
    icon: Icon,
    title,
    description,
    index,
    isLoading,
}) => {
    return (
        <AnimatedDiv
			delay={500 + index * 100}
			duration={500}
			direction="bottom"
			isLoading={isLoading}
		>
        <GlassCard className="px-6 py-8 flex items-start text-left overflow-auto" gradient={true}>
            {/* Icon */}
            <div className="mr-6 relative flex-shrink-0">
                <div className="size-20 rounded-full bg-gradient-to-bl from-[#65a30d] via-[#16a34a] to-[#15803d] flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-primary/50">
                    <Icon className="size-8 text-primary-content transition-all duration-500 group-hover:text-white group-hover:scale-110" />
                </div>

                {/* Ring effects */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-150 group-hover:border-white/10" />
                <div className="absolute inset-0 rounded-full border border-white/20 scale-125 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-175 group-hover:border-white/10" />
            </div>

            {/* Title and Description */}
            <div className="flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2 transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-base-content/60 text-sm sm:text-base leading-relaxed transition-all duration-300 group-hover:text-base-content group-hover:scale-105">
                    {description}
                </p>
            </div>
        </GlassCard>
        </AnimatedDiv>
    );
};

export default FeatureCard;