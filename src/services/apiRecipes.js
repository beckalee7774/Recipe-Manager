//api requests to spoontacular api
const APIKEY = import.meta.env.VITE_SPOONTACULAR_API_KEY;
export async function searchRecipes({ search, searchByIngredients }) {
  var searchString;
  var fetchString;
  if (searchByIngredients) {
    searchString = search.replaceAll(", ", ",+");
    searchString = searchString.replaceAll(" ", "");
    fetchString = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKEY}&ingredients=${searchString}&ignorePantry=true`;
  } else {
    searchString = search.replaceAll(" ", "&");
    fetchString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${searchString}`;
  }
  try {
    const res = await fetch(fetchString);

    if (!res.ok) {
      throw new Error("Something went wrong with fetching recipes");
    }

    const data = await res.json();
    if (data === null) {
      throw new Error("Recipe not found");
    }
    if (data?.results) {
      return data.results;
    } else {
      return data;
    }
  } catch (err) {
    throw new Error();
  }
}

export async function searchByIngredients({ search }) {
  const searchString = search.replace(" ", "+");
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchString}&ignorePantry=true?apiKey=${APIKEY}&query=${search}`
    );

    if (!res.ok) {
      throw new Error(
        "Something went wrong with fetching recipes by ingredients"
      );
    }

    const data = await res.json();
    if (data.results === null) {
      throw new Error("Recipes not found");
    }
    return data.results;
  } catch (err) {
    throw new Error();
  }
}
export async function getRecipeInfo({ id }) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`
    );

    if (!res.ok) {
      throw new Error("Something went wrong with fetching recipe info");
    }

    const data = await res.json();
    if (data === null) {
      throw new Error("recipe not found");
    }
    return data;
  } catch (err) {
    throw new Error();
  }
}

export async function getNutritionInfo({ id }) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${APIKEY}`
    );

    if (!res.ok) {
      throw new Error("Something went wrong with fetching nutrition info");
    }

    const data = await res.json();
    console.log(data);
    if (data === null) {
      throw new Error("nutrition not found");
    }
    return data;
  } catch (err) {
    throw new Error();
  }
}

export async function getEquipment({ id }) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=${APIKEY}`
    );

    if (!res.ok) {
      throw new Error("Something went wrong with fetching enquipment info");
    }

    const data = await res.json();
    if (data === null) {
      throw new Error("enquipment not found");
    }
    return data;
  } catch (err) {
    throw new Error();
  }
}
