import RecipeLink from "../../ui/RecipeLink";
import { BsTrash3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserRecipe } from "../review/useUserRecipe";
import Spinner from "../../ui/Spinner";
import { useDeleteTodoReview } from "./useDeleteTodoReview";
import AddReviewModal from "../review/AddReviewModal";
import { useCurrentUser } from "../../contexts/UserContext";

function Todo({ todo }) {
  const { user } = useCurrentUser();
  const { isLoading, userRecipe } = useUserRecipe({
    recipeId: todo.recipeId,
  });
  console.log(todo);
  const { isDeleting, deleteTodoReview } = useDeleteTodoReview({
    userId: user.id,
  });
  if (isLoading || isDeleting) return <Spinner />;
  return (
    <li className="text-sm mb-3">
      <div className="flex gap-2 items-center justify-around">
        <img src={todo.image} alt={userRecipe.title} className="w-16" />
        <div className="flex flex-col">
          <span className="font-semibold">{userRecipe.title}</span>
          <RecipeLink
            sourceUrl={userRecipe.sourceUrl}
            sourceName={userRecipe.sourceName}
            size="xxs"
          />
          {userRecipe.isSpoontacularRecipe && (
            <Link
              className="text-[0.5rem] font-semibold hover:text-orange-400"
              to={`/recipe/${userRecipe.id}`}
            >
              Link to recipe details &rarr;
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <AddReviewModal
            userRecipe={userRecipe}
            todoExists={true}
            todoId={todo.id}
            todoImage={todo.image}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteTodoReview({
                id: todo.id,
                recipeId: todo.recipeId,
                image: todo.image,
              });
            }}
            className="text-[0.5rem] flex items-center gap-1 bg-red-100 text-red-700 px-1 rounded-full dark:bg-red-800 dark:text-red-200"
          >
            <BsTrash3 />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Todo;
