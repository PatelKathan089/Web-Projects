import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const logged_data = await res.json();
    if (res.status === 200) {
      localStorage.setItem("token", logged_data.token);
      navigate("/");
    } else {
      console.error("Login failed:", logged_data.message);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-[#89f7fe] to-[#c2e9fb] flex justify-center items-center">
        <div className="w-[90%] h-[45%] lg:h-[50%] md:w-[60%] md:px-10 lg:w-[40%] bg-slate-100 shadow shadow-gray-600 p-2.5 rounded flex flex-col gap-2.5">
          <div className="md:my-2">
            <h1 className="uppercase my-2.5 text-lg font-semibold text-center md:text-xl">
              Login to your account
            </h1>
          </div>
          <div className="md:my-4">
            <form
              className="flex flex-col gap-4 md:gap-6"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("email", { required: true })}
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Your Email"
              />
              <input
                {...register("password", { required: true })}
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Password"
              />
              <input
                className="w-full mt-2 px-2 py-1 bg-gradient-to-r from-sky-300 to-teal-300 rounded uppercase text-white font-bold cursor-pointer"
                type="submit"
                value="Sign In"
              />
            </form>
          </div>
          <div className="text-sm self-center mt-2">
            <span className="">Don't have an account?</span>
            <Link to="/register" className="underline font-medium mx-1">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
