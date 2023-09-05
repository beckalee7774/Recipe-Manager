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
  const { isDeleting, deleteTodoReview } = useDeleteTodoReview({
    userId: user.id,
  });
  if (isLoading || isDeleting) return <Spinner />;
  return (
    <li className="text-sm mb-3 border-b border-orange-600">
      <div className="grid grid-cols-[minmax(70px,_auto)_1fr_1fr_auto] gap-2 items-center justify-center">
        <img
          src={
            todo.image
              ? todo.image
              : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/recipe-images/recipe-default-image.png?t=2023-08-23T20%3A38%3A38.220Z"
          }
          alt={userRecipe.title}
          className="w-16"
        />
        <span className="font-semibold">{userRecipe.title}</span>
        <div className="flex flex-col">
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
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-1 items-center">
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
            className="text-xs flex items-center gap-1 px-1 rounded-full hover:text-orange-700 dark:hover:text-orange-300"
          >
            <BsTrash3 />
          </button>
        </div>
      </div>
    </li>
  );
}

export default Todo;
