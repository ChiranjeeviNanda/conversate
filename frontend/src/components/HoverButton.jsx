const HoverButton = ({ children, className, ...props }) => (
	<button
		className={`btn group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 ${className}`}
		{...props}
	>
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
		{children}
	</button>
);

export default HoverButton;
