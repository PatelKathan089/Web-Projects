import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profilePicture", selectedImage); // optional image upload

    try {
      if (data.password === data.repeatPassword) {
        let res = await fetch("http://localhost:3000/register", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          toast.success("User Registered Successfully.");
          navigate("/login");
        }
      }
    } catch (err) {
      console.log("Failed to register an user", err);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-[#89f7fe] to-[#c2e9fb] flex justify-center items-center">
        <div className="w-[90%] h-[60%] lg:h-[70%] md:w-[65%] md:px-10 lg:w-[40%] bg-slate-100 shadow shadow-gray-600 p-2.5 rounded flex flex-col gap-2.5">
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
                {...register("name", {
                  required: {
                    value: true,
                    message: "Your name field is empty!",
                  },
                })}
              />
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Your Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Your email field is empty!",
                  },
                })}
              />
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Your password field is empty!",
                  },
                })}
              />
              <input
                className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
                type="text"
                placeholder="Repeat Your Password"
                {...register("repeatPassword", {
                  required: {
                    value: true,
                    message: "Your repeat password field is empty!",
                  },
                })}
              />
              <div className="flex gap-1.5 items-center">
                <label htmlFor="profilePicture">Upload Image:</label>
                <div className="relative inline-block">
                  <button className="px-2 py-1 rounded-lg border-dashed border">
                    Upload Profile Image
                  </button>
                  <input
                    {...register("profilePicture")}
                    className="absolute top-1 -left-10 opacity-0 cursor-pointer"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                  {selectedImage && (
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedImage.name}
                    </span>
                  )}
                </div>
              </div>

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
}

export default Register;
