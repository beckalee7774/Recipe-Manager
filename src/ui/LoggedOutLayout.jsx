import { Outlet } from "react-router-dom";
import LoggedOutNavigation from "./LoggedOutNavigation";
import Logo from "./Logo";

function LoggedOutLayout() {
  return (
    <div className="bg-orange-300 font-mono fixed top-0 left-0 w-screen h-screen mx-auto">
      <div className="fixed max-w-xl bg-orange-100 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]  w-5/6">
        <div className="absolute h-48 w-48 left-1/3 top-[-200px]">
          <Logo />
        </div>
        <LoggedOutNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default LoggedOutLayout;
