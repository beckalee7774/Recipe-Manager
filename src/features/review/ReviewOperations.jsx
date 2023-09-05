import {
  BsTrash3,
  BsPencil,
  BsSend,
  BsFillHeartFill,
  BsHeart,
  BsFillSendFill,
  BsBookmarkHeartFill,
  BsBookmarkHeart,
} from "react-icons/bs";
import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import { useFavourite } from "./useFavourite";
import { useShare } from "./useShare";
function ReviewOperations({
  review,
  deleteTodoReview,
  setIsEditing,
  setStarRating,
  isEditing,
  setNotes,
}) {
  const { user } = useCurrentUser();
  const { isUpdating, updateFavourite } = useFavourite({ userId: user.id });
  const { isUpdating2, updateShare } = useShare({ userId: user.id });
  if ((isUpdating, isUpdating2)) return <Spinner />;
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => {
          updateShare({ id: review.id, share: !review.share });
        }}
        className="group relative"
      >
        {review.share ? <BsFillSendFill /> : <BsSend />}
        <p className="hidden bg-white rounded-md px-1 group-hover:block absolute bottom-4 right-0 text-[0.5rem]">
          share
        </p>
      </button>
      <button
        onClick={() =>
          updateFavourite({
            id: review.id,
            favourite: !review.favourite,
          })
        }
        className="group relative"
      >
        {review.favourite ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
        <p className="hidden bg-white rounded-md px-1 group-hover:block absolute bottom-4 right-0 text-[0.5rem]">
          favourite
        </p>
      </button>

      <button
        onClick={() => {
          if (isEditing) {
            setStarRating(review.stars);
            setNotes(review.notes);
          }
          setIsEditing((e) => !e);
        }}
      >
        <BsPencil />
      </button>
      <button>
        <BsTrash3
          onClick={() =>
            deleteTodoReview({
              id: review.id,
              recipeId: review.recipeId,
              image: review.image,
            })
          }
        />
      </button>
    </div>
  );
}

export default ReviewOperations;
