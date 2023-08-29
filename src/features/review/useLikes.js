import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../../services/apiUserRecipes";

export function useLikes({ reviewId }) {
  const { isLoading, data: likes } = useQuery({
    queryKey: ["likes", reviewId],
    queryFn: () => getLikes({ reviewId }),
  });
  return { isLoading, likes };
}
