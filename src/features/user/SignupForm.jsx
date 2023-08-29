import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/UserContext";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useSignup } from "./useSignup";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { isSigningUp, signup } = useSignup();
  const { isLoggedIn } = useCurrentUser();
  const navigate = useNavigate();
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
    }
    signup({ user: { username: username.toLowerCase(), password, name } });
  }
  return (
    <>
      <h2 className="text-sm mb-5">
        Enter a username and password to sign up!
      </h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormRow label="username">
          <input
            id="username"
            minLength={5}
            value={username}
            disabled={isSigningUp}
            className="lowercase"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormRow>
        <FormRow label="password">
          <input
            id="password"
            value={password}
            disabled={isSigningUp}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <FormRow label="name">
          <input
            id="name"
            value={name}
            disabled={isSigningUp}
            onChange={(e) => setName(e.target.value)}
          />
        </FormRow>
        <button
          disabled={isSigningUp}
          className="bg-orange-800 py-1 px-2 rounded-full uppercase font-semibold text-align text-orange-200 hover:bg-orange-700"
        >
          {isSigningUp ? <Spinner /> : "Sign up"}
        </button>
      </form>
    </>
  );
}

export default SignupForm;
