import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoReview as deleteTodoReviewApi } from "../../services/apiUserRecipes";
import { toast } from "react-hot-toast";
export function useDeleteTodoReview({ userId, status }) {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteTodoReview } = useMutation({
    mutationFn: deleteTodoReviewApi,
    mutationKey: ["delete"],
    onSuccess: () => {
      toast.success("Sucessfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["todos", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews", userId],
      });
    },
    onError: () => {
      toast.error("Error deleting");
    },
  });
  return { isDeleting, deleteTodoReview };
}
