import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeReview as toggleLikeReviewApi } from "../../services/apiUserRecipes";

export function useToggleLikeReview() {
  const queryClient = useQueryClient();
  const { isLoading: isToggling, mutate: toggleLikeReview } = useMutation({
    mutationFn: toggleLikeReviewApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["like", data.userId, data.reviewId],
      });
      queryClient.invalidateQueries({
        queryKey: ["likes", data.reviewId],
      });
    },
  });
  return { isToggling, toggleLikeReview };
}
