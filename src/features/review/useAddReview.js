import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview as addReviewApi } from "../../services/apiUserRecipes";
import { toast } from "react-hot-toast";
export function useAddReview({ userId }) {
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate: addReview } = useMutation({
    mutationFn: addReviewApi,
    mutationKey: ["addTodo"],
    onSuccess: () => {
      toast.success("Sucessfully added Review");
      queryClient.invalidateQueries({
        queryKey: ["reviews", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["todos", userId],
      });
    },
    onError: (e) => {
      toast.error("Error adding Review");
    },
  });
  return { isAdding, addReview };
}
