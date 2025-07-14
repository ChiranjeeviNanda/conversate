const ProfileCard = ({ children, className = "" }) => {
	return (
		<div className={`rounded-2xl p-6 h-full relative overflow-hidden group bg-gradient-to-br from-base-300/5 to-base-300/10 backdrop-blur-sm border border-base-content/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 hover:border-primary/30 ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-content/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
			<div className="relative z-10 h-full">
				{children}
			</div>
		</div>
	);
};

export default ProfileCard;