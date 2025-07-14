const AnimatedDiv = ({
    delay = 0,
    direction = "bottom",
    duration = 500,
    children,
    className = "",
    isLoading = false
}) => {
    const directions = {
        top: "slide-in-from-top-6",
        bottom: "slide-in-from-bottom-4",
        left: "slide-in-from-left-4",
        right: "slide-in-from-right-4"
    };

    const loadingTransforms = {
        top: "-translate-y-6",
        bottom: "translate-y-4",
        left: "-translate-x-4",
        right: "translate-x-4"
    };

    return (
        <div
            className={`transition-all duration-${duration} ${
                isLoading
                    ? `opacity-0 ${loadingTransforms[direction]}`
                    : `animate-in fade-in ${directions[direction]}`
            } ${className}`}
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: "both",
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedDiv;