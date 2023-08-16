import RecipeNutrition from "../features/recipe/RecipeNutrition";
import BackButton from "../ui/BackButton";
import Heading from "../ui/Heading";

function Nutrition() {
  return (
    <>
      <BackButton />
      <Heading title="Recipe Nutrition" emoji="🌱" />
      <RecipeNutrition />
    </>
  );
}

export default Nutrition;
