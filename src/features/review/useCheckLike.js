import { useQuery } from "@tanstack/react-query";
import { getLike } from "../../services/apiUserRecipes";

export function useCheckLike({userId, reviewId}) {
  const {
    isLoading,
    data: liked,
  } = useQuery({
    queryKey: ["like", userId, reviewId],
    queryFn: () => getLike({ userId, reviewId }),
  });
  return { isLoading, liked };
}
