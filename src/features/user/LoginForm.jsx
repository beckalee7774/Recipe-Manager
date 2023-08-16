import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/UserContext";
import FormRow from "../../ui/FormRow";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refetch } = useLogin({
    userData: {
      username,
      password,
    },
  });

  const { isLoggedIn } = useCurrentUser();
  useEffect(
    function () {
      if (isLoggedIn) {
        navigate("/search");
      }
    },
    [navigate, isLoggedIn]
  );

  function handleSubmit(e) {
    e.preventDefault();
    refetch();
  }
  return (
    <>
      <h2 className="text-sm mb-5">Enter a username and password to login!</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormRow label="username">
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormRow>
        <FormRow label="password">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <button
          // disabled={isLoading}
          className="bg-orange-100 py-1 px-2 rounded-full uppercase font-semibold text-align"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
