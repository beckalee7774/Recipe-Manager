import SearchedRecipe from "./SearchedRecipe";

function RecipeSearchList({ recipes }) {
  const max = recipes?.length === 10;
  const length = recipes.length;
  return (
    <div className="bg-orange-100 p-3 mt-3 rounded-md dark:bg-neutral-800">
      <h3 className="uppercase text-xs text-orange-700 mb-2 dark:text-orange-100">
        {max ? "Showing the top 10 results " : `Showing ${length} recipes`}
      </h3>
      <ul className="flex flex-col ">
        {recipes.map((recipe) => (
          <SearchedRecipe key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

export default RecipeSearchList;
