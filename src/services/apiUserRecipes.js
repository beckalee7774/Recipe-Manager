import supabase, { supabaseUrl } from "./supabase";

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
  const isSpoontacularRecipe = recipeId !== null;

  if (isSpoontacularRecipe) {
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
  } else {
    //this recipe is not a spoontacular recipe
    //insert recipe
    const { data, error } = await supabase
      .from("recipes")
      .insert([{ ...recipe }])
      .select();
    if (error) {
      console.log(error);
      throw new Error("error adding todo recipe");
    }
    //upload image
    const image = todo.image[0];
    const imageName = `${Math.random()}-${image.name}`?.replaceAll?.("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/recipe-images/${imageName}`;
    const { error: storageError } = await supabase.storage
      .from("recipe-images")
      .upload(imageName, image);
    if (storageError) throw new Error("could not upload image");
    //insert new row in user-recipes
    const { data: data2, error: error2 } = await supabase
      .from("user-recipes")
      .insert([{ ...todo, recipeId: data[0].id, image: imagePath }])
      .select();
    if (error2) {
      console.log(error2);
      throw new Error("error adding todo recipe");
    }
    return data2;
  }
}

export async function addReview({
  recipe,
  review,
  todoExists,
  keepOldPhoto,
  todoOldImage,
}) {
  if (todoExists) {
    if (!keepOldPhoto) {
      // we want to add a new photo to our review and update todo to review
      const image = review.image[0];
      const imageName = `${Math.random()}-${image.name}`?.replaceAll?.("/", "");
      const imagePath = `${supabaseUrl}/storage/v1/object/public/recipe-images/${imageName}`;

      //upload image
      const { error: storageError } = await supabase.storage
        .from("recipe-images")
        .upload(imageName, image);
      if (storageError) throw new Error(storageError);

      //if old image is stored in a supabase bucket then we should delete it
      const toDeleteString = `${supabaseUrl}/storage/v1/object/public/recipe-images/`;
      const imageName2 = todoOldImage.replace(toDeleteString, "");
      if (todoOldImage?.startsWith?.(supabaseUrl)) {
        const { error: storageError2 } = await supabase.storage
          .from("recipe-images")
          .remove([imageName2]);
        if (storageError2) throw new Error(storageError2);
      }

      //update current todo row
      const { data, error } = await supabase
        .from("user-recipes")
        .update({ ...review, image: imagePath })
        .eq("id", review.id)
        .select();
      if (error) {
        console.log(error);
        throw new Error("error adding review recipe");
      }
      return data;
    } else {
      //keep old photo
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
    }
  } else {
    //todo does not exists so we want to insert into both recipes and user-recipes
    //insert new row in recipes
    const { data, error } = await supabase
      .from("recipes")
      .insert([{ ...recipe }])
      .select();
    if (error) {
      console.log(error);
      throw new Error("error adding review recipe");
    }
    //upload image
    const image = review.image[0];
    const imageName = `${Math.random()}-${image.name}`?.replaceAll?.("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/recipe-images/${imageName}`;
    const { error: storageError } = await supabase.storage
      .from("recipe-images")
      .upload(imageName, image);
    if (storageError) throw new Error("could not upload image");
    //insert new row in user-recipes
    const { data: data2, error: error2 } = await supabase
      .from("user-recipes")
      .insert([{ ...review, recipeId: data[0].id, image: imagePath }])
      .select();
    if (error2) {
      console.log(error2);
      throw new Error("error adding review recipe");
    }
    return data2;
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

export async function deleteTodoReview({ id, recipeId, image }) {
  //delete todo/review
  const { data, error } = await supabase
    .from("user-recipes")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("error deleting");
  }
  //if this image is stored in a supabase bucket then we should delete it
  const toDeleteString = `${supabaseUrl}/storage/v1/object/public/recipe-images/`;
  const imageName = image.replace(toDeleteString, "");
  if (image?.startsWith?.(supabaseUrl)) {
    const { error: storageError } = await supabase.storage
      .from("recipe-images")
      .remove([imageName]);
    if (storageError) {
      console.log("here2");
      throw new Error(storageError);
    }
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

//used for sign ups
export async function addUser({ user }) {
  //check if username exists
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", user.username);

  if (error) {
    throw new Error("error signing up user");
  }
  if (users.length > 0) {
    throw new Error("username is already taken");
  }

  //if username does not exist then add this user
  const { data: users2, error: error2 } = await supabase
    .from("users")
    .insert([{ ...user }])
    .select();

  if (error2) {
    console.log(error2);
    throw new Error("error signing up user");
  }
  return users2[0];
}

export async function deleteUser({ userId }) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) {
    throw new Error("error deleting user");
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
  if (error) {
    throw new Error("error updating user");
  }

  users.forEach(function (user) {
    if (user.id !== userId) {
      throw new Error("username is already taken");
    }
  });

  //if username is not taken then update this user
  const { data, error: error2 } = await supabase
    .from("users")
    .update({ ...user })
    .eq("id", userId)
    .select();

  if (error2) {
    console.log(error2);
    throw new Error("error updating user");
  }
  return data[0];
}
