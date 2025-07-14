import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending, error } = useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			toast.success("Profile updated successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (error) => {
			toast.error(
				error.response?.data?.message || "Something went wrong"
			);
		},
	});

	return { updateProfileMutation: mutate, error, isPending };
};

export default useUpdateProfile;
