import TodoList from "../features/todo/TodoList";
import Heading from "../ui/Heading";

function TodoRecipes() {
  return (
    <>
      <Heading title="Todo Recipes" emoji="🍱" />
      <TodoList />
    </>
  );
}

export default TodoRecipes;
