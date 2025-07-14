import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser.js";
import useThemeStore from "./store/useThemeStore.js";

import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import PageLoader from "./components/Loaders.jsx";
import Layout from "./components/Layout.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
	const { isLoading, authUser } = useAuthUser();
	const { theme } = useThemeStore();

	const isAuthenticated = Boolean(authUser);
	const isOnboarded = authUser?.isOnboarded;

	if (isLoading) return <PageLoader />;

	return (
		<div className="min-h-screen" data-theme={theme}>
			<Routes>
				<Route
					path="/"
					element={
						!isAuthenticated ? (
							<LandingPage />
						) : (
							<Navigate to="/home" />
						)
					}
				/>
				<Route
					path="/home"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showDock={true}>
								<HomePage />
							</Layout>
						) : (
							<Navigate
								to={!isAuthenticated ? "/" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/signup"
					element={
						!isAuthenticated ? (
							<SignUpPage />
						) : (
							<Navigate
								to={isOnboarded ? "/home" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/login"
					element={
						!isAuthenticated ? (
							<LogInPage />
						) : (
							<Navigate
								to={isOnboarded ? "/home" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/friends"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showDock={true}>
								<FriendsPage />
							</Layout>
						) : (
							<Navigate
								to={!isAuthenticated ? "/login" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/notifications"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showDock={true}>
								<NotificationsPage />
							</Layout>
						) : (
							<Navigate
								to={!isAuthenticated ? "/login" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/profile"
					element={
						isAuthenticated && isOnboarded ? (
							<Layout showDock={true}>
								<ProfilePage />
							</Layout>
						) : (
							<Navigate
								to={!isAuthenticated ? "/login" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/call/:id"
					element={
						isAuthenticated && isOnboarded ? (
							<CallPage />
						) : (
							<Navigate
								to={!isAuthenticated ? "/login" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/chat/:id"
					element={
						isAuthenticated && isOnboarded ? (
							<ChatPage />
						) : (
							<Navigate
								to={!isAuthenticated ? "/login" : "/onboarding"}
							/>
						)
					}
				/>
				<Route
					path="/onboarding"
					element={
						isAuthenticated ? (
							!isOnboarded ? (
								<OnboardingPage />
							) : (
								<Navigate to="/home" />
							)
						) : (
							<Navigate to="/login" />
						)
					}
				/>
			</Routes>

			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName="toast-container z-[9999]"
				containerStyle={{
					top: 20,
					left: 20,
					right: 20,
				}}
				toastOptions={{
					className:
						"shadow-xl rounded-xl p-4 flex items-center justify-between font-medium",
					style: {
						backgroundColor: "#ffffff",
						border: "1px solid #e5e7eb",
						borderRadius: "12px",
						color: "#111827",
						padding: "0.8rem 1rem",
						maxWidth: "90vw",
						fontSize: "1rem",
						fontFamily: "Inter, sans-serif",
					},
					success: {
						iconTheme: {
							primary: "#16a34a",
							secondary: "#ffffff",
						},
						style: {
							backgroundColor: "#d1fae5",
							border: "1px solid #16a34a",
							color: "#065f46",
						},
					},
					error: {
						iconTheme: {
							primary: "#dc2626",
							secondary: "#ffffff",
						},
						style: {
							backgroundColor: "#fee2e2",
							border: "1px solid #dc2626",
							color: "#7f1d1d",
						},
					},
					loading: {
						style: {
							backgroundColor: "#dbeafe",
							border: "1px solid #3b82f6",
							color: "#1e3a8a",
						},
					},
				}}
			/>
		</div>
	);
};

export default App;
