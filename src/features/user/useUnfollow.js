import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { unfollow as unfollowApi } from "../../services/apiUserRecipes";

export function useUnfollow({ followerId, followedId }) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: unfollow } = useMutation({
    mutationFn: unfollowApi,
    onSuccess: () => {
      toast.success("Successfully unfollowed");
      queryClient.invalidateQueries({
        queryKey: ["follows", followerId, followedId],
      });
      queryClient.invalidateQueries({
        queryKey: ["following", followerId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followers", followedId],
      });
      queryClient.invalidateQueries({
        queryKey: ["feed", followerId],
      });
    },
    onError: () => {
      toast.error("Error could not unfollow user");
    },
  });
  return { isLoading, unfollow };
}
