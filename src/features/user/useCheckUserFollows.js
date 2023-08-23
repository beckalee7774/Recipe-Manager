import { useQuery } from "@tanstack/react-query";
import { checkUserFollows } from "../../services/apiUserRecipes";

export function useCheckUserFollows({ followerId, followedId }) {
  const { isLoading, data: userFollows } = useQuery({
    queryFn: () => checkUserFollows({ followerId, followedId }),
    queryKey: ["follows", followerId],
  });
  return { isLoading, userFollows };
}
