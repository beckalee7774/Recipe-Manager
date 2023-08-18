import { Link } from "react-router-dom";
import { BsArrowBarRight } from "react-icons/bs";

function SearchedRecipe({ recipe }) {
  return (
    <div className="border-b justify-between border-slate-400 grid grid-cols-[auto_1fr_auto] gap-2 items-center ">
      <img src={recipe.image} className="w-16" alt={`${recipe.title}`} />
      <h2 className="text-sm">{recipe.title}</h2>
      <Link
        to={`/recipe/${recipe.id}`}
        className="text-xs flex items-center text-orange-800 hover:cursor-pointer hover:text-orange-400  bg-orange-200 p-1 hover:bg-slate-100 dark:bg-orange-800 dark:text-orange-200"
      >
        <span>See more</span>
        <BsArrowBarRight />
      </Link>
    </div>
  );
}

export default SearchedRecipe;
