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
      <div className="flex gap-2">
        {!sidebarIsOpen && (
          <button onClick={() => setSidebarIsOpen(true)}>
            <BsList />
          </button>
        )}
        <span className="font-semibold text-center">Recipe Manager</span>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-2">
          <img
            src={
              user.avatar
                ? user.avatar
                : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/avatars/default-user.jpg?t=2023-08-23T20%3A36%3A15.282Z"
            }
            alt={user.name}
            className="h-6 hidden xs:inline"
          />
          <span className="hidden xs:inline">{user?.username}</span>
        </div>
        <button
          className="flex hover:text-orange-600 dark:hover:text-orange-300 items-center"
          onClick={logout}
        >
          <span className="uppercase">logout</span>
          <BsBoxArrowInRight />
        </button>
      </div>
    </div>
  );
}

export default Header;
