import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "../../contexts/UserContext";
import { deleteUser as deleteUserApi } from "../../services/apiUserRecipes";

export function useDeleteUser() {
  const { setUserLocalStorage } = useCurrentUser();
  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("Successfully deleted user");
      setUserLocalStorage({ username: "none", password: "none" });
    },
  });
  return { isDeleting, deleteUser };
}
