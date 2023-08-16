import { NavLink } from "react-router-dom";

function LoggedOutNavigation() {
  return (
    <nav className="flex justify-around  text-orange-100 font-semibold bg-orange-400">
      <NavLink to="/login" className=" p-1  hover:text-orange-800">
        Login
      </NavLink>
      <NavLink to="/signup" className=" p-1 hover:text-orange-800">
        Sign up
      </NavLink>
    </nav>
  );
}

export default LoggedOutNavigation;
