import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../../services/apiUserRecipes";

export function useReviews({ userId }) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", userId],
    queryFn: () => getUserReviews({ userId }),
  });
  return { isLoading, reviews, error };
}
