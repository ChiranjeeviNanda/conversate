import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserFriends } from "../lib/api";
import {
	Users2Icon,
	SearchIcon,
	XIcon,
	HeartHandshakeIcon,
	BadgePlusIcon,
	SearchXIcon,
} from "lucide-react";
import FriendCard from "../components/FriendCard";
import { ComponentLoader } from "../components/Loaders";
import NotFoundCard from "../components/NotFoundCard";
import AnimatedDiv from "../components/AnimatedDiv";
import GlassCard from "../components/GlassCard";
import Pagination from "../components/Pagination";
import useFriendsOrder from "../hooks/useFriendsOrder";

const FriendsPage = () => {
	const [pageLoading, setPageLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const friendsPerPage = 8;

	const { data: friends = [], isLoading: isFriendsLoading } = useQuery({
		queryKey: ["friends"],
		queryFn: getUserFriends,
	});

	const { orderedFriends, handleFriendMessaged } = useFriendsOrder(friends);

	// Filter friends based on search term
	const filteredFriends = orderedFriends.filter(
		(friend) =>
			friend.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			friend.nativeLanguage
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			friend.learningLanguage
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);

	// Calculate pagination
	const totalPages = Math.ceil(filteredFriends.length / friendsPerPage);
	const startIndex = currentPage * friendsPerPage;
	const endIndex = startIndex + friendsPerPage;
	const currentFriends = filteredFriends.slice(startIndex, endIndex);

	// Get unique languages for insights
	const nativeLanguages = [...new Set(friends.map((f) => f.nativeLanguage))];
	const learningLanguages = [
		...new Set(friends.map((f) => f.learningLanguage)),
	];

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	// Reset to first page when search changes
	useEffect(() => {
		setCurrentPage(0);
	}, [searchTerm]);

	useEffect(() => {
		const timer = setTimeout(() => setPageLoading(false), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
			<div className="container mx-auto space-y-12 max-w-7xl">
				{/* Page Header */}
				<AnimatedDiv
					delay={200}
					direction="top"
					isLoading={pageLoading}
					className="text-center space-y-6 pt-8"
				>
					<div className="flex items-center justify-center gap-4">
						<div className="p-3 mt-2 rounded-2xl bg-primary/10 border border-primary/20">
							<Users2Icon className="size-8 text-primary" />
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
							My Friends
						</h1>
					</div>
					<p className="text-xl text-base-content/70 max-w-3xl mx-auto">
						Connect with language partners across the globe and grow
						together
					</p>
				</AnimatedDiv>

				{/* Search and Stats Section */}
				<AnimatedDiv
					delay={300}
					direction="top"
					isLoading={pageLoading}
					className="space-y-6 max-w-7xl mx-auto"
				>
					<div className="flex flex-col lg:flex-row items-center justify-between gap-6">
						{/* Search Bar */}
						<div className="flex flex-col w-full lg:max-w-lg transition-all duration-500 ease-out">
							<div className="flex items-center gap-3">
								<div className="relative flex-1 group">
									<SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-base-content/50 z-10 transition-colors duration-300 group-focus-within:text-primary" />
									<input
										type="text"
										placeholder="Search by name or language..."
										className="w-full pl-12 pr-4 py-4 rounded-2xl border border-base-content/30 backdrop-blur-sm focus:outline-none focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl placeholder:text-base-content/50 text-base-content"
										value={searchTerm}
										onChange={(e) =>
											setSearchTerm(e.target.value)
										}
									/>
								</div>

								{searchTerm && (
									<div className="transition-all duration-300 ease-out">
										<button
											onClick={() => setSearchTerm("")}
											className="cursor-pointer p-3 rounded-2xl border border-base-content/30 backdrop-blur-sm hover:border-error/50 hover:bg-error/10 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl group"
										>
											<XIcon className="size-5 text-base-content/50 group-hover:text-error transition-colors duration-300" />
										</button>
									</div>
								)}
							</div>

							<div
								className={`mt-3 text-sm text-base-content/70 transition-all duration-300 ease-out ${
									searchTerm
										? "opacity-100 max-h-10 translate-y-0"
										: "opacity-0 max-h-0 -translate-y-2"
								}`}
							>
								<div className="flex items-center gap-2">
									<div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
									<span>
										<span className="font-semibold text-primary">
											{filteredFriends.length}
										</span>{" "}
										{filteredFriends.length === 1
											? "friend"
											: "friends"}{" "}
										matching{" "}
										<span className="font-semibold text-secondary">
											"{searchTerm}"
										</span>
									</span>
								</div>
							</div>
						</div>

						{/* Friend Stats */}
						{friends.length > 0 && (
							<AnimatedDiv
								delay={400}
								direction="right"
								isLoading={pageLoading}
								className="flex-1 sm:flex-none"
							>
								<div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 w-full lg:w-auto justify-center lg:justify-end">
									<GlassCard
										className="text-center p-4 max-w-[100px] sm:max-w-[200px] h-full"
										gradient={true}
									>
										<div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
											{friends.length}
										</div>
										<div className="text-xs sm:text-sm text-base-content/70 font-medium">
											Total Friends
										</div>
									</GlassCard>

									<GlassCard
										className="text-center p-4 max-w-[100px] sm:max-w-[200px] h-full"
										gradient={true}
									>
										<div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
											{nativeLanguages.length}
										</div>
										<div className="text-xs sm:text-sm text-base-content/70 font-medium">
											Native Languages
										</div>
									</GlassCard>

									<GlassCard
										className="text-center p-4 max-w-[100px] sm:max-w-[200px] h-full"
										gradient={true}
									>
										<div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
											{learningLanguages.length}
										</div>
										<div className="text-xs sm:text-sm text-base-content/70 font-medium">
											Learning Languages
										</div>
									</GlassCard>
								</div>
							</AnimatedDiv>
						)}
					</div>
				</AnimatedDiv>

				{/* Friends Section */}
				<section className="space-y-8">
					{/* Header */}
					{friends.length > 0 && (
						<AnimatedDiv
							delay={700}
							direction="left"
							isLoading={pageLoading}
							className="flex items-center gap-4"
						>
							<div className="relative p-3 rounded-2xl bg-primary shadow-lg">
								<HeartHandshakeIcon className="size-6 text-base-100" />
							</div>
							<div className="flex items-center gap-3">
								<div>
									<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
										Your Language Partners
									</h2>
									<p className="text-base-content/70 flex items-center gap-2">
										Practice with your friends now!
									</p>
								</div>
							</div>
						</AnimatedDiv>
					)}

					{/* Friends Content */}
					<AnimatedDiv
						delay={800}
						direction="bottom"
						isLoading={pageLoading || isFriendsLoading}
						className="w-full"
					>
						{isFriendsLoading ? (
							<ComponentLoader />
						) : friends.length === 0 ? (
							<NotFoundCard
								icon={BadgePlusIcon}
								title="No friends yet"
								description="Connect with language partners to start practicing together and unlock new conversations!"
								isLoading={pageLoading}
							/>
						) : filteredFriends.length === 0 ? (
							<NotFoundCard
								icon={SearchXIcon}
								title="No friends found"
								description="Try adjusting your search terms to find the friend you're looking for!"
								isLoading={false}
								variant="default"
							/>
						) : (
							<div className="space-y-8">
								{/* Friends Grid */}
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
									{currentFriends.map((friend) => (
										<FriendCard
											key={friend._id}
											friend={friend}
											// index={index} // You can remove this if not used for visual purposes related to initial loading animations
											isLoading={pageLoading}
											variant="default"
											onMessageClick={
												handleFriendMessaged
											}
										/>
									))}
								</div>

								{/* Pagination */}
								<AnimatedDiv
									delay={800}
									direction="bottom"
									isLoading={pageLoading}
								>
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
										showInfo={true}
										totalItems={filteredFriends.length}
										itemsPerPage={friendsPerPage}
									/>
								</AnimatedDiv>
							</div>
						)}
					</AnimatedDiv>
				</section>
			</div>
		</div>
	);
};

export default FriendsPage;
