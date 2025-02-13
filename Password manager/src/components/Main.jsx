import React, { useState, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import "./main.css";

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

  // Retriving the data from the server:-
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "mysecureapikey123",
      },
    });
    let passwords = await req.json();
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    setIsPasswordVisiable(!isPasswordVisiable);
  };

  const savePassword = async (data) => {
    if (data.id) {
      // Update existing password
      await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          site: data.site,
          username: data.username,
          password: data.password,
        }),
      });

      setpasswordArray(
        passwordArray.map((item) =>
          item._id === data.id
            ? {
                ...item,
                site: data.site,
                username: data.username,
                password: data.password,
              }
            : item
        )
      );
      toast.success("Password updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setIsEditing(false);
    } else {
      // Save New Password:-
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      await getPasswords(); // This ensures fresh data from the database which also perseve _id
      toast.success("Password saved!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }

    reset(); // Clear form fields after submission
    getPasswords(); // Refresh the data from the server
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  const editText = (id) => {
    setIsEditing(true);
    const passwordToEdit = passwordArray.find((item) => item._id === id);

    if (!passwordToEdit) {
      toast.error("Error: Password not found!");
      return;
    }
    // Populate the form fields with existing data:-
    setValue("site", passwordToEdit.site);
    setValue("username", passwordToEdit.username);
    setValue("password", passwordToEdit.password);
    setValue("id", passwordToEdit._id);
  };

  const deleteText = async (id) => {
    setpasswordArray(passwordArray.filter((item) => item._id !== id));

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id.toString() }),
    });

    toast.success("Password deleted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
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
            onSubmit={handleSubmit(savePassword)}
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
                              copyText(item.site);
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
                              copyText(item.username);
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
                              copyText(item.password);
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
                              editText(item._id);
                            }}
                            src="imgs/edit.svg"
                            className="cursor-pointer"
                            alt="edit"
                          />
                          <img
                            onClick={() => {
                              deleteText(item._id);
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
