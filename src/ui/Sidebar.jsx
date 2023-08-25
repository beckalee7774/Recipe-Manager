import { NavLink } from "react-router-dom";
import {
  BsSearch,
  BsPencil,
  BsCardChecklist,
  BsPersonGear,
  BsPersonPlus,
  BsReverseLayoutTextSidebarReverse,
  BsHouseDoor,
} from "react-icons/bs";
import Logo from "./Logo";
import { useSidebar } from "../contexts/SidebarContext";

function Sidebar() {
  const { setSidebarIsOpen } = useSidebar();
  return (
    <aside className="bg-orange-400 dark:bg-orange-700 row-span-2 p-1 border-r border-slate-100 relative">
      <button
        onClick={() => setSidebarIsOpen(false)}
        className="m-0 absolute top-0 left-2 text-xl"
      >
        x
      </button>
      <Logo />
      <nav>
        <ul className="flex flex-col gap-5 font-medium uppercase text-xs text-orange-100 p-1 dark:text-orange-200">
          <li>
            <NavLink
              to={`home`}
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsHouseDoor />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="search"
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsSearch />
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsPencil />
              <span>Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="todo"
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsCardChecklist />
              <span>Todo</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="search-users"
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsPersonPlus />
              <span>Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="feed"
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsReverseLayoutTextSidebarReverse />
              <span>Feed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              className="flex gap-2 hover:text-orange-800 dark:hover:text-orange-100"
            >
              <BsPersonGear />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
