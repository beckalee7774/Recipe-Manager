import {
  BsTrash3,
  BsPencil,
  BsSend,
  BsFillHeartFill,
  BsHeart,
} from "react-icons/bs";
import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import { useFavourite } from "./useFavourite";
function ReviewOperations({ review, deleteTodoReview, setIsEditing }) {
  const { user } = useCurrentUser();
  const { isUpdating, updateFavourite } = useFavourite({ userId: user.id });
  if (isUpdating) return <Spinner />;
  return (
    <div className="grid grid-cols-2 gap-3">
      <button>
        <BsSend />
      </button>
      <button
        onClick={() =>
          updateFavourite({
            id: review.id,
            favourite: !review.favourite,
          })
        }
      >
        {review.favourite ? <BsFillHeartFill /> : <BsHeart />}
      </button>

      <button
        onClick={() => {
          setIsEditing((e) => !e);
        }}
      >
        <BsPencil />
      </button>
      <button>
        <BsTrash3
          onClick={() =>
            deleteTodoReview({ id: review.id, recipeId: review.recipeId })
          }
        />
      </button>
    </div>
  );
}

export default ReviewOperations;
