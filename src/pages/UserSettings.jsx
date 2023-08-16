import UserOptions from "../features/user/UserOptions";
import Heading from "../ui/Heading";

function UserSettings() {
  return (
    <>
      <Heading title="User Settings" emoji="⚙︎" />
      <UserOptions />
    </>
  );
}

export default UserSettings;
