import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../ui/Spinner";
import AddTodoModal from "./AddTodoModal";
import Todo from "./Todo";
import { useTodos } from "./useTodos";

function TodoList() {
  const { user } = useCurrentUser();
  const { isLoading, todos } = useTodos({ userId: user.id });
  if (isLoading) return <Spinner />;
  if (todos.length === 0)
    return (
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-center">You have no recipes in your todo list</h1>
        <AddTodoModal />
      </div>
    );
  return (
    <ul className=" text-orange-600 bg-orange-100 p-2 max-w-md mx-[auto] dark:bg-neutral-800 dark:text-orange-200">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
      <li>
        <AddTodoModal />
      </li>
    </ul>
  );
}

export default TodoList;
