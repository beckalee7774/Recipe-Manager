import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNutritionInfo } from "../../services/apiRecipes";

export function useNutritionInfo() {
  const { id } = useParams();
  const {
    isLoading,
    data: nutritionInfo,
    error,
  } = useQuery({
    queryKey: ["nutrition", id],
    queryFn: () => getNutritionInfo({ id }),
  });
  return { isLoading, nutritionInfo, error };
}
