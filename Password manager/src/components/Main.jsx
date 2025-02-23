import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
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

      <div className="mainbar w-full h-full">
        <div className="head flex flex-col items-center justify-center pt-3">
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
                })}
                placeholder="Enter Website URL"
                className="w-full p-1 rounded-full pl-4 border border-green-400 outline-2 outline-green-600"
              />
              {errors.site && (
                <p className="text-red-500 mx-3">{errors.site.message}</p>
              )}
            </div>
            <div className="user flex flex-col gap-4 w-[80%] md:flex-row md:gap-2">
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

              <div className="relative pass-box md:w-[40%] lg:w-[25%] w-full">
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
                  className="p-1 w-full rounded-full pl-4 border border-green-400 outline-2 outline-green-600"
                />
                <span onClick={showPassword}>
                  <img
                    src={
                      isPasswordVisiable
                        ? "src/assets/imgs/closeeye.svg"
                        : "src/assets/imgs/eye.svg"
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
                  src={
                    isEditing
                      ? "src/assets/imgs/update.svg"
                      : "src/assets/imgs/save_btn.svg"
                  }
                  alt="save_ico"
                  className="invert"
                />
                <span>{isEditing ? "Update" : "Save"}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="password_window flex flex-col justify-center items-center w-full p-3">
          <h2 className="font-bold text-center lg:text-start text-lg w-[80%]">
            Your Passwords
          </h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords to show</div>
          ) : (
            <>
              {/* Table layout on larger screens:- */}
              <div className="hidden lg:block w-[80%] rounded-md overflow-auto mt-1">
                <table className="table-fixed w-full  ">
                  <thead className="bg-green-700 text-white font-bold">
                    <tr>
                      <th className="py-1 w-[35%]">Site</th>
                      <th className="py-1 w-[35%]">Username</th>
                      <th className="py-1 w-[20%]">Password</th>
                      <th className="py-1 w-[10%]">Actions</th>
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
                                src="src/assets/imgs/copy.svg"
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
                                src="src/assets/imgs/copy.svg"
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
                                src="src/assets/imgs/copy.svg"
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
                                src="src/assets/imgs/edit.svg"
                                className="cursor-pointer"
                                alt="edit"
                              />
                              <img
                                onClick={() => {
                                  deletePassword(
                                    item._id,
                                    setpasswordArray,
                                    toast
                                  );
                                }}
                                src="src/assets/imgs/delete.svg"
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
              </div>

              {/* Card layout for smaller screens:- */}
              <div className="lg:hidden sm:flex-row flex-wrap w-full flex flex-col gap-2">
                {passwordArray.map((item) => {
                  return (
                    <div
                      key={item._id}
                      style={{
                        backgroundImage:
                          "linear-gradient(0deg,#1c3e35,#99f2d1)",
                      }}
                      className="card sm:w-[49%] text-sm shadow rounded p-2 border border-blue-200"
                    >
                      <div className="site flex gap-1">
                        <p>
                          <strong>Site: </strong>
                          <a href={item.site}>{item.site}</a>
                        </p>
                        <img
                          src="src/assets/imgs/copy.svg"
                          onClick={() => {
                            copyText(item.site, toast);
                          }}
                          className="cursor-pointer"
                          alt="copy"
                        />
                      </div>
                      <div className="username flex gap-1">
                        <p>
                          <strong>Username: </strong>
                          <span>{item.username}</span>
                        </p>
                        <img
                          src="src/assets/imgs/copy.svg"
                          onClick={() => {
                            copyText(item.username, toast);
                          }}
                          className="cursor-pointer"
                          alt="copy"
                        />
                      </div>
                      <div className="password flex gap-1">
                        <p>
                          <strong>Password: </strong>
                          <span>{"*".repeat(item.password.length)}</span>
                        </p>
                        <img
                          src="src/assets/imgs/copy.svg"
                          onClick={() => {
                            copyText(item.password, toast);
                          }}
                          className="cursor-pointer"
                          alt="copy"
                        />
                      </div>
                      <div className="buttons flex gap-2 mt-2">
                        <button
                          onClick={() => {
                            editPassword(
                              item._id,
                              passwordArray,
                              setIsEditing,
                              setValue,
                              toast
                            );
                          }}
                          className="py-1 px-3 bg-blue-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deletePassword(item._id, setpasswordArray, toast);
                          }}
                          className="py-1 px-3 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
