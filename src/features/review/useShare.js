import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateShare as updateShareApi } from "../../services/apiUserRecipes";

export function useShare({ userId }) {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateShare } = useMutation({
    mutationFn: updateShareApi,
    mutationKey: ["share"],
    onSuccess: () => {
      toast.success("Sucessfully updated");
      queryClient.invalidateQueries({
        queryKey: ["reviews", userId],
      });
    },
    onError: () => {
      toast.error("Error updating");
    },
  });
  return { isUpdating, updateShare };
}
