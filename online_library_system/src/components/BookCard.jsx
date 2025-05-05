import { Link } from "react-router";

function BookCard({ book }) {

  return (
    <div className="card w-[70%] md:w-[25%] lg:w-[20%] xl:w-[15%] flex flex-col items-center mt-2.5 rounded shadow shadow-slate-500">
      <h2 className="text-center font-semibold">{book.title}</h2>
      <div className="w-full h-[250px] md:h-[200px]">
        <img
          className="w-full h-full rounded-tl rounded-tr"
          src={book.cover_img}
          alt={book.title}
        />
      </div>
      <Link
        to="/book-details"
        state={book}
        className="my-1.5 text-center py-1 px-2 bg-gray-400 rounded hover:bg-gray-300 hover:outline-2 hover:font-semibold"
      >
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
