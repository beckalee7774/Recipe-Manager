import { useParams } from "react-router-dom";
import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import OtherUserRow from "./OtherUserRow";
import { useFollowers } from "./useFollowers";
import { useUser } from "./useUser";

function FollowersList() {
  const { id } = useParams();
  const { isLoading, user } = useUser({ userId: id });
  const { isLoading: isLoading2, followers } = useFollowers({
    followedId: user.id,
  });
  if (isLoading || isLoading2) return <Spinner />;
  return (
    <List
      list={followers}
      render={(followerId) => (
        <OtherUserRow
          otherUserID={followerId}
          userId={user.id}
          key={followerId}
        />
      )}
      listStyle="list-none"
    />
  );
}

export default FollowersList;
