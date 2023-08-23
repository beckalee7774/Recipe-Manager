import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import OtherUserRow from "./OtherUserRow";
import { useFollowers } from "./useFollowers";

function FollowersList({ user }) {
  const { isLoading, followers } = useFollowers({ followedId: user.id });
  if (isLoading) return <Spinner />;
  return (
    <List
      title="Followers"
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
