import Spinner from "../../ui/Spinner";
import { useNutritionInfo } from "./useNutrition";

function RecipeNutrition() {
  const { isLoading, nutritionInfo } = useNutritionInfo();
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col bg-orange-50 p-2 rounded-md text-slate-600 text-sm dark:bg-orange-700">
      {nutritionInfo.nutrients.map((nutrient, i) => (
        <span
          key={i}
          className="border-b border-slate-600 p-2 dark:text-orange-100 dark:border-orange-100"
        >
          {nutrient.name}: {nutrient.amount} {nutrient.unit}
        </span>
      ))}
      <span className="mt-2 dark:text-orange-100">
        calories: {nutritionInfo.calories}
      </span>
    </div>
  );
}

export default RecipeNutrition;
