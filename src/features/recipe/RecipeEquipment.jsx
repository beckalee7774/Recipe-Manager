import Spinner from "../../ui/Spinner";
import EquipmentDetails from "./EquipmentDetails";
import { useEquipment } from "./useEquipment";

function RecipeEquipment() {
  const { isLoading, equipment } = useEquipment();
  if (isLoading) return <Spinner />;
  if (equipment.equipment.length === 0)
    return (
      <h1 className="bg-orange-100 p-2 rounded-md">
        No equipment information available 😢
      </h1>
    );
  return (
    <div className="bg-white p-2 rounded-md dark:bg-orange-700">
      <div>
        <ul>
          {equipment.equipment.map((equipment, index) => (
            <EquipmentDetails equipment={equipment} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeEquipment;
