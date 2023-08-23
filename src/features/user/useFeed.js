import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../../services/apiUserRecipes";
import { subDays } from "date-fns";
export function useFeed({ userId }) {
  const { isLoading, data: feed } = useQuery({
    queryFn: () =>
      getFeed({ userId, date: subDays(new Date(), 7).toISOString() }),
    queryKey: ["feed", userId],
  });
  return { isLoading, feed };
}
