import { useState } from "react";
import { useCurrentUser } from "../../contexts/UserContext";
import { useAddTodo } from "./useAddTodo";
import { BsPlusCircle } from "react-icons/bs";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";

function AddTodoModal({}) {
  const { user } = useCurrentUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const { isAdding, addTodo } = useAddTodo({ userId: user.id });
  const { errors } = formState;
  function onSubmit(data) {
    addTodo(
      {
        recipeId: null,
        recipe: {
          title: data.title,
          sourceUrl: data.sourceUrl,
          sourceName: data.sourceName,
          isSpoontacularRecipe: false,
        },
        todo: {
          favourite: false,
          stars: 0,
          notes: "",
          status: "todo",
          userId: user.id,
          image: data.image,
        },
      },
      {
        onSuccess: () => {
          setModalIsOpen(false);
          reset();
        },
      }
    );
  }
  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="text-[0.5rem] flex items-center gap-1 bg-teal-100 text-teal-700 px-1 rounded-full dark:bg-teal-800 dark:text-teal-200"
      >
        <BsPlusCircle />
        <span>Todos</span>
      </button>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm">
          <div className="fixed bg-orange-100 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-4 w-5/6">
            <button
              onClick={() => {
                reset();
                setModalIsOpen(false);
              }}
              className=""
            >
              X
            </button>
            <Heading title="Add Todo" />

            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormRow label="title" error={errors?.title?.message}>
                <input
                  id="title"
                  disabled={isAdding}
                  {...register("title", {
                    required: "this field is required",
                  })}
                />
              </FormRow>
              <FormRow label="image" error={errors?.image?.message}>
                <input
                  id="image"
                  accept="image/*"
                  type="file"
                  disabled={isAdding}
                  {...register("image")}
                />
              </FormRow>
              <FormRow label="sourceUrl" error={errors?.sourceUrl?.message}>
                <input
                  id="sourceUrl"
                  disabled={isAdding}
                  {...register("sourceUrl", {
                    required: "this field is required",
                  })}
                />
              </FormRow>
              <FormRow label="sourceName" error={errors?.sourceName?.message}>
                <input
                  id="sourceName"
                  disabled={isAdding}
                  {...register("sourceName", {
                    required: "this field is required",
                  })}
                />
              </FormRow>
              <button className="hover:bg-orange-200 bg-orange-300 text-orange-900 p-2 rounded-full">
                Add to Reviews
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTodoModal;
