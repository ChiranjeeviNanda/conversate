const Logo = ({ iconColor = "", bgColor = "", size = "", className = "" }) => {
	return (
		<div className="flex items-center space-x-3 group cursor-pointer">
			<div
				className={`relative rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${size} ${bgColor} ${className}`}
			>
				<svg
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
					className={`size-3/5 ${iconColor}`}
					fill="currentColor"
				>
					<path d="M7.111.16H5.543a.784.784 0 0 0 0 1.568v1.568h-.928c.093-.251.141-.516.144-.784A2.352 2.352 0 0 0 .37 1.336a.784.784 0 1 0 1.358.784.786.786 0 0 1 1.234-.162.784.784 0 0 1-.555 1.338.784.784 0 1 0 0 1.568.784.784 0 1 1-.679 1.176.784.784 0 1 0-1.358.784 2.352 2.352 0 0 0 4.39-1.176 2.325 2.325 0 0 0-.145-.784h.928v2.352a.784.784 0 1 0 1.568 0V1.728a.784.784 0 0 0 0-1.568Zm2.352 3.92h.784a.785.785 0 0 1 .784.784v.784a.784.784 0 1 0 1.568 0v-.784a2.354 2.354 0 0 0-2.352-2.352h-.784a.784.784 0 0 0 0 1.568Zm-3.136 7.056h-.784a.785.785 0 0 1-.784-.784v-.784a.784.784 0 0 0-1.568 0v.784a2.354 2.354 0 0 0 2.352 2.352h.784a.784.784 0 1 0 0-1.568Zm8.624-.784a.784.784 0 1 0 0-1.568h-2.352v-.392a.784.784 0 0 0-1.568 0v.392H8.68a.784.784 0 1 0 0 1.568h4.065a5.275 5.275 0 0 1-.961 1.98 5.227 5.227 0 0 1-.494-.77.782.782 0 0 0-1.443.118.784.784 0 0 0 .048.598c.212.408.464.793.752 1.15a5.186 5.186 0 0 1-1.9.862.785.785 0 0 0 .334 1.532 6.77 6.77 0 0 0 2.7-1.271 6.84 6.84 0 0 0 2.72 1.27.786.786 0 0 0 .83-1.187.783.783 0 0 0-.492-.344 5.272 5.272 0 0 1-1.918-.854 6.849 6.849 0 0 0 1.42-3.084h.611Z" />
				</svg>
			</div>

			<div className="relative">
				<p className="text-2xl sm:text-3xl font-bold text-base-content group-hover:text-primary transition-all duration-500">
					Conversate
				</p>

				{/* Underline Effect */}
				<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
			</div>
		</div>
	);
};

export default Logo;
