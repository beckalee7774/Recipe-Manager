import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addUser } from "../../services/apiUserRecipes";

export function useSignup() {
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("user was successfully signed up");
    },
    onError: () => {
      toast.success("user could not be signed up");
    },
  });
  return { isSigningUp, signup };
}
