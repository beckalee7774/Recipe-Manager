import { useState } from "react";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import { useCurrentUser } from "../../contexts/UserContext";
import { useDeleteUser } from "./useDeleteUser";

function DeleteAccount() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isDeleting, deleteUser } = useDeleteUser();
  const { user } = useCurrentUser();
  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="text-red-700 bg-red-200 px-2 py-1 rounded-full mt-20 hover:bg-red-300 dark:bg-red-500 dark:text-red-100 dark:hover:bg-red-600"
      >
        Delete Account
      </button>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm">
          <div className="fixed bg-red-100 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-4 w-5/6 text-red-700 dark:bg-red-800 dark:text-red-100">
            <button onClick={() => setModalIsOpen(false)} className="">
              X
            </button>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <BsFillExclamationOctagonFill />
                <h1 className="font-semibold">
                  Are you sure you want to delete your account?
                </h1>
              </div>
              <button
                disabled={isDeleting}
                onClick={() => deleteUser({ userId: user.id })}
                className="bg-red-200 px-2 py-1 rounded-full hover:bg-red-300 mt-3 dark:bg-red-500 dark:text-red-100 dark:hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteAccount;
