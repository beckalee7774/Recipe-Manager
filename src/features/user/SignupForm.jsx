import FormRow from "../../ui/FormRow";

function SignupForm() {
  return (
    <>
      <h2 className="text-sm mb-5">
        Enter a username and password to sign up!
      </h2>
      <form className="flex flex-col gap-2">
        <FormRow label="username">
          <input id="username" />
        </FormRow>
        <FormRow label="password">
          <input id="password" />
        </FormRow>
        <button className="bg-orange-100 py-1 px-2 rounded-full uppercase font-semibold text-align">
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
