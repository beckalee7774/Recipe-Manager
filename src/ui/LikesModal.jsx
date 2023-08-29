import { useState } from "react";
import { useCurrentUser } from "../contexts/UserContext";
import OtherUserRow from "../features/user/OtherUserRow";
import List from "./List";

function LikesModal({ likes }) {
  const numLikes = likes.length;
  const { user } = useCurrentUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="hover:text-orange-700"
      >
        <span>
          {numLikes} {numLikes === 1 ? "like" : "likes"}
        </span>
      </button>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm">
          <div className="fixed bg-orange-100 dark:bg-neutral-800 top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-4 w-5/6">
            <button
              onClick={() => {
                setModalIsOpen(false);
              }}
              className="absolute left-2 top-1 text-sm hover:text-orange-700"
            >
              X
            </button>
            {numLikes === 0 && <span>This review has no likes</span>}
            {numLikes > 0 && (
              <List
                title="Likes"
                listStyle="list-none"
                list={likes}
                render={(userLikedPost) => (
                  <OtherUserRow
                    otherUserID={userLikedPost.userId}
                    userId={user.id}
                    key={userLikedPost.id}
                  />
                )}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LikesModal;
