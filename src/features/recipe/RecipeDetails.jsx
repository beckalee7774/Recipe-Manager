import { useRecipeInfo } from "./useRecipeInfo";
import Spinner from "../../ui/Spinner";
import { BsFillHeartFill } from "react-icons/bs";
import List from "../../ui/List";
import BackButton from "../../ui/BackButton";
import RecipeLink from "../../ui/RecipeLink";
import { Link, useNavigate } from "react-router-dom";
import { useAddTodo } from "../todo/useAddTodo";
import { useCurrentUser } from "../../contexts/UserContext";
function RecipeDetails() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { isLoading, recipeInfo } = useRecipeInfo();
  const { isAdding, addTodo } = useAddTodo({ userId: user.id });
  if (isLoading || isAdding) return <Spinner />;
  console.log(recipeInfo);
  function handleTodo(e) {
    e.preventDefault();
    // addTodo();
    addTodo(
      {
        recipeId: recipeInfo.id,
        recipe: {
          id: recipeInfo.id,
          title: recipeInfo.title,
          sourceUrl: recipeInfo.sourceUrl,
          sourceName: recipeInfo.sourceName,
          healthScore: recipeInfo.healthScore,
          isSpoontacularRecipe: true,
        },
        todo: {
          favourite: false,
          stars: 0,
          notes: "",
          status: "todo",
          userId: user.id,
          recipeId: recipeInfo.id,
          image: recipeInfo.image,
        },
      },
      {
        onSuccess: () => navigate("/todo"),
      }
    );
  }

  return (
    <>
      <div className="flex gap-3 items-center justify-between">
        <BackButton />

        <button
          onClick={handleTodo}
          className="font-semibold text-[0.5rem] bg-teal-100 text-teal-700 uppercase p-1 rounded-full mb-2 dark:bg-teal-800 dark:text-teal-200"
        >
          Add to todo list
        </button>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-center font-bold">{recipeInfo.title}</h1>
        {/* add taste widgets? */}
        <img src={recipeInfo.image} alt={recipeInfo.id} className="w-40" />
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <BsFillHeartFill fill="orange" />
          <span className="font-semibold text-sm">
            {recipeInfo.aggregateLikes}
          </span>
        </div>
        {recipeInfo.veryPopular && (
          <span className="uppercase text-xs text-slate-50 bg-orange-600 p-1 font-semibold rounded-full">
            very popular
          </span>
        )}

        {recipeInfo.vegetarian && !recipeInfo.vegan && (
          <span className="uppercase text-xs text-slate-50 bg-green-700 p-1 font-semibold rounded-full">
            vegetarian
          </span>
        )}
        {recipeInfo.vegan && (
          <span className="uppercase text-xs text-slate-50 bg-green-500 p-1 font-semibold rounded-full">
            vegan
          </span>
        )}
        {recipeInfo.dairyFree && (
          <span className="uppercase text-xs text-slate-600 bg-white p-1 font-semibold rounded-full">
            dairy free
          </span>
        )}
      </div>
      <p className="text-xs mt-2 uppercase dark:text-green-400 text-green-700 font-semibold">
        Health score: {recipeInfo.healthScore}
      </p>
      <div className="flex items-center gap-4 mt-2">
        <span className="uppercase text-xs font-semibold text-orange-600 dark:text-orange-300">
          ready in {recipeInfo.readyInMinutes} minutes
        </span>
        <span className="uppercase text-xs font-semibold text-orange-700 dark:text-orange-200">
          {recipeInfo.servings} servings
        </span>
      </div>

      <RecipeLink
        sourceUrl={recipeInfo.sourceUrl}
        sourceName={recipeInfo.sourceName}
      />
      <div className="bg-orange-100 p-2 flex flex-col gap-4 dark:bg-orange-700">
        <List
          title="Ingredients 🧂"
          list={recipeInfo.extendedIngredients}
          render={(ingredient, i) => <li key={i}>{ingredient.original}</li>}
        />

        {recipeInfo.analyzedInstructions[0] && (
          <List
            title="Instructions 📃"
            list={recipeInfo.analyzedInstructions[0].steps}
            render={(instruction) => (
              <li key={instruction.number}>{instruction.step}</li>
            )}
          />
        )}
      </div>
      {recipeInfo.sustainable && (
        <span className="text-xs">This recipe is sustainable</span>
      )}
      <div className="flex gap-2 items-center mt-4 justify-around">
        <Link
          to={`/recipe/nutrition/${recipeInfo.id}`}
          className="font-semibold text-[0.5rem] bg-teal-100 text-teal-700 uppercase p-1 rounded-full mb-2 dark:bg-teal-800 dark:text-teal-200"
        >
          Check Nutrition Info
        </Link>
        <Link
          to={`/recipe/equipment/${recipeInfo.id}`}
          className="font-semibold text-[0.5rem] bg-teal-100 text-teal-700 uppercase p-1 rounded-full mb-2 dark:bg-teal-800 dark:text-teal-200"
        >
          Get Equipment Info
        </Link>
      </div>
    </>
  );
}

export default RecipeDetails;
