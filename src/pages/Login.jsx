import LoginForm from "../features/user/LoginForm";
import Heading from "../ui/Heading";

function Login() {
  return (
    <div className="p-3 relative">
      <Heading title="LOGIN" emoji="📝" />
      <LoginForm />
      <div className="absolute left-0 bottom-[-80px]">
        <span>
          login with username: beckalee7774 password: passwordtest to test out
          the application if you do not want to sign up
        </span>
      </div>
    </div>
  );
}

export default Login;
