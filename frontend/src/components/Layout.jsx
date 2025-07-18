import Dock from "./Dock";
import Navbar from "./Navbar";

const Layout = ({ children, showDock = true }) => {
	return (
		<div className="min-h-screen">
			<div className="flex">
				<div className="flex-1 flex flex-col">
					<Navbar />
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
				
				{showDock && (
					<Dock />
				)}

			</div>
		</div>
	);
};

export default Layout;
