import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import { useFeed } from "./useFeed";
import List from "../../ui/List";
import SharedReview from "../review/SharedReview";
import { feedLastDays } from "./useFeed";

function UserFeed() {
  const { user } = useCurrentUser();
  const { isLoading, feed } = useFeed({ userId: user.id });
  if (isLoading) return <Spinner />;
  if (feed.length === 0)
    return (
      <h3 className="text-center font-semibold">
        No Posts within the last {feedLastDays} days
      </h3>
    );
  return (
    <div>
      <List
        title={`Showing reviews within the last ${feedLastDays} days`}
        list={feed}
        render={(review) => (
          <SharedReview review={review} key={review.id} userNameIsLink={true} />
        )}
        listStyle="list-none bg-orange-100 max-w-md mx-[auto]"
      />
    </div>
  );
}

export default UserFeed;
