import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../services/apiUserRecipes";

export function useFollowers({ followedId }) {
  const { isLoading, data: followers } = useQuery({
    queryFn: () => getFollowers({ followedId }),
    queryKey: ["followers", followedId],
  });
  return { isLoading, followers };
}
