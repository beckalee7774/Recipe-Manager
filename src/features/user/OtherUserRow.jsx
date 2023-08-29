import Spinner from "../../ui/Spinner";
import { useCheckUserFollows } from "./useCheckUserFollows";
import { useFollow } from "./useFollow";
import { useUnfollow } from "./useUnfollow";
import { useUser } from "./useUser";
import { BsPersonPlusFill, BsPersonDashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function OtherUserRow({ otherUserID, userId }) {
  const { isLoading, user: otherUser } = useUser({ userId: otherUserID });
  const { isLoading: isLoading2, userFollows } = useCheckUserFollows({
    followerId: userId,
    followedId: otherUserID,
  });
  const { isLoading: isLoading3, follow } = useFollow({
    followerId: userId,
    followedId: otherUserID,
  });
  const { isLoading: isLoading4, unfollow } = useUnfollow({
    followerId: userId,
    followedId: otherUserID,
  });
  if (isLoading || isLoading2 || isLoading3 || isLoading4) return <Spinner />;
  return (
    <li className="border-b dark:border-orange-100 border-orange-800 flex p-1 items-center justify-between">
      <Link
        to={`/user/${otherUser.id}`}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src={
            otherUser.avatar
              ? otherUser.avatar
              : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/avatars/default-user.jpg?t=2023-08-23T20%3A36%3A15.282Z"
          }
          alt={`${otherUser.name}`}
          className="h-12"
        />
        <div className="flex flex-col gap-1 items-start">
          <span className="text-md font-semibold">{otherUser.username}</span>
          <span className="text-xs">{otherUser.name}</span>
        </div>
      </Link>
      {userFollows && otherUserID !== userId && (
        <button
          className="text-[0.5rem] flex items-center gap-1 bg-teal-100 text-teal-700 px-1 rounded-full dark:bg-teal-800 dark:text-teal-200 hover:bg-teal-200"
          disabled={!userFollows}
          onClick={() => {
            unfollow({ followerId: userId, followedId: otherUser.id });
          }}
        >
          <BsPersonDashFill />
          <span>Unfollow</span>
        </button>
      )}

      {!userFollows && otherUserID !== userId && (
        <button
          className="text-[0.5rem] flex items-center gap-1 bg-teal-100 text-teal-700 px-1 rounded-full dark:bg-teal-800 dark:text-teal-200 hover:bg-teal-200"
          disabled={userFollows}
          onClick={() => {
            follow({ followerId: userId, followedId: otherUser.id });
          }}
        >
          <BsPersonPlusFill />
          <span>Follow</span>
        </button>
      )}
    </li>
  );
}

export default OtherUserRow;
