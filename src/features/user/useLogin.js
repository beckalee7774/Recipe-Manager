import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "../../contexts/UserContext";
import { checkUserExists } from "../../services/apiUserRecipes";

export function useLogin({ userData }) {
  const queryClient = useQueryClient();
  const { setUseLocalStorage } = useCurrentUser();
  const {
    isLoading,
    data: user,
    refetch,
  } = useQuery({
    queryFn: () => checkUserExists({ userData }),
    queryKey: ["login", userData.username],
    enabled: false,
    onSuccess: (userObj) => {
      toast.success("Logged in");
      setUseLocalStorage(userObj);
      queryClient.invalidateQueries({
        queryKey: ["login", userData.username],
      });
    },
    onError: (e) => {
      if (e.message === "no such user exists") {
        toast.error("user does not exist check your username and password");
      } else {
        toast.error("error logging in user");
      }
    },
  });
  return { isLoading, user, refetch };
}
