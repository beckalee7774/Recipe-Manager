import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getEquipment } from "../../services/apiRecipes";

export function useEquipment() {
  const { id } = useParams();
  const {
    isLoading,
    data: equipment,
    error,
  } = useQuery({
    queryKey: ["equipment", id],
    queryFn: () => getEquipment({ id }),
  });
  return { isLoading, equipment, error };
}
