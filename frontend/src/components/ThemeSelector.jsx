import { useState, useRef, useEffect } from "react";
import useThemeStore from "../store/useThemeStore";
import { PaintbrushIcon, PaintBucketIcon } from "lucide-react";
import { THEMES } from "../constants";

const ThemeSelector = () => {
	const { theme, setTheme } = useThemeStore();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleThemeSelect = (themeName) => {
		setTheme(themeName);
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Dropdown Trigger */}
			<button
				onClick={toggleDropdown}
				className={`group relative flex items-center justify-center px-4 size-12 cursor-pointer rounded-2xl border transition-all duration-300 ${
					isOpen
						? "bg-primary/70 border-primary shadow-lg"
						: "bg-base-300/70 border-base-content/20 hover:bg-base-300/90 hover:border-base-content/40"
				} hover:scale-110`}
				aria-label="Theme selector"
			>
				<div
					className={`flex transition-all duration-300 ${
						isOpen
							? "text-primary-content scale-110"
							: "text-base-content/70 group-hover:text-base-content group-hover:scale-110"
					}`}
				>
					<PaintBucketIcon className="size-5" />
				</div>

				{/* Tooltip */}
				{!isOpen && (
					<div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-pre rounded-md bg-neutral px-3 py-1.5 text-sm font-semibold text-neutral-content shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
						Themes
					</div>
				)}
			</button>

			{/* Dropdown Content */}
			<div
				className={`absolute top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out z-50 ${
					isOpen
						? "opacity-100 translate-y-0 pointer-events-auto"
						: "opacity-0 -translate-y-2 pointer-events-none"
				}`}
			>
				{/* Glassmorphism Background */}
				<div className="w-64 max-h-80 overflow-y-auto rounded-2xl bg-base-200/90 border border-base-content/20 shadow-2xl">
					{/* Theme Options */}
					<div className="p-2 space-y-1">
						{THEMES.map((themeOption) => (
							<button
								key={themeOption.name}
								className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 group relative ${
									theme === themeOption.name
										? "bg-primary/20 border border-primary/30 text-primary shadow-sm"
										: "hover:bg-base-content/5 hover:scale-[1.02] border border-transparent"
								}`}
								onClick={() =>
									handleThemeSelect(themeOption.name)
								}
							>
								<div
									className={`flex items-center justify-center w-8 h-8 rounded-lg bg-base-300/40 transition-all duration-200 flex-shrink-0 ${
										theme === themeOption.name
											? "border-2 border-primary animate-pulse"
											: "border border-base-content/10 group-hover:border-base-content/20"
									}`}
								>
									<PaintbrushIcon className="size-4 text-base-content/70 group-hover:text-base-content transition-colors duration-200" />
								</div>

								<div className="flex-1 text-left min-w-0">
									<span className="text-sm font-medium text-base-content block truncate">
										{themeOption.label}
									</span>
								</div>

								{/* Theme Preview Colors */}
								<div className="flex gap-1.5 flex-shrink-0">
									{themeOption.colors.map((color, i) => (
										<span
											key={i}
											className="size-3 rounded-full border border-white/20 shadow-sm transform group-hover:scale-110 transition-transform duration-200"
											style={{ backgroundColor: color }}
										/>
									))}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThemeSelector;
