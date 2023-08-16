import { Outlet } from "react-router-dom";
import LoggedOutNavigation from "./LoggedOutNavigation";

function LoggedOutLayout() {
  return (
    <div className="bg-orange-200 h-screen mx-[auto] max-w-7xl font-mono">
      <LoggedOutNavigation />
      <Outlet />
    </div>
  );
}

export default LoggedOutLayout;
