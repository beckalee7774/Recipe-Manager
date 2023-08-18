import { Link } from "react-router-dom";
import RecipeLink from "../../ui/RecipeLink";
import Spinner from "../../ui/Spinner";
import ReviewOperations from "./ReviewOperations";
import { BsCheckSquare, BsUpload } from "react-icons/bs";
import { useUserRecipe } from "./useUserRecipe";
import { useSidebar } from "../../contexts/SidebarContext";
import { useDeleteTodoReview } from "../todo/useDeleteTodoReview";
import { useEffect, useRef, useState } from "react";
import { useUpdateReview } from "./useUpdateReview";
import { useCurrentUser } from "../../contexts/UserContext";
import StarRating from "../../ui/StarRating";
function Review({ review }) {
  const { user } = useCurrentUser();
  const { isLoading, userRecipe } = useUserRecipe({
    recipeId: review.recipeId,
  });
  const { sidebarIsOpen } = useSidebar();
  const layoutStringSidebar = sidebarIsOpen ? "flex-col" : "gap-3";
  const { isDeleting, deleteTodoReview } = useDeleteTodoReview({
    userId: user.id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [notes, setNotes] = useState(review.notes);
  const [image, setImage] = useState("");
  const [starRating, setStarRating] = useState(review.stars);
  const { isUpdating, updateReview } = useUpdateReview({ userId: user.id });
  const inputRef = useRef(null);
  const notesCss = isEditing
    ? "border-slate-500 bg-slate-50 p-1 text-slate-500 focus:outline-none focus:ring focus:ring-orange-400"
    : "border-orange-500 bg-orange-100 dark:bg-orange-600";
  useEffect(
    function () {
      if (isEditing) {
        inputRef.current.focus();
      }
    },
    [isEditing]
  );
  function handleUpdate(e) {
    const reviewToUpdate = isUploadingPhoto
      ? { notes, image, stars: starRating }
      : { notes, stars: starRating };
    e.preventDefault();
    updateReview(
      { review: reviewToUpdate, id: review.id, oldImage: review.image },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  }
  if (isLoading || isDeleting || isUpdating) return <Spinner />;
  if (userRecipe.title === "Maple Salmon") {
    console.log(review.image);
  }
  return (
    <li className="text-sm mb-3">
      {/* <div className="flex gap-2 items-center justify-around"> */}
      <div className="grid grid-cols-[minmax(70px,_auto)_1fr_auto] gap-2 items-center">
        <img
          src={
            review.image
              ? review.image
              : "../../../public/recipe-default-image.png"
          }
          alt={userRecipe.title}
          className="w-16"
        />
        <div
          className={layoutStringSidebar.concat(
            " flex sm:gap-0 sm:grid sm:grid-cols-[1fr_1fr] sm:items-center sm:justify-center"
          )}
        >
          <div>
            <StarRating
              stars={review.stars}
              isEditing={isEditing}
              rating={starRating}
              setRating={setStarRating}
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
        <ReviewOperations
          review={review}
          deleteTodoReview={deleteTodoReview}
          setIsEditing={setIsEditing}
          setStarRating={setStarRating}
          isEditing={isEditing}
          setNotes={setNotes}
        />
      </div>
      <form className="relative  text-xs" onSubmit={handleUpdate}>
        {isEditing && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsUploadingPhoto((up) => !up);
            }}
            className="py-1 px-2 hover:text-orange-700 rounded-full my-2 dark:hover:text-orange-100"
          >
            <div className="flex gap-1 items-center">
              {!isUploadingPhoto && <BsUpload />}
              <span>{isUploadingPhoto ? "x cancel" : "upload"}</span>
            </div>
          </button>
        )}
        {isEditing && isUploadingPhoto && (
          <div className="my-1">
            <input
              id="newImage"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files)}
            />
          </div>
        )}
        <textarea
          className={"mt-1 border-b p-1 w-full overflow-scroll ".concat(
            notesCss
          )}
          value={notes}
          disabled={!isEditing}
          ref={inputRef}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        {isEditing && (
          <button className="absolute bottom-3 right-5 hover:bg-orange-200">
            <BsCheckSquare />
          </button>
        )}
      </form>
    </li>
  );
}

export default Review;
