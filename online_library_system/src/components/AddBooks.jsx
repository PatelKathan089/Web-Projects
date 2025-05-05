import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooks } from "../features/books/bookSlice";
import { mockBooks } from "../utils/mockBook";

function AddBooks() {
  const [book, setBook] = useState({}); // local state to hold book details
  const [error, setError] = useState(null); // local state to hold error messages

  const navigate = useNavigate(); // Get the navigate function from react-router
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleChange = (e) => {
    setBook({
      ...book,
      id: mockBooks.length + 1,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = () => {
    if (!book.title || !book.author || !book.genre || !book.description) {
      setError("Please fill in all fields"); // Set error message if any field is empty
    } else if (book.cover_img && !book.cover_img.startsWith("http")) {
      setError("Please enter a valid URL for the image"); // Set error message if URL is invalid
    } else {
      setError(null); // Clear error message if all fields are valid
      dispatch(addBooks(book)); // update redux state with the new book
      setBook({}); // Reset the book state after adding the book
      navigate("/browse-books"); // Navigate to the browse books page
    }
  };

  return (
    <>
      <h1 className="text-center font-bold text-xl mt-2.5">Add a New Book</h1>
      <p className="text-red-500 text-center font-semibold mt-1">
        {error !== null && error}
      </p>
      <form className="flex flex-col rounded border m-1 my-2.5 p-1 md:mx-20 lg:mx-70">
        <div className="flex flex-col gap-3">
          <div className="flex gap-1.5 items-center">
            <label className="font-semibold" htmlFor="title">
              Title:
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 bg-gray-300 p-1 rounded shadow shadow-gray-400"
              placeholder="Enter your book title"
              type="text"
              name="title"
            />
          </div>
          <div className="flex gap-1.5 items-center">
            <label className="font-semibold" htmlFor="author">
              Author:
            </label>
            <input
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full px-2 bg-gray-300 p-1 rounded shadow shadow-gray-400"
              type="text"
              name="author"
            />
          </div>
          <div className="flex gap-1.5 items-center">
            <label className="font-semibold" htmlFor="genre">
              Genre:
            </label>
            <input
              onChange={handleChange}
              placeholder="Enter genre of the book"
              className="w-full px-2 bg-gray-300 p-1 rounded shadow shadow-gray-400"
              type="text"
              name="genre"
            />
          </div>
          <div className="flex gap-1.5 items-center">
            <label className="font-semibold" htmlFor="description">
              Description:
            </label>
            <textarea
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-2 bg-gray-300 p-1 rounded shadow shadow-gray-400"
              name="description"
            ></textarea>
          </div>
          <div className="flex gap-1.5 items-center">
            <label className="font-semibold" htmlFor="image">
              Image URL:
            </label>
            <input
              onChange={handleChange}
              placeholder="Enter your book img url"
              className="w-full px-2 bg-gray-300 p-1 rounded shadow shadow-gray-400"
              type="url"
              name="cover_img"
            />
          </div>
        </div>
        <div className="self-center">
          <button
            className="bg-slate-400 px-2 py-1 rounded cursor-pointer mt-1.5 hover:outline"
            type="button"
            title="Add Book"
            onClick={handleAddBook}
          >
            Add Book
          </button>
        </div>
      </form>
    </>
  );
}

export default AddBooks;
