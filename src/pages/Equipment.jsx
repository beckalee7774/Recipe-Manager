import RecipeEquipment from "../features/recipe/RecipeEquipment";
import BackButton from "../ui/BackButton";
import Heading from "../ui/Heading";

function Equipment() {
  return (
    <>
      <BackButton />
      <Heading title="Equipment" emoji="🍴" />
      <RecipeEquipment />
    </>
  );
}

export default Equipment;
