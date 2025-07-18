import { CircleDashedIcon } from "lucide-react";
import useThemeStore from "../store/useThemeStore";

const PageLoader = () => {
	const { theme } = useThemeStore();

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center gap-6 bg-base-100"
			data-theme={theme}
		>
			<div className="relative">
				<CircleDashedIcon className="size-20 animate-spin text-primary opacity-80" />
				<div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
			</div>

			<div className="text-center space-y-2">
				<h2 className="text-2xl font-semibold text-base-content">
					Loading
				</h2>
				<div className="flex items-center justify-center gap-1">
					<span className="loading loading-dots loading-md text-primary"></span>
				</div>
				<p className="text-sm text-base-content/70 max-w-xs">
					Please wait while we prepare everything for you.
				</p>
			</div>
		</div>
	);
};

export default PageLoader;