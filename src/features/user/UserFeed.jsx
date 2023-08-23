import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import { useFeed } from "./useFeed";
import List from "../../ui/List";
import SharedReview from "../review/SharedReview";

function UserFeed() {
  const { user } = useCurrentUser();
  const { isLoading, feed } = useFeed({ userId: user.id });
  if (isLoading) return <Spinner />;
  if (feed.length === 0)
    return (
      <h3 className="text-center font-semibold">
        No Posts within the last 7 days
      </h3>
    );
  return (
    <div>
      <h2 className="text-center">Showing reviews within the last 7 days</h2>
      <List
        list={feed}
        render={(review) => (
          <SharedReview review={review} key={review.id} userNameIsLink={true} />
        )}
        listStyle="list-none bg-orange-100 p-2 max-w-md mx-[auto] dark:bg-orange-700"
      />
    </div>
  );
}

export default UserFeed;
