import { useQuery } from "@tanstack/react-query";
import { searchRecipes } from "../../services/apiRecipes";

export function useSearch({ search, searchByIngredients }) {
  const {
    isLoading,
    data: recipes,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => searchRecipes({ search, searchByIngredients }),
    enabled: false,
  });
  return { isLoading, recipes, error, refetch };
}
