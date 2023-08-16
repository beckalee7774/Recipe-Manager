import supabase from "./supabase";

//api requests to supabase database
export async function getUserReviews({ userId }) {
  let { data: userRecipes, error } = await supabase
    .from("user-recipes")
    .select("*")
    .eq("status", "review")
    .eq("userId", userId)
    .order("created_at", { ascending: true });
  if (error) {
    console.log(error);
    throw new Error("error getting user Reviews");
  }
  return userRecipes;
}

export async function getUserTodos({ userId }) {
  let { data: userRecipes, error } = await supabase
    .from("user-recipes")
    .select("*")
    .eq("status", "todo")
    .eq("userId", userId)
    .order("created_at", { ascending: true });
  if (error) {
    console.log(error);
    throw new Error("error getting user Tods");
  }
  return userRecipes;
}

export async function getUserRecipe({ recipeId }) {
  let { data: recipes, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", recipeId);
  if (error) {
    console.log(error);
    throw new Error("error getting user recipe");
  }
  return recipes[0];
}

export async function addTodo({ recipeId, recipe, todo }) {
  //first check if the user has already added this recipe to their todo list
  let { data: dataUserRecipeCheck, error: errorUserRecipeCheck } =
    await supabase
      .from("user-recipes")
      .select("*")
      .eq("recipeId", recipeId)
      .eq("userId", todo.userId);
  if (errorUserRecipeCheck) {
    throw new Error(errorUserRecipeCheck);
  }
  if (dataUserRecipeCheck[0]) {
    throw new Error("Error Duplicate");
  }

  //check if recipe alredy exists in recipe database
  let { data: dataRecipe, error: errorRecipe } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", recipeId);
  if (errorRecipe) throw new Error("error checking if recipe is in database");

  if (dataRecipe.length === 0) {
    //if not add to the database
    const { data, error } = await supabase
      .from("recipes")
      .insert([{ ...recipe }])
      .select();

    if (error) {
      console.log(error);
      throw new Error("error adding todo recipe to databse");
    }
  }

  //add todo to database now that recipe is definitely in the database
  const { data, error } = await supabase
    .from("user-recipes")
    .insert([{ ...todo }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("error adding todo recipe");
  }
  return data;
}

export async function addReview({ review, todoExists }) {
  console.log(review);
  console.log(todoExists);
  if (todoExists) {
    //update current todo row
    const { data, error } = await supabase
      .from("user-recipes")
      .update({ ...review })
      .eq("id", review.id)
      .select();
    if (error) {
      console.log(error);
      throw new Error("error adding review recipe");
    }
    return data;
  } else {
    //insert new row in recipes
    //insert new row in user-recipes
    const { data, error } = await supabase
      .from("user-recipes")
      .insert([{ ...review }])
      .select();
    if (error) {
      console.log(error);
      throw new Error("error adding review recipe");
    }
    return data;
  }
}

// export async function getUser({ userId }) {
//   let { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", userId);
//   if (error) {
//     console.log(error);
//     throw new Error("error getting user");
//   }
//   return data[0];
// }

export async function deleteTodoReview({ id, recipeId }) {
  //delete todo/review
  const { data, error } = await supabase
    .from("user-recipes")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("error deleting");
  }
  //check how many other users use this recipe
  const { data: recipes, error: errorRecipe } = await supabase
    .from("user-recipes")
    .select("*")
    .eq("recipeId", recipeId);
  if (errorRecipe) {
    throw new Error("Error checking if recipe is in recipe table");
  }
  //if no other users use this recipe then delete it
  if (recipes.length === 0) {
    const { error: errorDeleteRecipe } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipeId);
    if (errorDeleteRecipe)
      console.log(
        "Error deleting recipe from recipe table (this recipe is no longer used by any user)"
      );
  }
  return data;
}

export async function updateNotes({ id, notes }) {
  const { data, error } = await supabase
    .from("user-recipes")
    .update({ notes })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("error updating notes");
  }
  return data;
}
export async function updateFavourite({ id, favourite }) {
  const { data, error } = await supabase
    .from("user-recipes")
    .update({ favourite })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("error updating favourite");
  }
  return data;
}

export async function addUser({ user }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ ...user }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("error signing up user");
  }
  return data;
}

//used for logins
export async function checkUserExists({ userData }) {
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", userData.username)
    .eq("password", userData.password);

  if (error) {
    console.log(error);
    throw new Error("error signing up user");
  }
  if (!users[0]) {
    throw new Error("no such user exists");
  } else {
    return users[0];
  }
}

export async function updateUser({ user, userId }) {
  //check if username exists
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", user.username);

  users.forEach(function (user) {
    if (user.id !== userId) {
      throw new Error("username is already taken");
    }
  });

  //is username is not taken then update this user
  const { data, error: error2 } = await supabase
    .from("users")
    .update({ ...user })
    .eq("id", userId)
    .select();

  if (error) {
    console.log(error);
    throw new Error("error updating user");
  }
  console.log(data);
  return data[0];
}
