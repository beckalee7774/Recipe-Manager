import { useState } from "react";
import { useSearchUsers } from "./useSearchUsers";
import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import List from "../../ui/List";
import OtherUserRow from "./OtherUserRow";

function SearchUsers() {
  const [search, setSearch] = useState("");
  function handleSumbit(e) {
    e.preventDefault();
    if (search) refetch();
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
          title={`${users.length} ${users.length === 1 ? "Result" : "Results"}`}
          list={users}
          render={(searchedUser) => (
            <OtherUserRow
              otherUserID={searchedUser.id}
              userId={user.id}
              key={searchedUser.id}
            />
          )}
          listStyle="list-none p-2 bg-orange-100 dark:bg-orange-700"
        />
      )}
    </div>
  );
}

export default SearchUsers;
