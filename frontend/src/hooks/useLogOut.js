import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../lib/api";

const useLogOut = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending, error } = useMutation({
		mutationFn: logOut,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
	});

	return { logOutMutation: mutate, error, isPending };
};

export default useLogOut;
