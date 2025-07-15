import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
	ArrowUp,
	LogInIcon,
	UsersRoundIcon,
	MessagesSquareIcon,
	VideoIcon,
	BotMessageSquareIcon,
	ChevronRightCircleIcon,
	HandMetalIcon,
	PlaneIcon,
} from "lucide-react";
import Logo from "../components/Logo";
import FeatureCard from "../components/FeatureCard";
import ProfileCard from "../components/ProfileCard";
import ScrollText from "../components/ScrollText";
import HoverButton from "../components/HoverButton";
import AnimatedDiv from "../components/AnimatedDiv";

const LandingPage = () => {
	const [pageLoading, setpageLoading] = useState(true);
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	const features = [
		{
			icon: UsersRoundIcon,
			title: "Connect & Grow Globally",
			description:
				"Meet native speakers, build real friendships, and immerse yourself in language from anywhere.",
		},
		{
			icon: MessagesSquareIcon,
			title: "Conversations That Count",
			description:
				"Learn through meaningful conversations and rich cultural exchange",
		},
		{
			icon: VideoIcon,
			title: "Live & Learn Interactively",
			description:
				"Boost your fluency with dynamic, face-to-face video sessions and engaging practice.",
		},
		{
			icon: BotMessageSquareIcon,
			title: "Smart AI, Instant Help",
			description:
				"Get real-time grammar fixes, vocabulary tips, and intelligent feedback—effortlessly",
		},
	];

	const stats = [
		{
			emoji: "🌟",
			value: "10+",
			description: "Languages",
			gradient: "from-yellow-400 to-orange-500",
		},
		{
			emoji: "🎉",
			value: "24/7",
			description: "Fun Learning",
			gradient: "from-purple-400 to-pink-500",
		},
		{
			emoji: "😃",
			value: "100%",
			description: "Free to Start",
			gradient: "from-green-400 to-blue-500",
		},
		{
			emoji: "🤝",
			value: "∞",
			description: "Friendships",
			gradient: "from-blue-400 to-purple-500",
		},
	];

	useEffect(() => {
		const timer = setTimeout(() => setpageLoading(false), 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollToTop(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div
			className="min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-100 via-base-200/30 to-base-100"
			data-theme="forest"
		>
			{/* Header */}
			<header className="w-full mx-auto py-4 sm:py-6 lg:py-8">
				<div className="flex justify-between items-center max-w-7xl mx-auto">
					{/* Logo */}
					<Logo
						size="size-10"
						bgColor="bg-gradient-to-bl from-[#65a30d] via-[#16a34a] to-[#15803d]"
						iconColor="text-primary-content"
					/>

					{/* Sign In Button */}
					<Link
						to="/login"
						className="group backdrop-blur-xl rounded-xl border-2 border-white/20 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:scale-105 transform px-4 py-2 gap-2 font-semibold text-sm text-white hover:text-primary overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out" />

						<div className="relative z-10 flex items-center gap-2">
							<LogInIcon className="size-4 transition-transform duration-200 group-hover:scale-110" />
							<span>Sign In</span>
						</div>
					</Link>
				</div>
			</header>

			{/* Scrolling Text */}
			<ScrollText
				texts={["Learn. Connect.", "Talk. Grow."]}
				velocity={30}
				className="text-white/20"
			/>

			{/* Hero Section */}
			<main className="flex-1 flex items-center justify-center py-12 sm:py-14 lg:py-16">
				<div className="max-w-7xl mx-auto w-full space-y-24">
					{/* Hero Section */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-2 lg:gap-20">
						<img
							src="./landing-image.svg"
							alt="Conversate"
							className="size-80 sm:size-96"
						/>
						<AnimatedDiv
							delay={700}
							direction="right"
							isLoading={pageLoading}
							className="space-y-5 sm:space-y-6 text-center sm:text-left"
						>
							<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
								Learning a Language?
								<br />
								<span className="bg-gradient-to-bl from-[#65a30d] via-[#16a34a] to-[#15803d] bg-clip-text text-transparent">
									Start with a Friend.
								</span>
							</h2>
							<p className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto sm:mx-0 leading-relaxed">
								Meet amazing people, share cultures, and master
								languages together. Every conversation is a new
								adventure!
							</p>
							<Link to="/signup">
								<HoverButton className="bg-gradient-to-bl from-[#65a30d] via-[#16a34a] to-[#15803d] rounded-3xl p-8 text-white font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 gap-4">
									<PlaneIcon className="size-6 rotate-45 group-hover:rotate-0 transition-all duration-300" />
									Start Your Journey
								</HoverButton>
							</Link>
						</AnimatedDiv>
					</div>

					{/* Feature Cards */}
					<section className="w-full space-y-10 text-center">
						<AnimatedDiv
							delay={700}
							direction="left"
							isLoading={pageLoading}
							className="space-y-4"
						>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
								Why Choose Conversate?
							</h2>
							<p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
								Discover the features that make language
								learning fun and effective
							</p>
						</AnimatedDiv>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
							{features.map((feature, index) => (
								<FeatureCard
									key={index}
									isLoading={pageLoading}
									icon={feature.icon}
									title={feature.title}
									description={feature.description}
								/>
							))}
						</div>
					</section>

					{/* Fun Stats */}
					<section className="w-full space-y-10 text-center">
						<AnimatedDiv
							delay={600}
							direction="bottom"
							isLoading={pageLoading}
							className="space-y-4"
						>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
								Join Our Community Today!
							</h2>
							<p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
								Become part of a global community that's
								revolutionizing language learning
							</p>
						</AnimatedDiv>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
							{stats.map((stat, index) => (
								<AnimatedDiv
									key={index}
									delay={700 + index * 100}
									direction="bottom"
									isLoading={pageLoading}
								>
									<div className="group relative">
										<ProfileCard>
											<div className="">
												<div className="text-4xl sm:text-5xl mb-4 animate-bounce">
													{stat.emoji}
												</div>
												<div
													className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
												>
													{stat.value}
												</div>
												<div className="text-white/70 text-sm sm:text-base font-medium">
													{stat.description}
												</div>
											</div>
										</ProfileCard>
									</div>
								</AnimatedDiv>
							))}
						</div>
					</section>
				</div>
			</main>

			{/* Footer */}
			<footer className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-white/10">
				<div className="max-w-7xl mx-auto text-center">
					<p className="text-white/60 text-xs sm:text-sm">
						© Conversate. Making the world more connected, one
						conversation at a time.
					</p>
				</div>
			</footer>

			{/* Scroll to Top Button */}
			{showScrollToTop && (
				<button
					onClick={scrollToTop}
					className="cursor-pointer fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-bl from-[#65a30d] via-[#16a34a] to-[#15803d] rounded-full p-4 shadow-lg z-50 hover:scale-110 transition-transform duration-200"
				>
					<ArrowUp className="size-5 sm:size-6 text-white" />
				</button>
			)}
		</div>
	);
};

export default LandingPage;
