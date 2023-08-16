import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo as addTodoApi } from "../../services/apiUserRecipes";
import { toast } from "react-hot-toast";
export function useAddTodo({ userId }) {
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate: addTodo } = useMutation({
    mutationFn: addTodoApi,
    mutationKey: ["addTodo"],
    onSuccess: () => {
      toast.success("Sucessfully added Todo");
      queryClient.invalidateQueries({
        queryKey: ["todos", userId],
      });
    },
    onError: (e) => {
      if (e.message === "Error Duplicate") {
        toast.error("This recipe is already in your todo or review list");
      } else {
        toast.error("Error adding Todo");
      }
    },
  });
  return { isAdding, addTodo };
}
