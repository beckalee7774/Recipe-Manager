import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRecipeInfo } from "../../services/apiRecipes";

export function useRecipeInfo() {
  const { id } = useParams();
  const {
    isLoading,
    data: recipeInfo,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeInfo({ id }),
  });
  return { isLoading, recipeInfo, error };
}
