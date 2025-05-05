import { Link } from "react-router";
function Error() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2.5">
        <h1 className="text-red-500 my-10 text-5xl">404 Page Not Found!</h1>
        <Link
          className="text-2xl text-blue-500 hover:underline hover:font-bold hover:text-blue-600"
          to={"/"}
        >
          Go to Home Page!
        </Link>
      </div>
    </>
  );
}

export default Error;
