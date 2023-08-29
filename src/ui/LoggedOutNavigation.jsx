import { NavLink } from "react-router-dom";

function LoggedOutNavigation() {
  return (
    <nav className="flex justify-around dark:text-orange-500 text-orange-100 font-semibold bg-orange-400 dark:bg-neutral-900">
      <NavLink
        to="/login"
        className=" p-1  hover:text-orange-800 dark:hover:text-orange-100"
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className=" p-1 hover:text-orange-800 dark:hover:text-orange-100"
      >
        Sign up
      </NavLink>
    </nav>
  );
}

export default LoggedOutNavigation;
