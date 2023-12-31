import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { useCurrentUser } from "../../contexts/UserContext";
import DeleteAccount from "./DeleteAccount";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useUpdateUser } from "./useUpdateUser";
import { toast } from "react-hot-toast";
import DarkModeToggle from "../../ui/DarkModeToggle";

function UserOptions() {
  const { user } = useCurrentUser();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: user,
  });
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const { isUpdating, updateUser } = useUpdateUser();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  if (isUpdating) return <Spinner />;
  function onSubmit(data) {
    if (
      !isUploadingPhoto &&
      data.name === user.name &&
      data.username.toLowerCase() === user.username &&
      data.password === user.password
    ) {
      toast.error("To submit changes please update a field");
    } else {
      const userToUpdate = isUploadingPhoto
        ? {
            name: data.name,
            username: data.username.toLowerCase(),
            password: data.password,
            avatar: data.avatar,
          }
        : {
            name: data.name,
            username: data.username.toLowerCase(),
            password: data.password,
          };
      updateUser(
        {
          user: userToUpdate,
          userId: user.id,
          oldImage: user.avatar,
        },
        {
          onSuccess: () => {
            setIsUploadingPhoto(false);
          },
        }
      );
    }
  }
  function handleReset(e) {
    e.preventDefault();
    reset(user);
  }
  return (
    <div className="relative">
      <DarkModeToggle />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-orange-100 p-3 dark:bg-neutral-800"
      >
        <div className="flex flex-col gap-3 mb-4 ">
          <img
            src={
              user?.avatar
                ? user?.avatar
                : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/avatars/default-user.jpg?t=2023-08-23T20%3A36%3A15.282Z"
            }
            alt={user?.name}
            className="h-32 p-1 self-start"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsUploadingPhoto((up) => !up);
            }}
            className="py-1 px-2 hover:text-orange-700 rounded-full dark:hover:text-orange-100"
          >
            <div className="flex gap-1 items-center">
              {!isUploadingPhoto && <BsUpload />}
              <span>{isUploadingPhoto ? "x cancel" : "upload"}</span>
            </div>
          </button>
          {isUploadingPhoto && (
            <>
              <div>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  {...register("avatar", {
                    required:
                      "press cancel if you do not want to update your profile photo",
                  })}
                />
              </div>
              <span className="text-red-600">{errors?.avatar?.message}</span>
            </>
          )}
          <FormRow label="name">
            <input
              id="name"
              className="p-1 rounded-full dark:text-orange-800"
              {...register("name")}
            />
          </FormRow>
          <FormRow label="username">
            <input
              id="username"
              minLength={5}
              className="p-1 rounded-full dark:text-orange-800 lowercase"
              {...register("username")}
            />
          </FormRow>
          <FormRow label="password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="p-1 rounded-full dark:text-orange-800"
              {...register("password")}
            />
          </FormRow>
          <div className="flex gap-2">
            <FormRow label="show password">
              <input
                id="show password"
                type="checkbox"
                onClick={() => setShowPassword((p) => !p)}
              />
            </FormRow>
            <button
              onClick={handleReset}
              className="text-xs dark:bg-orange-500 bg-orange-200 px-2 py-1 rounded-full hover:bg-orange-300 dark:hover:bg-orange-700"
            >
              Reset
            </button>
          </div>
        </div>
        <button className="dark:bg-orange-500 bg-orange-800 text-orange-200 p-2 rounded-full text-xs hover:bg-orange-700 dark:hover:bg-orange-700 ">
          save changes
        </button>
      </form>
      <DeleteAccount />
    </div>
  );
}

export default UserOptions;
