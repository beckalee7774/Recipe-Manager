import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateNotes as updateNotesApi } from "../../services/apiUserRecipes";

export function useUpdateNotes({ userId }) {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateNotes } = useMutation({
    mutationFn: updateNotesApi,
    mutationKey: ["updateNotes"],
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
  return { isUpdating, updateNotes };
}
