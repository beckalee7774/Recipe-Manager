import { useCurrentUser } from "../contexts/UserContext";
import UserProfile from "../features/user/UserProfile";

function Home() {
  const { user } = useCurrentUser();
  return <UserProfile home={true} userId={user.id} />;
}

export default Home;
