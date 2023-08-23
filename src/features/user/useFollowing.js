import { useQuery } from "@tanstack/react-query";
import { getFollowing } from "../../services/apiUserRecipes";

export function useFollowing({ followerId }) {
  const { isLoading, data: following } = useQuery({
    queryFn: () => getFollowing({ followerId }),
    queryKey: ["following", followerId],
  });
  return { isLoading, following };
}
