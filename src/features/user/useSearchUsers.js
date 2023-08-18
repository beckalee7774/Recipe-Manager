import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUserRecipes";

export function useSearchUsers({ search, userId }) {
  const {
    isRefetching,
    data: users,
    refetch,
  } = useQuery({
    queryFn: () => getUsers({ search, userId }),
    queryKey: ["searchUsers", userId],
    enabled: false,
  });
  return { isRefetching, users, refetch };
}
