import { Link } from "react-router";

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

export const NavigationButton = ({
	to,
	icon: Icon,
	children,
	title,
	compact = false,
	className = "",
}) => {
	return (
		<button>
			<Link
				to={to}
				className={`group relative flex items-center rounded-2xl border transition-all duration-300 bg-base-300/40 border-base-content/20 hover:border-primary hover:bg-primary/10 hover:scale-105 active:scale-95
					${compact ? "p-2 sm:p-3 shrink-0" : "gap-3 px-6 py-3"} ${className}
					`}
				title={title}
			>
				<Icon className="text-base-content/70 group-hover:text-primary transition-colors duration-300 size-6" />
				<span className="font-medium text-base-content/80 group-hover:text-primary transition-colors duration-300">
					{children}
				</span>
			</Link>
		</button>
	);
};
