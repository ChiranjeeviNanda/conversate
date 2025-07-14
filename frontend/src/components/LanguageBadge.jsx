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
	const textRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		if (textRef.current && containerRef.current) {
			// Small delay to ensure elements are rendered
			const timer = setTimeout(() => {
				const textWidth = textRef.current.scrollWidth;
				const containerWidth = containerRef.current.clientWidth;
				setShouldScroll(textWidth > containerWidth);
			}, 100);

			return () => clearTimeout(timer);
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
					className="text-sm font-bold max-w-14 overflow-hidden whitespace-nowrap"
				>
					<span
						ref={textRef}
						className={
							shouldScroll ? "inline-block animate-scroll" : ""
						}
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
					50% {
						transform: translateX(calc(-100% + 3.5rem));
					}
					100% {
						transform: translateX(0);
					}
				}
				.animate-scroll {
					animation: scroll 3s ease-in-out infinite;
					animation-delay: 1s;
				}
			`}</style>
		</div>
	);
};

export default LanguageBadge;
