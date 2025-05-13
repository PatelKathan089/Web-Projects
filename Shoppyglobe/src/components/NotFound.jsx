import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <div className="w-full h-[95vh] p-1 flex flex-col gap-10 items-center justify-center">
        <div className="w-[170px] h-[170px] flex flex-col justify-center items-center rounded-full border-[14px] border-gray-500">
          <div className="flex justify-center items-center gap-10">
            <div className="w-[25px] h-[25px] rounded-full bg-gray-500"></div>
            <div className="w-[25px] h-[25px] rounded-full bg-gray-500"></div>
          </div>
          <div className="relative top-3 w-[60px] h-[30px] border-[10px] border-b-0 border-gray-500 rounded-t-full"></div>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <h1 className="font-bold text-gray-500 text-5xl">404</h1>
          <p className="text-xl text-gray-400">Page not found!</p>
          <div>
            <p className="text-center text-gray-400">
              The page you are looking for doesn't exist or an another error
              occured.
            </p>
            <p className="text-center text-gray-400">
              Go back, to your
              <Link
                to="/"
                className="mx-1 text-blue-500 hover:underline hover:text-blue-700"
              >
                home
              </Link>
              page!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
