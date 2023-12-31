import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import RecipeLink from "../../ui/RecipeLink";
import Spinner from "../../ui/Spinner";
import StarRating from "../../ui/StarRating";
import { useUser } from "../user/useUser";
import { useUserRecipe } from "./useUserRecipe";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useCheckLike } from "./useCheckLike";
import { useCurrentUser } from "../../contexts/UserContext";
import { useToggleLikeReview } from "./useToggleLikeReview";
import { useLikes } from "./useLikes";
import LikesModal from "../../ui/LikesModal";
//what is displayed in feed and user profile
function SharedReview({ review, userNameIsLink = false }) {
  const { isLoading, user } = useUser({ userId: review.userId });
  const { sidebarIsOpen } = useSidebar();
  const { isLoading: isLoading2, userRecipe } = useUserRecipe({
    recipeId: review.recipeId,
  });
  const { isToggling, toggleLikeReview } = useToggleLikeReview();
  const { user: currentUser } = useCurrentUser();
  const { isLoading: isLoading3, liked } = useCheckLike({
    userId: currentUser.id,
    reviewId: review.id,
  });
  const { isLoading: isLoading4, likes } = useLikes({ reviewId: review.id });
  if (isLoading || isLoading2 || isLoading3 || isLoading4) return <Spinner />;
  return (
    <li className=" text-orange-600 dark:text-orange-100 dark:bg-neutral-800">
      <header className="dark:bg-neutral-700 dark:text-orange-100 bg-orange-400 text-orange-800 flex gap-3 items-center p-1 justify-between">
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
        <>
          <div className={`${sidebarIsOpen && "hidden s:inline"}`}>
            <span className="hidden xs:inline">
              {format(parseISO(review.created_at), "eeee do MMM, yyyy")}
            </span>
            <span className="xs:hidden">
              {format(parseISO(review.created_at), "do MMM")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LikesModal likes={likes} />
            {user.id !== currentUser.id && (
              <button
                className="text-red-600"
                disabled={isToggling}
                onClick={() =>
                  toggleLikeReview({
                    userId: currentUser.id,
                    reviewId: review.id,
                  })
                }
              >
                {liked ? <BsFillHeartFill /> : <BsHeart />}
              </button>
            )}
          </div>
        </>
      </header>
      <div className="grid grid-cols-[minmax(70px,_auto)_1fr_auto] gap-2 items-center ">
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
          className={`${
            sidebarIsOpen
              ? "grid grid-rows-[1fr_1fr] gap-2 p-2"
              : "grid grid-cols-[1fr_1fr] gap-4"
          } xs:gap-0 xs:grid xs:grid-cols-[1fr_1fr] xs:grid-rows-1 xs:items-center xs:justify-center`}
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
          "mt-1 p-1 w-full overflow-scroll bg-orange-100 dark:bg-neutral-800 text-orange-600 dark:text-orange-200"
        }
        value={review.notes}
        disabled={true}
      />
    </li>
  );
}

export default SharedReview;
