const BASE_PATH = "https://spoonacular.com/cdn/equipment_100x100/";
function EquipmentDetails({ equipment }) {
  const imagePath = BASE_PATH.concat(equipment.image);
  return (
    <li>
      <div className="flex gap-3 items-center text-slate-500 border-b dark:text-orange-100">
        <img src={imagePath} alt={equipment.name} className="w-20" />
        <span>{equipment.name}</span>
      </div>
    </li>
  );
}

export default EquipmentDetails;
