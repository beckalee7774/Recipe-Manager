import { Outlet } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import LoggedOutNavigation from "./LoggedOutNavigation";
import Logo from "./Logo";

function LoggedOutLayout() {
  return (
    <div className="dark:bg-neutral-800 dark:text-orange-100 bg-orange-300 font-mono fixed top-0 left-0 w-screen h-screen mx-auto">
      <div className="absolute right-3 top-12">
        <DarkModeToggle />
      </div>
      <div className="fixed max-w-xl dark:bg-neutral-700 bg-orange-100 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]  w-5/6">
        <div className="absolute h-48 w-48 left-1/2 translate-x-[-50%] top-[-200px]">
          <Logo />
        </div>
        <LoggedOutNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default LoggedOutLayout;
