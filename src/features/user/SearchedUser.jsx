import { BsPlusCircle } from "react-icons/bs";

function SearchedUser({ user }) {
  return (
    <li className="border-b border-orange-800 flex p-1 items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src="../../../public/default-user.jpg"
          alt={`${user.name}`}
          className="h-12"
        />
        <div className="flex flex-col gap-1 items-start">
          <span className="text-md font-semibold">{user.username}</span>
          <span className="text-xs">{user.name}</span>
        </div>
      </div>
      <button className="text-[0.5rem] flex items-center gap-1 bg-teal-100 text-teal-700 px-1 rounded-full dark:bg-teal-800 dark:text-teal-200">
        <BsPlusCircle />
        <span>Follow</span>
      </button>
    </li>
  );
}

export default SearchedUser;
