import { useState } from "react";
import RecipeSearchList from "./RecipeSearchList";
import { useSearch } from "./useSearch";

function Search() {
  const [search, setSearch] = useState("");
  const [searchByIngredients, setSearchByIngredients] = useState(false);
  const { recipes, refetch } = useSearch({
    search: search.trim(),
    searchByIngredients,
  });
  function handleSubmit(e) {
    e.preventDefault();
    refetch();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <div className="text-xs flex gap-2 items-center mt-4">
          <label htmlFor="searchByIngredients">Search By Ingredients?</label>
          <input
            type="checkbox"
            id="searchByIngredients"
            className="h-4 w-4 accent-orange-400 focus:outline-none focus:ring
            focus:ring-orange-400 focus:ring-offset-2"
            value={searchByIngredients}
            onChange={(e) => {
              setSearchByIngredients(e.target.checked);
            }}
          />
        </div>
      </form>
      <span className="text-[0.5rem]">
        {searchByIngredients && (
          <span>
            Separate ingredients by &quot;, &quot; for the best results
          </span>
        )}
      </span>
      {recipes?.length > 0 ? (
        <RecipeSearchList recipes={recipes} />
      ) : (
        <p className="dark:text-orange-200 text-xs uppercase text-orange-600 mt-5 font-semibold">
          To start please search the database
        </p>
      )}
    </>
  );
}

export default Search;
