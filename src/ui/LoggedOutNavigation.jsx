import { NavLink } from "react-router-dom";

function LoggedOutNavigation() {
  return (
    <nav className="flex grow justify-end text-orange-800 font-semibold">
      <NavLink
        to="/login"
        className="bg-orange-100 p-1 border-r border-orange-800 hover:bg-orange-300"
      >
        Login
      </NavLink>
      <NavLink to="/signup" className="bg-orange-100 p-1 hover:bg-orange-300">
        Sign up
      </NavLink>
    </nav>
  );
}

export default LoggedOutNavigation;
