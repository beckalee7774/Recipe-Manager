import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import RecipeLink from "../../ui/RecipeLink";
import Spinner from "../../ui/Spinner";
import StarRating from "../../ui/StarRating";
import { useUser } from "../user/useUser";
import { useUserRecipe } from "./useUserRecipe";
//what is displayed in feed and user profile
function SharedReview({ review, userNameIsLink = false }) {
  const { isLoading, user } = useUser({ userId: review.userId });
  const { sidebarIsOpen } = useSidebar();
  const { isLoading: isLoading2, userRecipe } = useUserRecipe({
    recipeId: review.recipeId,
  });
  const layoutStringSidebar = sidebarIsOpen ? "flex-col" : "gap-3";
  if (isLoading || isLoading2) return <Spinner />;
  return (
    <li className="p-1 mb-4 text-orange-600 dark:text-orange-100">
      <header className="flex gap-2 items-center mb-2">
        {userNameIsLink ? (
          <Link to={`/user/${user.id}`} className="flex items-center gap-2">
            <img
              src={
                user?.avatar
                  ? user?.avatar
                  : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/avatars/default-user.jpg?t=2023-08-23T20%3A36%3A15.282Z"
              }
              alt={user?.name}
              className="h-8"
            />
            <span>{user?.username}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <img
              src={
                user?.avatar
                  ? user?.avatar
                  : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/avatars/default-user.jpg?t=2023-08-23T20%3A36%3A15.282Z"
              }
              alt={user?.name}
              className="h-8"
            />
            <span>{user?.username}</span>
          </div>
        )}
        <span>{format(parseISO(review.created_at), "eeee do MMM, yyyy")}</span>
      </header>
      <div className="grid grid-cols-[minmax(70px,_auto)_1fr_auto] gap-2 items-center">
        <img
          src={
            review.image
              ? review.image
              : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/recipe-images/recipe-default-image.png?t=2023-08-23T20%3A38%3A38.220Z"
          }
          alt={userRecipe.title}
          className="w-16"
        />
        <div
          className={layoutStringSidebar.concat(
            " flex sm:gap-0 sm:grid sm:grid-cols-[1fr_1fr] sm:items-center sm:justify-center"
          )}
        >
          <div className="flex flex-col items-center">
            <StarRating
              stars={review.stars}
              isEditing={false}
              rating={review.stars}
            />
            <span className="font-semibold">{userRecipe.title}</span>
          </div>
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
        </div>
      </div>
      <textarea
        className={
          "mt-1 border-b p-1 w-full overflow-scroll border-orange-500 bg-orange-100 dark:bg-orange-600"
        }
        value={review.notes}
        disabled={true}
      />
    </li>
  );
}

export default SharedReview;
