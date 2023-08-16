import { useQuery } from "@tanstack/react-query";
import { getUserTodos } from "../../services/apiUserRecipes";

export function useTodos({ userId }) {
  const {
    isLoading,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => getUserTodos({ userId }),
  });
  return { isLoading, todos, error };
}
