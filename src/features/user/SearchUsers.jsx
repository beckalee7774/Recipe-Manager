import { useState } from "react";
import { useSearchUsers } from "./useSearchUsers";
import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import SearchedUser from "./SearchedUser";
import List from "../../ui/List";

function SearchUsers() {
  const [search, setSearch] = useState("");
  function handleSumbit(e) {
    e.preventDefault();
    refetch();
  }
  const { user } = useCurrentUser();
  const { isRefetching, users, refetch } = useSearchUsers({
    search,
    userId: user.id,
  });
  if (isRefetching) return <Spinner />;
  return (
    <div>
      <form onSubmit={handleSumbit} className="mb-3">
        <div className="flex gap-2 mt-3 items-center">
          <label
            htmlFor="search"
            className="text-orange-700 text-sm dark:text-orange-100"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            className="rounded-full p-1 dark:text-orange-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      {users?.length === 0 && <span>No Results found</span>}
      {users?.length !== 0 && users && (
        <List
          title="User Results"
          list={users}
          render={(user) => <SearchedUser user={user} key={user.id} />}
          listStyle="list-none p-2 bg-orange-100"
        />
      )}
    </div>
  );
}

export default SearchUsers;
