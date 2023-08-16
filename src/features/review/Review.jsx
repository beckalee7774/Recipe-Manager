import { Link } from "react-router-dom";
import RecipeLink from "../../ui/RecipeLink";
import Spinner from "../../ui/Spinner";
import ReviewOperations from "./ReviewOperations";
import { BsStarFill, BsCheckSquare } from "react-icons/bs";
import { useUserRecipe } from "./useUserRecipe";
import { useSidebar } from "../../contexts/SidebarContext";
import { useDeleteTodoReview } from "../todo/useDeleteTodoReview";
import { useEffect, useRef, useState } from "react";
import { useUpdateNotes } from "./useUpdateNotes";
import { useCurrentUser } from "../../contexts/UserContext";
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
  const [notes, setNotes] = useState(review.notes);
  const { isUpdating, updateNotes } = useUpdateNotes({ userId: user.id });
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
  function handleUpdateNotes(e) {
    e.preventDefault();
    updateNotes(
      { id: review.id, notes },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  }
  if (isLoading || isDeleting || isUpdating) return <Spinner />;
  return (
    <li className="text-sm mb-3">
      <div className="flex gap-2 items-center justify-around">
        <img src={userRecipe.image} alt={userRecipe.title} className="w-16" />
        <div
          className={layoutStringSidebar.concat(" flex sm:gap-3 sm:flex-row")}
        >
          <div>
            <div className="flex gap-1 mb-1">
              {Array.from({ length: review.stars }, (_, i) => (
                <BsStarFill className="h-2.5" key={i} />
              ))}
            </div>
            <span className="font-semibold">{userRecipe.title}</span>
          </div>
          <div className="flex flex-col">
            <RecipeLink
              sourceUrl={userRecipe.sourceUrl}
              sourceName={userRecipe.sourceName}
              size="xxs"
            />
            <Link
              className="text-[0.5rem] font-semibold hover:text-orange-400"
              to={`recipe/${userRecipe.id}`}
            >
              Link to recipe details &rarr;
            </Link>
          </div>
        </div>
        <ReviewOperations
          review={review}
          deleteTodoReview={deleteTodoReview}
          setIsEditing={setIsEditing}
        />
      </div>
      {/* <input
        className="text-xs mt-1 border-b border-slate-500 bg-slate-50 p-1 text-slate-500 w-full"
        value={`Notes: ${review.notes}`}
      /> */}
      <form className="relative" onSubmit={handleUpdateNotes}>
        <textarea
          className={"text-xs mt-1 border-b p-1 w-full overflow-scroll ".concat(
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
