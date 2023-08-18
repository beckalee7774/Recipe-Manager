import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateReview as updateReviewApi } from "../../services/apiUserRecipes";

export function useUpdateReview({ userId }) {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateReview } = useMutation({
    mutationFn: updateReviewApi,
    mutationKey: ["updateReview"],
    onSuccess: () => {
      toast.success("Sucessfully updated review");
      queryClient.invalidateQueries({
        queryKey: ["reviews", userId],
      });
    },
    onError: () => {
      toast.error("Error updating");
    },
  });
  return { isUpdating, updateReview };
}
