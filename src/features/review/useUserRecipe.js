import { useQuery } from "@tanstack/react-query";
import { getUserRecipe } from "../../services/apiUserRecipes";

// gets info from supabase not spoontacular to limit requests to spoontacular
export function useUserRecipe({ recipeId }) {
  const {
    isLoading,
    data: userRecipe,
    error,
  } = useQuery({
    queryKey: ["user-recipe", recipeId],
    queryFn: () => getUserRecipe({ recipeId }),
  });
  return { isLoading, userRecipe, error };
}
