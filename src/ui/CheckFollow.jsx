import { NavLink, Outlet, useParams } from "react-router-dom";
import { useUser } from "../features/user/useUser";
import BackButton from "./BackButton";
import Spinner from "./Spinner";

function CheckFollow() {
  const { id } = useParams();
  const { isLoading, user } = useUser({ userId: id });
  if (isLoading) return Spinner;
  return (
    <div className="dark:bg-orange-900 p-2 h-screen m-3 bg-orange-300">
      <BackButton />
      <div className="flex flex-col items-center gap-1">
        <span className="text-center text-sm">{user.username}</span>
        <nav className="flex gap-10 text-orange-600 dark:text-orange-400">
          <NavLink
            to={`/followers/${id}`}
            className="text-center font-semibold hover:text-orange-800 dark:hover:text-orange-100"
          >
            Followers
          </NavLink>
          <NavLink
            to={`/following/${id}`}
            className="text-center font-semibold hover:text-orange-800 dark:hover:text-orange-100"
          >
            Following
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default CheckFollow;
