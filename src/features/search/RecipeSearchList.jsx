import SearchedRecipe from "./SearchedRecipe";

function RecipeSearchList({ recipes }) {
  const max = recipes?.length === 10;
  const length = recipes.length;
  return (
    <div className="bg-orange-100 p-3 mt-3 rounded-md dark:bg-orange-700">
      <h3 className="uppercase text-xs text-orange-700 mb-2">
        {max ? "Showing the top 10 results " : `Showing ${length} recipes`}
      </h3>
      <ul className="bg-orange-100 flex flex-col dark:bg-orange-700">
        {recipes.map((recipe) => (
          <SearchedRecipe key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

export default RecipeSearchList;
