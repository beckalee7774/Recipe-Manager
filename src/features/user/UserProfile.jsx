import { Link, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import List from "../../ui/List";
import BackButton from "../../ui/BackButton";
import { useUser } from "./useUser";
import { useReviews } from "../review/useReviews";
import SharedReview from "../review/SharedReview";

function UserProfile({ home = false, userId = null }) {
  let { id } = useParams();
  if (home) id = userId;
  const { isLoading, user } = useUser({ userId: id });
  const { isLoading: isLoading2, reviews } = useReviews({
    userId: id,
    isProfile: true,
  });
  if (isLoading || isLoading2) return <Spinner />;
  return (
    <div className="max-w-xl mx-[auto] p-3">
      {!home && <BackButton />}
      <div className="bg-orange-300 dark:bg-orange-900 text-center p-2 flex flex-col items-center gap-1">
        <h1 className="text-xl">{user.name}</h1>
        <span className="text-xs">{user.username}</span>
        <img
          src={
            user.avatar
              ? user.avatar
              : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/avatars/default-user.jpg?t=2023-08-23T20%3A36%3A15.282Z"
          }
          alt={user.name}
          className="h-32"
        />
        <div className="flex gap-20 mt-5">
          <Link
            to={`/followers/${id}`}
            className="text-orange-600 hover:text-orange-800 dark:hover:text-orange-300"
          >
            Followers
          </Link>
          <Link
            to={`/following/${id}`}
            className="text-orange-600 hover:text-orange-800 dark:hover:text-orange-300"
          >
            Following
          </Link>
        </div>
        {reviews.length === 0 ? (
          <span className="text-xs uppercase mt-3">No Shared Reviews Yet</span>
        ) : (
          <List
            list={reviews}
            render={(review) => (
              <SharedReview review={review} key={review.id} />
            )}
            listStyle="list-none bg-orange-100 p-2 max-w-md mx-[auto] dark:bg-orange-700"
          />
        )}
      </div>
    </div>
  );
}

export default UserProfile;
