const GlassCard = ({
	children,
	className = "",
	gradient = false,
	hover = true,
	...props
}) => (
	<div
		className={`backdrop-blur-xl rounded-2xl border-2 border-base-content/20 shadow-xl transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.04] group transform animate-in fade-in slide-in-from-bottom-4 ${className}`}
		{...props}
	>
		<div
			className={
				gradient
					? "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
					: ""
			}
		/>
		{children}
	</div>
);

export default GlassCard;
