import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUserReviews } from "../../services/apiUserRecipes";

export function useReviews({ userId, isProfile = false }) {
  const [searchParams] = useSearchParams();
  const sortby = searchParams.get("sortby");
  const filter = searchParams.get("filter");
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", userId, sortby, filter, isProfile],
    queryFn: () => getUserReviews({ userId, sortby, filter, isProfile }),
  });
  return { isLoading, reviews, error };
}
