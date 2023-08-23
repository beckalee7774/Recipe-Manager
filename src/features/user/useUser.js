import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUserRecipes";

export function useUser({ userId }) {
  const { isLoading, data: user } = useQuery({
    queryFn: () => getUser({ userId }),
    queryKey: ["user", userId],
  });
  return { isLoading, user };
}
