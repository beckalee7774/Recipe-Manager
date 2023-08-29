import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../../services/apiUserRecipes";
import { subDays } from "date-fns";
export const feedLastDays = 50;
export function useFeed({ userId }) {
  const { isLoading, data: feed } = useQuery({
    queryFn: () =>
      getFeed({
        userId,
        date: subDays(new Date(), feedLastDays).toISOString(),
      }),
    queryKey: ["feed", userId],
  });
  return { isLoading, feed };
}
