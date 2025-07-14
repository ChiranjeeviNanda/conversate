import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

const useFriendRequestStatus = (
	userId,
	outgoingRequestIds,
	setOutgoingReqIds
) => {
	const [isSending, setIsSending] = useState(false);
	const [hasError, setHasError] = useState(false);
	const queryClient = useQueryClient();

	const { mutate: sendRequest } = useMutation({
		mutationFn: () => sendFriendRequest(userId),
		onMutate: () => {
			setIsSending(true);
			setHasError(false);
			setOutgoingReqIds((prev) => new Set([...prev, userId]));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
			toast.success("Friend request sent!");
		},
		onSettled: () => {
			setIsSending(false);
		},
		onError: (error) => {
			setHasError(true);
			toast.error(
				error.response?.data?.message || "Something went wrong"
			);
		},
	});

	const isRequestSent = outgoingRequestIds.has(userId);

	return {
		isRequestSent,
		isSending,
		sendRequest,
		hasError,
	};
};

export default useFriendRequestStatus;
