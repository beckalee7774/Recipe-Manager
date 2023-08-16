import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "../../contexts/UserContext";
import { addUser } from "../../services/apiUserRecipes";

export function useSignup() {
  const queryClient = useQueryClient();
  const { setUserLocalStorage } = useCurrentUser();
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: addUser,
    onSuccess: (userObj) => {
      toast.success("user was successfully signed up");
      //logs in user
      setUserLocalStorage(userObj);
      queryClient.invalidateQueries({
        queryKey: ["login", userObj.username],
      });
    },
    onError: (e) => {
      if (e.message === "username is already taken") {
        toast.error("username is already taken");
      } else {
        toast.error("user could not be signed up");
      }
    },
  });
  return { isSigningUp, signup };
}
