import React, { useState, useEffect, createContext } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import "./main.css";

// Import All Password Services:-
import {
  getPasswords,
  savePassword,
  deletePassword,
  editPassword,
  copyText,
} from "../services/passService";

function Main() {
  const [passwordArray, setpasswordArray] = useState([]);
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch all the passwords from the database:-
  useEffect(() => {
    getPasswords(setpasswordArray);
  }, []);

  const showPassword = () => {
    setIsPasswordVisiable(!isPasswordVisiable);
  };

  return (
    <>
      <ToastContainer />

      <div className="mainbar w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>
        <div className="head flex flex-col items-center justify-center mt-8">
          <div className="logo font-bold text-2xl">
            <span className="text-green-600">&lt;</span>
            <span>Pass</span>
            <span className="text-green-600">OP/&gt;</span>
          </div>
          <div className="title">
            <h2>Your own Password Manager</h2>
          </div>
        </div>
        <div className="editWindow mt-4">
          <form
            onSubmit={handleSubmit((data) =>
              savePassword(data, setpasswordArray, setIsEditing, reset, toast)
            )}
            className="p-3 flex flex-col items-center justify-center gap-4"
          >
            <div className="url w-[80%]">
              <input
                {...register("site", {
                  required: {
                    value: true,
                    message: "Website URL is required!",
                  },
                  pattern: {
                    value: /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}\/+$/,
                    message: "Plz enter valid URL!",
                  },
                })}
                placeholder="Enter Website URL"
                className="w-full p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600"
              />
              {errors.site && (
                <p className="text-red-500 mx-3">{errors.site.message}</p>
              )}
            </div>
            <div className="user flex gap-2 w-[80%]">
              <div className="userName w-full">
                <input
                  {...register("username", {
                    required: { value: true, message: "Username is required!" },
                    minLength: {
                      value: 6,
                      message: "Username must be at least 6 characters long!",
                    },
                  })}
                  type="text"
                  placeholder="Enter Username"
                  className="w-full p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600"
                />
                {errors.username && (
                  <p className="text-red-500 mx-3">{errors.username.message}</p>
                )}
              </div>

              <div className="relative pass-box">
                <input
                  {...register("password", {
                    required: { value: true, message: "Password is required!" },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long!",
                    },
                  })}
                  type={isPasswordVisiable ? "text" : "password"}
                  placeholder="Enter Password"
                  className="p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600"
                />
                <span onClick={showPassword}>
                  <img
                    src={
                      isPasswordVisiable ? "imgs/closeeye.svg" : "imgs/eye.svg"
                    }
                    className="absolute right-[8px] bottom-[8px] cursor-pointer"
                    alt="view"
                  />
                </span>
                {errors.password && (
                  <p className="text-red-500 mx-3">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="submit">
              <button
                type="submit"
                className="flex items-center gap-1 bg-green-400 p-2 px-4 rounded-full hover:bg-green-500"
              >
                <img
                  src="imgs/save_btn.svg"
                  alt="save_ico"
                  className="invert"
                />
                <span>{isEditing ? "Update" : "Save"}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="password_window flex flex-col justify-center items-center p-3">
          <h2 className="font-bold text-lg w-[80%]">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords to show</div>
          ) : (
            <table className="table-auto w-[80%] rounded-md overflow-hidden mt-1">
              <thead className="bg-green-700 text-white font-bold">
                <tr>
                  <th className="py-1">Site</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Password</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="py-1 text-center border-b-2 w-[50%]">
                        <div className="flex justify-center items-center gap-1">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            src="imgs/copy.svg"
                            onClick={() => {
                              copyText(item.site, toast);
                            }}
                            className="cursor-pointer"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-1 text-center border-b-2 w-[10%]">
                        <div className="flex justify-center items-center gap-1">
                          <span>{item.username}</span>
                          <img
                            src="imgs/copy.svg"
                            onClick={() => {
                              copyText(item.username, toast);
                            }}
                            className="cursor-pointer"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-1 text-center border-b-2 w-[10%]">
                        <div className="flex justify-center items-center gap-1">
                          <span>{"*".repeat(item.password.length)}</span>
                          <img
                            src="imgs/copy.svg"
                            onClick={() => {
                              copyText(item.password, toast);
                            }}
                            className="cursor-pointer"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-1 text-center border-b-2 w-[10%]">
                        <div className="flex justify-center items-center gap-2">
                          <img
                            onClick={() => {
                              editPassword(
                                item._id,
                                passwordArray,
                                setIsEditing,
                                setValue,
                                toast
                              );
                            }}
                            src="imgs/edit.svg"
                            className="cursor-pointer"
                            alt="edit"
                          />
                          <img
                            onClick={() => {
                              deletePassword(item._id, setpasswordArray, toast);
                            }}
                            src="imgs/delete.svg"
                            className="cursor-pointer"
                            alt="delete"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
