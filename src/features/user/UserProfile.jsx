import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import List from "../../ui/List";
import BackButton from "../../ui/BackButton";
import { useUser } from "./useUser";
import { useReviews } from "../review/useReviews";
import SharedReview from "../review/SharedReview";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";

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
          src={user.avatar ? user.avatar : "../../../public/default-user.jpg"}
          alt={user.name}
          className="h-32"
        />
        <List
          list={reviews}
          render={(review) => <SharedReview review={review} key={review.id} />}
          listStyle="list-none bg-orange-100 p-2 max-w-md mx-[auto] dark:bg-orange-700"
        />
      </div>
      {home && (
        <div className="flex justify-between mt-5">
          <FollowersList user={user} />
          <FollowingList user={user} />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
