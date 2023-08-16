import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateFavourite as updateFavouriteApi } from "../../services/apiUserRecipes";

export function useFavourite({ userId }) {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateFavourite } = useMutation({
    mutationFn: updateFavouriteApi,
    mutationKey: ["favourite"],
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
  return { isUpdating, updateFavourite };
}
