import SignupForm from "../features/user/SignupForm";
import Heading from "../ui/Heading";

function Signup() {
  return (
    <div className="p-3">
      <Heading title="SIGN UP" emoji="🔖" />
      <SignupForm />
    </div>
  );
}

export default Signup;
