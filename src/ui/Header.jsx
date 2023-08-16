import { BsList } from "react-icons/bs";
import { useSidebar } from "../contexts/SidebarContext";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useCurrentUser } from "../contexts/UserContext";
function Header() {
  const { sidebarIsOpen, setSidebarIsOpen } = useSidebar();
  const { user } = useCurrentUser();
  const { setUserLocalStorage } = useCurrentUser();
  function logout() {
    setUserLocalStorage({
      username: "none",
      password: "none",
    });
  }

  return (
    <div className="bg-orange-100 dark:bg-orange-600 p-2 flex justify-between">
      {!sidebarIsOpen && (
        <button onClick={() => setSidebarIsOpen(true)}>
          <BsList />
        </button>
      )}
      <span>Recipe Manager</span>
      <span>{user?.username}</span>
      <button
        onClick={logout}
        className="hover:text-orange-600 dark:hover:text-orange-300"
      >
        <BsBoxArrowInRight />
      </button>
    </div>
  );
}

export default Header;
