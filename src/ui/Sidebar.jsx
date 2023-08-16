import { NavLink } from "react-router-dom";
import {
  BsSearch,
  BsPencil,
  BsCardChecklist,
  BsPersonGear,
} from "react-icons/bs";
import Logo from "./Logo";
import { useSidebar } from "../contexts/SidebarContext";

function Sidebar() {
  const { setSidebarIsOpen } = useSidebar();
  return (
    <aside className="bg-orange-400 dark:bg-orange-700 row-span-2 p-1 border-r border-slate-100 relative">
      <button
        onClick={() => setSidebarIsOpen(false)}
        className="m-0 absolute top-0 left-2"
      >
        x
      </button>
      <Logo />
      <nav>
        <ul className="flex flex-col gap-5 font-medium uppercase text-xs text-slate-50 p-1">
          <li>
            <NavLink to="search" className="flex gap-2 ">
              <BsSearch />
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className="flex gap-2 ">
              <BsPencil />
              <span>Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="todo" className="flex gap-2 ">
              <BsCardChecklist />
              <span>Todo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="settings" className="flex gap-2 ">
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
