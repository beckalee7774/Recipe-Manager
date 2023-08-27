import Review from "./Review";
import { useReviews } from "./useReviews";
import Spinner from "../../ui/Spinner";
import Sortby from "../../ui/Sortby";
import { useCurrentUser } from "../../contexts/UserContext";
import AddReviewModal from "./AddReviewModal";
import Filter from "../../ui/Filter";
function ReviewList() {
  const { user } = useCurrentUser();
  const { isLoading, reviews } = useReviews({ userId: user.id });
  if (isLoading) return <Spinner />;
  if (reviews.length === 0)
    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center">
          You have no recipes in your reviews list
        </h1>
        <AddReviewModal />
      </div>
    );
  return (
    <div className=" max-w-md mx-[auto]">
      <div className="flex gap-4">
        <Sortby />
        <Filter />
      </div>
      <ul className="dark:bg-neutral-800 dark:text-orange-200 bg-orange-100 p-2 text-orange-600">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
        <li>
          <AddReviewModal />
        </li>
      </ul>
    </div>
  );
}

export default ReviewList;
