import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/UserContext";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import StarRating from "../../ui/StarRating";
import { useAddReview } from "./useAddReview";

function AddReviewModal({
  userRecipe = null,
  todoExists = false,
  todoId = null,
  todoImage = null,
}) {
  const { user } = useCurrentUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: userRecipe ? userRecipe : {},
  });
  const { isAdding, addReview } = useAddReview({ userId: user.id });
  const [keepOldPhoto, setKeepOldPhoto] = useState(todoExists);
  const [starRating, setStarRating] = useState(0);
  const { errors } = formState;
  const navigate = useNavigate();
  function onSubmit(data) {
    //if !todoExists then we need add this recipe to the supabase database
    if (!todoExists) {
      addReview(
        {
          recipe: {
            title: data.title,
            sourceUrl: data.sourceUrl,
            sourceName: data.sourceName,
            isSpoontacularRecipe: false,
          },
          review: {
            userId: user.id,
            status: "review",
            favourite: data.favourite,
            stars: starRating,
            notes: data.notes,
            image: data.image,
            share: data.share,
          },
          todoExists,
          keepOldPhoto,
        },
        {
          onSuccess: () => {
            reset();
            setModalIsOpen(false);
          },
        }
      );
    }
    if (todoExists) {
      addReview(
        {
          review: {
            userId: user.id,
            status: "review",
            recipeId: userRecipe.id,
            favourite: data.favourite,
            stars: starRating,
            notes: data.notes,
            id: todoId,
            image: keepOldPhoto ? todoImage : data.image,
            share: data.share,
          },
          todoExists,
          keepOldPhoto,
          todoOldImage: todoImage,
        },
        {
          onSuccess: () => navigate("/reviews"),
        }
      );
    }
  }
  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="text-[0.5rem] flex items-center gap-1 bg-teal-100 text-teal-700 px-1 rounded-full dark:bg-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-700"
      >
        <BsPlusCircle />
        <span>Reviews</span>
      </button>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm">
          <div className="fixed bg-orange-100 dark:bg-neutral-800 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-4 w-5/6">
            <button
              onClick={() => {
                reset();
                setModalIsOpen(false);
              }}
            >
              X
            </button>
            <Heading title="Add Review" />

            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormRow label="title" error={errors?.title?.message}>
                <input
                  id="title"
                  disabled={isAdding || todoExists}
                  {...register("title", {
                    required: "this field is required",
                  })}
                  className="dark:text-orange-800"
                />
              </FormRow>
              {todoExists && (
                <select
                  value={keepOldPhoto}
                  onChange={(e) => {
                    setKeepOldPhoto(e.target.value === "true");
                  }}
                  className="dark:text-orange-800"
                >
                  <option value={true}>Keep old photo</option>
                  <option value={false}>add new photo photo</option>
                </select>
              )}
              {keepOldPhoto ? (
                <span className="overflow-scroll">image {todoImage}</span>
              ) : (
                <FormRow label="image" error={errors?.image?.message}>
                  <input
                    id="image"
                    accept={keepOldPhoto ? "" : "image/*"}
                    type={keepOldPhoto ? "text" : "file"}
                    disabled={isAdding || keepOldPhoto}
                    {...register("image")}
                  />
                </FormRow>
              )}
              <FormRow label="sourceUrl" error={errors?.sourceUrl?.message}>
                <input
                  id="sourceUrl"
                  disabled={isAdding || todoExists}
                  {...register("sourceUrl", {
                    required: "this field is required",
                  })}
                  className="dark:text-orange-800"
                />
              </FormRow>
              <FormRow label="sourceName" error={errors?.sourceName?.message}>
                <input
                  id="sourceName"
                  disabled={isAdding || todoExists}
                  {...register("sourceName", {
                    required: "this field is required",
                  })}
                  className="dark:text-orange-800"
                />
              </FormRow>
              <FormRow label="favourite" error={errors?.favourite?.message}>
                <input
                  id="favourite"
                  type="checkbox"
                  disabled={isAdding}
                  className="h-4 w-4 accent-orange-400 focus:outline-none focus:ring
            focus:ring-orange-400 focus:ring-offset-2"
                  {...register("favourite")}
                />
              </FormRow>
              <div className="flex items-center gap-2">
                <span>star rating</span>
                <StarRating
                  isEditing={true}
                  rating={starRating}
                  setRating={setStarRating}
                />
              </div>
              <FormRow label="notes" error={errors?.notes?.message}>
                <textarea
                  id="notes"
                  disabled={isAdding}
                  {...register("notes")}
                  className="dark:text-orange-800"
                />
              </FormRow>
              <FormRow label="share" error={errors?.share?.message}>
                <input
                  id="share"
                  disabled={isAdding}
                  type="checkbox"
                  className="h-4 w-4 accent-orange-400 focus:outline-none focus:ring
            focus:ring-orange-400 focus:ring-offset-2"
                  {...register("share")}
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

export default AddReviewModal;
