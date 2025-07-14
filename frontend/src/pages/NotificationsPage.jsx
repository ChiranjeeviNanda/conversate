import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
	acceptFriendRequest,
	getFriendRequests,
	rejectFriendRequest,
} from "../lib/api";
import { ComponentLoader } from "../components/Loaders";
import {
	BadgePlusIcon,
	BellRingIcon,
	CircleCheckBigIcon,
	UserPlus2Icon,
} from "lucide-react";
import NotFoundCard from "../components/NotFoundCard";
import {
	FriendRequestCard,
	NewConnectionCard,
} from "../components/NotificationsPageCards";
import AnimatedDiv from "../components/AnimatedDiv";
import Pagination from "../components/Pagination";

const NotificationsPage = () => {
	const [pageLoading, setPageLoading] = useState(true);
	const [processingAccepts, setProcessingAccepts] = useState(new Set());
	const [processingRejects, setProcessingRejects] = useState(new Set());

	const [connectionsCurrentPage, setConnectionsCurrentPage] = useState(0);
	const [requestsCurrentPage, setRequestsCurrentPage] = useState(0);
	const connectionsPerPage = 3;
	const requestsPerPage = 4;

	const queryClient = useQueryClient();

	const { data: friendRequests, isLoading: isFriendRequestsLoading } =
		useQuery({
			queryKey: ["friendRequests"],
			queryFn: getFriendRequests,
		});

	const { mutate: acceptRequestMutation } = useMutation({
		mutationFn: acceptFriendRequest,
		onMutate: (requestId) => {
			setProcessingAccepts((prev) => new Set(prev).add(requestId));
		},
		onSettled: (_, __, requestId) => {
			queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			setProcessingAccepts((prev) => {
				const newSet = new Set(prev);
				newSet.delete(requestId);
				return newSet;
			});
		},
	});

	const { mutate: rejectRequestMutation } = useMutation({
		mutationFn: rejectFriendRequest,
		onMutate: (requestId) => {
			setProcessingRejects((prev) => new Set(prev).add(requestId));
		},
		onSettled: (_, __, requestId) => {
			queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			setProcessingRejects((prev) => {
				const newSet = new Set(prev);
				newSet.delete(requestId);
				return newSet;
			});
		},
	});

	const pendingRequests = friendRequests?.pendingRequests
		? [...friendRequests.pendingRequests].reverse()
		: [];
	const acceptedRequests = friendRequests?.acceptedRequests
		? [...friendRequests.acceptedRequests].reverse()
		: [];

	// Pagination calculations
	const totalConnectionsPages = Math.ceil(
		acceptedRequests.length / connectionsPerPage
	);
	const totalRequestsPages = Math.ceil(
		pendingRequests.length / requestsPerPage
	);

	const startConnectionsIndex = connectionsCurrentPage * connectionsPerPage;
	const endConnectionsIndex = startConnectionsIndex + connectionsPerPage;
	const currentConnections = acceptedRequests.slice(
		startConnectionsIndex,
		endConnectionsIndex
	);

	const startRequestsIndex = requestsCurrentPage * requestsPerPage;
	const endRequestsIndex = startRequestsIndex + requestsPerPage;
	const currentRequests = pendingRequests.slice(
		startRequestsIndex,
		endRequestsIndex
	);

	const getRelativeTime = (date) => {
		const now = new Date();
		const inputDate = new Date(date);
		const diffInHours = Math.floor(
			(now.getTime() - inputDate.getTime()) / (1000 * 60 * 60)
		);
		if (diffInHours < 1) return "Just now";
		if (diffInHours < 24) return `${diffInHours}h ago`;
		if (diffInHours < 48) return "Yesterday";
		return `${Math.floor(diffInHours / 24)}d ago`;
	};

	useEffect(() => {
		const timer = setTimeout(() => setPageLoading(false), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
			<div className="container mx-auto max-w-7xl space-y-8">
				{/* Header */}
				<AnimatedDiv
					delay={200}
					direction="top"
					isLoading={pageLoading}
					className="text-center space-y-6 pt-8"
				>
					<div className="flex items-center justify-center gap-4">
						<div className="p-3 mt-2 rounded-2xl bg-primary/10 border border-primary/20">
							<BellRingIcon className="size-8 text-primary" />
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
							Notifications
						</h1>
					</div>
					<p className="text-xl text-base-content/70 max-w-3xl mx-auto">
						Stay updated with your friend requests and new
						connections
					</p>
				</AnimatedDiv>

				{isFriendRequestsLoading ? (
					<ComponentLoader />
				) : (
					<>
						{/* New Connections Section */}
						{acceptedRequests.length > 0 && (
							<section className="space-y-8">
								{/* Header */}
								<AnimatedDiv
									delay={700}
									direction="left"
									isLoading={pageLoading}
									className="flex items-center gap-4 mb-6"
								>
									<div className="p-3 rounded-2xl bg-primary shadow-lg">
										<BadgePlusIcon className="size-6 text-base-100" />
									</div>
									<div>
										<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
											New Connections
										</h2>
										<p className="text-base-content/70 flex items-center gap-2">
											Recent friendships formed
										</p>
									</div>
								</AnimatedDiv>

								{/* Connection Notifications */}
								<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
									{currentConnections.map(
										(notification, index) => (
											<NewConnectionCard
												key={notification._id}
												notification={notification}
												index={index}
												isLoading={pageLoading}
												getRelativeTime={
													getRelativeTime
												}
											/>
										)
									)}
								</div>

								{/* Connections Pagination */}
								<AnimatedDiv
									delay={800}
									direction="bottom"
									isLoading={pageLoading}
								>
									<Pagination
										currentPage={connectionsCurrentPage}
										totalPages={totalConnectionsPages}
										onPageChange={setConnectionsCurrentPage}
										totalItems={acceptedRequests.length}
										itemsPerPage={connectionsPerPage}
										showInfo={true}
										className="mt-6"
									/>
								</AnimatedDiv>
							</section>
						)}

						{/* Friend Requests Section */}
						{pendingRequests.length > 0 && (
							<section className="space-y-8">
								{/* Header */}
								<AnimatedDiv
									delay={700}
									direction="left"
									isLoading={pageLoading}
								>
									<div className="flex items-center gap-4 mb-6">
										<div className="relative p-3 rounded-2xl bg-primary shadow-lg">
											<UserPlus2Icon className="relative left-0.5 size-6 text-base-100" />
											<span className="absolute -top-2 -right-2 badge badge-neutral rounded-full border-2 border-base-100 text-sm font-bold shadow-lg">
												{pendingRequests.length}
											</span>
										</div>
										<div className="flex items-center">
											<div>
												<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
													Friend Requests
												</h2>
												<p className="text-base-content/70 flex items-center">
													New connections waiting for
													you
												</p>
											</div>
										</div>
									</div>
								</AnimatedDiv>

								{/* Request Notifications */}
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{currentRequests.map((request, index) => (
										<FriendRequestCard
											key={request._id}
											request={request}
											index={index}
											isLoading={pageLoading}
											processingAccepts={
												processingAccepts
											}
											processingRejects={
												processingRejects
											}
											onAccept={acceptRequestMutation}
											onReject={rejectRequestMutation}
										/>
									))}
								</div>

								{/* Requests Pagination */}
								<AnimatedDiv
									delay={800}
									direction="bottom"
									isLoading={pageLoading}
								>
									<Pagination
										currentPage={requestsCurrentPage}
										totalPages={totalRequestsPages}
										onPageChange={setRequestsCurrentPage}
										totalItems={pendingRequests.length}
										itemsPerPage={requestsPerPage}
										showInfo={true}
										className="mt-6"
									/>
								</AnimatedDiv>
							</section>
						)}

						{/* No Notifications Card */}
						{pendingRequests.length === 0 &&
							acceptedRequests.length === 0 && (
								<NotFoundCard
									icon={CircleCheckBigIcon}
									title="All caught up!"
									description="No new notifications right now. When you receive friend requests or make new connections, they'll appear here!"
									isLoading={pageLoading}
									variant="default"
								/>
							)}
					</>
				)}
			</div>
		</div>
	);
};

export default NotificationsPage;
