import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.repeatPassword) {
      return;
    } else {
      const { name, email, password } = data;
      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-[#89f7fe] to-[#c2e9fb] flex justify-center items-center">
        <div className="w-[90%] h-[55%] lg:h-[65%] md:w-[60%] md:px-10 lg:w-[40%] bg-slate-100 shadow shadow-gray-600 p-2.5 rounded flex flex-col gap-2.5">
          <div className="md:my-2">
            <h1 className="uppercase text-lg font-semibold text-center md:text-xl">
              Create Account
            </h1>
          </div>
          <div className="md:my-2.5">
            <form
              className="flex flex-col gap-2.5 md:gap-6"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Your Email"
                {...register("email", { required: true })}
              />
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Repeat Your Password"
                {...register("repeatPassword", { required: true })}
              />
              <input
                className="w-full mt-2 px-2 py-1 bg-gradient-to-r from-sky-300 to-teal-300 rounded uppercase text-white font-bold cursor-pointer"
                type="submit"
                value="Sign Up"
              />
            </form>
          </div>
          <div className="text-sm self-center mt-2">
            <span className="">Have already an account?</span>
            <Link to="/login" className="underline font-medium mx-1">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
