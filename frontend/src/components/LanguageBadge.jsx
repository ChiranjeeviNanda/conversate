import { useEffect, useRef, useState } from "react";
import { LANGUAGE_TO_FLAG } from "../constants";

const getLanguageFlag = (language) => {
	if (!language) return null;
	const countryCode = LANGUAGE_TO_FLAG[language.toLowerCase()];
	if (countryCode) {
		return (
			<img
				src={`https://flagcdn.com/24x18/${countryCode}.png`}
				alt={`${language} flag`}
				className="flex items-center h-4 m-1"
			/>
		);
	}
	return null;
};

const capitalize = (str) => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const LanguageBadge = ({ language, label, type }) => {
	const [shouldScroll, setShouldScroll] = useState(false);
	const [scrollAmount, setScrollAmount] = useState(0);
	const [animationDuration, setAnimationDuration] = useState(3); // Base duration
	const textRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		if (textRef.current && containerRef.current) {
			const checkScroll = () => {
				const textWidth = textRef.current.scrollWidth;
				const containerWidth = containerRef.current.clientWidth;
				const needsScroll = textWidth > containerWidth;

				setShouldScroll(needsScroll);

				if (needsScroll) {
					const amount = textWidth - containerWidth;
					setScrollAmount(amount);

					// Increase the base duration to make it scroll slower
					// A higher multiplier will make it scroll even slower
					const ratio = textWidth / containerWidth;
					setAnimationDuration(Math.max(5, ratio * 3)); // Changed from 3 and 2 to 5 and 3
				}
			};

			checkScroll();

			const timer = setTimeout(checkScroll, 100);

			const handleResize = () => checkScroll();
			window.addEventListener("resize", handleResize);

			if (document.fonts && document.fonts.ready) {
				document.fonts.ready.then(checkScroll);
			}

			return () => {
				clearTimeout(timer);
				window.removeEventListener("resize", handleResize);
			};
		}
	}, [language]);

	const typeClasses =
		type === "native"
			? "bg-secondary/80 border-secondary text-secondary-content"
			: "bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 text-primary hover:bg-primary/10";

	return (
		<div
			className={`flex items-center gap-3 rounded-2xl backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 px-6 py-3 sm:p-3 flex-1
                ${typeClasses} `}
		>
			<span className="text-xl flex-shrink-0">
				{getLanguageFlag(language)}
			</span>
			<div className="flex flex-col items-start">
				<span className="text-xs font-medium opacity-75 pr-1 sm:p-0">
					{label}:
				</span>
				<span
					ref={containerRef}
					className="text-sm font-bold max-w-14 overflow-hidden whitespace-nowrap relative"
				>
					<span
						ref={textRef}
						className={shouldScroll ? "animate-scroll" : ""}
						style={{
							display: "inline-block",
							"--scroll-duration": `${animationDuration}s`,
							"--scroll-amount": `-${scrollAmount}px`,
						}}
					>
						{capitalize(language)}
					</span>
				</span>
			</div>
			<style>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    45% { /* Changed from 50% */
                        transform: translateX(var(--scroll-amount));
                    }
                    55% { /* New keyframe for pause */
                        transform: translateX(var(--scroll-amount));
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-scroll {
                    /* Adjusted animation properties */
                    animation: scroll var(--scroll-duration) ease-in-out 1s infinite; /* 1s delay before first scroll */
                    animation-fill-mode: both;
                    will-change: transform;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-scroll {
                        animation: none !important;
                    }
                }
            `}</style>
		</div>
	);
};

export default LanguageBadge;
