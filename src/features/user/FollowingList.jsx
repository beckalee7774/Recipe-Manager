import { useParams } from "react-router-dom";
import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import OtherUserRow from "./OtherUserRow";
import { useFollowing } from "./useFollowing";
import { useUser } from "./useUser";

function FollowingList() {
  const { id } = useParams();
  const { isLoading: isLoading2, user } = useUser({ userId: id });
  const { isLoading, following } = useFollowing({ followerId: user.id });
  if (isLoading || isLoading2) return <Spinner />;
  return (
    <List
      list={following}
      render={(followingId) => (
        <OtherUserRow
          otherUserID={followingId}
          userId={user.id}
          key={followingId}
        />
      )}
      listStyle="list-none"
    />
  );
}

export default FollowingList;
