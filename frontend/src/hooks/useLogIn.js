import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "../lib/api";

const useLogIn = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending, error } = useMutation({
		mutationFn: logIn,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
	});

	return { logInMutation: mutate, error, isPending };
};

export default useLogIn;
