import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import OtherUserRow from "./OtherUserRow";
import { useFollowing } from "./useFollowing";

function FollowingList({ user }) {
  const { isLoading, following } = useFollowing({ followerId: user.id });
  if (isLoading) return <Spinner />;
  return (
    <List
      title="Following"
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
