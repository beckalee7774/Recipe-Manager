import LoginForm from "../features/user/LoginForm";
import Heading from "../ui/Heading";

function Login() {
  return (
    <div className="p-3">
      <Heading title="LOGIN" emoji="📝" />
      <LoginForm />
    </div>
  );
}

export default Login;
