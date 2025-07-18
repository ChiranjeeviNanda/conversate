import { CircleDashedIcon } from "lucide-react";

const ComponentLoader = () => (
	<div className="flex items-center justify-center py-12 animate-in fade-in duration-500">
		<div className="relative">
			<CircleDashedIcon className="size-10 animate-spin text-primary opacity-80" />
			<div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
		</div>
	</div>
);

export default ComponentLoader;
