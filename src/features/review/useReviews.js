import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUserReviews } from "../../services/apiUserRecipes";

export function useReviews({ userId }) {
  const [searchParams] = useSearchParams();
  const sortby = searchParams.get("sortby");
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", userId, sortby],
    queryFn: () => getUserReviews({ userId, sortby }),
  });
  return { isLoading, reviews, error };
}
