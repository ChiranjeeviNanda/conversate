import { axiosInstance } from "./axios";

export const signUp = async (signUpData) => {
	const response = await axiosInstance.post("/auth/signup", signUpData);
	return response.data;
};

export const logIn = async (logInData) => {
	const response = await axiosInstance.post("/auth/login", logInData);
	return response.data;
};

export const logOut = async () => {
	const response = await axiosInstance.post("/auth/logout");
	return response.data;
};

export const getAuthUser = async () => {
	try {
		const res = await axiosInstance.get("/auth/me");
		return res.data;
	} catch (error) {
		console.error("Error in getAuthUser api: ", error);
		return null;
	}
};

export const completeOnboarding = async (userData) => {
	const response = await axiosInstance.post("/auth/onboarding", userData);
	return response.data;
};

export const updateProfile = async (profileData) => {
	const res = await axiosInstance.put("/auth/update", profileData);
	return res.data;
};

export const getUserFriends = async () => {
	const response = await axiosInstance.get("/user/friends");
	return response.data;
};

export const getRecommendedUsers = async () => {
	const response = await axiosInstance.get("/user");
	return response.data;
};

export const getOutgoingFriendReqs = async () => {
	const response = await axiosInstance.get("/user/outgoing-friend-requests");
	return response.data;
};

export const sendFriendRequest = async (userId) => {
	const response = await axiosInstance.post(`/user/friend-request/${userId}`);
	return response.data;
};

export const getFriendRequests = async () => {
	const response = await axiosInstance.get("/user/friend-requests");
	return response.data;
};

export const acceptFriendRequest = async (requestId) => {
	const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
	return response.data;
};

export const rejectFriendRequest = async (requestId) => {
	const response = await axiosInstance.put(`/user/friend-request/${requestId}/reject`);
	return response.data;
};

export const getStreamToken = async () => {
	const response = await axiosInstance.get("/chat/token");
	return response.data;
};
