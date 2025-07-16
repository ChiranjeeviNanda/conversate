import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import {
	getOutgoingFriendReqs,
	getRecommendedUsers,
	getUserFriends,
} from "../lib/api";
import {
	UserPlus2Icon,
	Users2Icon,
	HomeIcon,
	BadgeAlertIcon,
	SearchIcon,
	HeartHandshakeIcon,
} from "lucide-react";
import FriendCard from "../components/FriendCard";
import { ComponentLoader } from "../components/Loaders";
import RecommendedUserCard from "../components/RecommendedUserCard";
import NotFoundCard from "../components/NotFoundCard";
import { NavigationButton } from "../components/HoverButton";
import AnimatedDiv from "../components/AnimatedDiv";
import Pagination from "../components/Pagination";
import useFriendsOrder from "../hooks/useFriendsOrder";

const HomePage = () => {
	const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());
	const [pageLoading, setpageLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const usersPerPage = 4;

	const { data: friends = [], isLoading: isFriendsLoading } = useQuery({
		queryKey: ["friends"],
		queryFn: getUserFriends,
	});

	const { data: rawRecommendedUsers = [], isLoading: isUsersLoading } =
		useQuery({
			queryKey: ["recommendedUsers"],
			queryFn: getRecommendedUsers,
		});

	const recommendedUsers = useMemo(() => {
		return [...rawRecommendedUsers].reverse();
	}, [rawRecommendedUsers]);

	const { data: outgoingFriendReqs } = useQuery({
		queryKey: ["outgoingFriendReqs"],
		queryFn: getOutgoingFriendReqs,
	});

	const { orderedFriends, handleFriendMessaged } = useFriendsOrder(friends);

	useEffect(() => {
		if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
			const newOutgoingReqIds = new Set();
			outgoingFriendReqs.forEach((req) => {
				newOutgoingReqIds.add(req.recipient._id);
			});
			setOutgoingReqIds(newOutgoingReqIds);
		}
	}, [outgoingFriendReqs]);

	useEffect(() => {
		const timer = setTimeout(() => setpageLoading(false), 100);
		return () => clearTimeout(timer);
	}, []);

	// Calculate pagination on reversed recommendedUsers
	const totalPages = Math.ceil(recommendedUsers.length / usersPerPage);
	const startIndex = currentPage * usersPerPage;
	const endIndex = startIndex + usersPerPage;
	const currentUsers = recommendedUsers.slice(startIndex, endIndex);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<div className="min-h-screen pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
			<div className="container mx-auto space-y-16 max-w-7xl">
				{/* Page Header */}
				<AnimatedDiv
					delay={200}
					direction="top"
					isLoading={pageLoading}
					className="text-center space-y-6 pt-8"
				>
					<div className="flex items-center justify-center gap-4">
						<div className="p-3 mt-2 rounded-2xl bg-primary/10 border border-primary/20">
							<HomeIcon className="size-8 text-primary" />
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
							Welcome Back!
						</h1>
					</div>
					<p className="text-xl text-base-content/70 max-w-3xl mx-auto">
						Continue your language learning journey with friends and
						discover new conversation partners
					</p>
				</AnimatedDiv>

				{/* Friends Section Header */}
				<div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
					<AnimatedDiv
						delay={700}
						direction="left"
						isLoading={pageLoading}
						className="flex items-center gap-4"
					>
						<div className="p-3 rounded-2xl bg-primary shadow-lg">
							<HeartHandshakeIcon className="size-6 text-base-100" />
						</div>
						<div className="flex items-center gap-3">
							<div>
								<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
									Your Friends
								</h2>
								<p className="text-base-content/70 flex items-center gap-2">
									Quick access to your language partners
								</p>
							</div>
						</div>
					</AnimatedDiv>

					{/* Buttons */}
					<AnimatedDiv
						delay={400}
						direction="right"
						isLoading={pageLoading}
						className="flex-1 sm:flex-none"
					>
						<div className="flex gap-3">
							{friends.length > 0 && (
								<NavigationButton
									to="/friends"
									icon={Users2Icon}
								>
									View All Friends
								</NavigationButton>
							)}
							<NavigationButton
								to="/notifications"
								icon={UserPlus2Icon}
							>
								Friend Requests
							</NavigationButton>
						</div>
					</AnimatedDiv>
				</div>

				{/* Friends Section */}
				<section>
					{isFriendsLoading ? (
						<ComponentLoader />
					) : friends.length === 0 ? (
						<NotFoundCard
							icon={Users2Icon}
							title="No friends yet"
							description="Connect with language partners below to start practicing together and unlock new conversations!"
							isLoading={pageLoading}
							variant="compact"
						/>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{orderedFriends.slice(0, 4).map((friend) => (
								<FriendCard
									key={friend._id}
									friend={friend}
									isLoading={pageLoading}
									variant="compact"
									onMessageClick={handleFriendMessaged}
								/>
							))}
						</div>
					)}
				</section>

				{/* Recommended Users Section Header */}
				<div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
					<AnimatedDiv
						delay={700}
						direction="left"
						isLoading={pageLoading}
						className="flex items-center gap-4"
					>
						<div className="p-3 rounded-2xl bg-primary shadow-lg">
							<BadgeAlertIcon className="size-6 text-base-100" />
						</div>
						<div>
							<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
								Meet New Learners
							</h2>
							<p className="text-base-content/70 flex items-center gap-2">
								Discover perfect language exchange partners
								based on your profile
							</p>
						</div>
					</AnimatedDiv>
				</div>

				{/* Recommended Users Section */}
				<section>
					{isUsersLoading ? (
						<ComponentLoader />
					) : recommendedUsers.length === 0 ? (
						<NotFoundCard
							icon={SearchIcon}
							title="No recommendations available"
							description="Check back later for new language partners who match your learning goals!"
							isLoading={pageLoading}
							variant="default"
						/>
					) : (
						<div className="space-y-6">
							{/* Users Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{currentUsers.map((user, index) => (
									<RecommendedUserCard
										key={user._id}
										user={user}
										index={index}
										isLoading={pageLoading}
										outgoingReqIds={outgoingReqIds}
										setOutgoingReqIds={setOutgoingReqIds}
									/>
								))}
							</div>

							{/* Pagination Controls */}
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
									totalItems={recommendedUsers.length}
									itemsPerPage={usersPerPage}
								/>
							</AnimatedDiv>
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default HomePage;
