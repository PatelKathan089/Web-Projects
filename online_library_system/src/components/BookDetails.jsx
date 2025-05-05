import { useLocation } from "react-router";
import { Link } from "react-router";

function BookDetails() {
  const location = useLocation();
  const book = location.state;
  return (
    <>
      <h1 className="text-xl text-center font-bold mt-2">Book Details</h1>
      <div className="w-full flex justify-center items-center p-1">
        <div className="w-full md:w-[50%] lg:w-[30%] flex flex-col items-center mx-2.5 my-1.5 rounded shadow-lg shadow-slate-400">
          <div className="w-full h-[300px] md:h-[300px] lg:h-[380px]">
            <img
              className="w-full h-full rounded-tl rounded-tr"
              src={book.cover_img}
              alt={book.title}
            />
          </div>
          <div className="flex flex-col gap-2.5 self-start m-2.5">
            <h2>
              <span className="text-lg font-semibold">Title:</span>
              <span className="ml-1 text-lg">{book.title}</span>
            </h2>
            <p>
              <span className="text-lg font-semibold">Author:</span>
              <span className="ml-1 text-lg">{book.author}</span>
            </p>
            <p>
              <span className="text-lg font-semibold">Description:</span>
              <span className="ml-1 text-lg">{book.description}</span>
            </p>
            <p>
              <span className="text-lg font-semibold">Rating:</span>
              <span className="ml-1 text-lg">{book.rating}/5</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={"/browse-books"}
          className="my-1.5 py-1 px-2 bg-gray-400 rounded hover:bg-gray-300 hover:outline-2 hover:font-semibold"
        >
          Go to Book
        </Link>
      </div>
    </>
  );
}

export default BookDetails;
