import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { follow as followApi } from "../../services/apiUserRecipes";

export function useFollow({ followerId, followedId }) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: follow } = useMutation({
    mutationFn: followApi,
    mutationKey: ["follow", followerId],
    onSuccess: () => {
      toast.success("Successfully followed");
      queryClient.invalidateQueries({
        queryKey: ["follows", followerId],
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
      toast.error("Error could not follow user");
    },
  });
  return { isLoading, follow };
}
