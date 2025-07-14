import { LogOutIcon } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router";
import useLogOut from "../hooks/useLogOut";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
	const { logOutMutation, error } = useLogOut();

	return (
		<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
			<div
				className="flex items-center justify-between gap-4 px-6 py-3 backdrop-blur-xl rounded-2xl border border-base-content/30 shadow-xl"
				style={{
					backdropFilter: "blur(12px) saturate(180%)",
					WebkitBackdropFilter: "blur(12px) saturate(180%)",
					backgroundColor: "hsla(var(--b3) / 0.2)",
				}}
			>
				{/* Logo */}
				<Link
					to="/home"
					className="animate-in fade-in duration-500 delay-200 flex items-center gap-4 group"
				>
					<Logo
						size="size-10"
						bgColor="bg-primary"
						iconColor="text-primary-content"
					/>
				</Link>

				{/* Buttons */}
				<div className="flex items-center gap-3">
					<ThemeSelector />

					{/* Logout Button */}
					<button
                        onClick={logOutMutation}    
                        className="group relative flex items-center justify-center gap-2 h-12 px-3.25 sm:px-4 cursor-pointer rounded-2xl border transition-all duration-300 bg-base-300/70 border-base-content/20 hover:border-red-500 hover:scale-110"
                        aria-label="Logout"
                    >
                        <div className="flex items-center justify-center transition-all duration-300 text-base-content/70 group-hover:text-red-500">
                            <LogOutIcon className="size-5" />
                        </div>
                        <span className="hidden sm:inline text-sm font-medium text-base-content/70 group-hover:text-red-500 transition-colors duration-300">
                            Logout
                        </span>
                        
                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-pre rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow-lg opacity-0 group-hover:opacity-100 duration-200 pointer-events-none">
                            Logout
                        </div>
                    </button>
				</div>
			</div>
		</nav>
	);
}
