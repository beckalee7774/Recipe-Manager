import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "../../contexts/UserContext";
import { updateUser as updateUserApi } from "../../services/apiUserRecipes";

export function useUpdateUser() {
  const { setUserLocalStorage } = useCurrentUser();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    mutationKey: ["updateUser"],
    onSuccess: (userObj) => {
      toast.success("Sucessfully updated");
      setUserLocalStorage(userObj);
    },
    onError: (e) => {
      if (e.message === "username is already taken") {
        toast.error("That username is already taken");
      } else {
        toast.error("Error updating");
      }
    },
  });
  return { isUpdating, updateUser };
}
