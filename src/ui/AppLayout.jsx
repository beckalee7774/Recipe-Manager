import { Outlet } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

function AppLayout() {
  const { sidebarIsOpen } = useSidebar();
  const layoutCSSString = sidebarIsOpen ? "grid-cols-[6rem_1fr]" : "";
  return (
    <div className="mx-[auto] max-w-7xl  font-mono">
      <div
        className={layoutCSSString.concat(
          " grid grid-rows-[auto_1fr] dark:text-orange-100 text-orange-800 h-screen"
        )}
      >
        {sidebarIsOpen && <Sidebar />}
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
}

export default AppLayout;
