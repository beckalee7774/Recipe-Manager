import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/UserContext";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isRefetching2, setIsRefetching2] = useState(false);
  const { isRefetching, refetch } = useLogin({
    userData: {
      username: username.toLowerCase(),
      password,
    },
    setIsRefetching2,
  });
  useEffect(
    function () {
      setIsRefetching2(isRefetching);
    },
    [isRefetching]
  );
  const { isLoggedIn } = useCurrentUser();
  useEffect(
    function () {
      if (isLoggedIn) {
        navigate("/home");
      }
    },
    [navigate, isLoggedIn]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Enter both username and password");
    } else {
      refetch();
      setIsRefetching2(true);
    }
  }
  return (
    <>
      <h2 className="text-sm mb-5">Enter a username and password to login!</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormRow label="username">
          <input
            id="username"
            value={username}
            disabled={isRefetching2}
            onChange={(e) => setUsername(e.target.value)}
            className="lowercase"
          />
        </FormRow>
        <FormRow label="password">
          <input
            id="password"
            type="password"
            value={password}
            disabled={isRefetching2}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <button
          disabled={isRefetching2}
          className="bg-orange-800 py-1 px-2 rounded-full uppercase font-semibold text-align text-orange-200 hover:bg-orange-700"
        >
          {isRefetching2 ? <Spinner /> : "Login"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
