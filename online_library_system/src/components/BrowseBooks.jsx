import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { mockBooks } from "../utils/mockBook";
import { useState } from "react";
import { useSelector } from "react-redux";

function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(""); // local state to hold search input
  const [category, setCategory] = useState(""); // local state to hold selected category
  const user_books = useSelector((state) => state.books.items);

  useEffect(() => {
    setBooks([...user_books, ...mockBooks]);
  }, []);

  const handleChange = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearch(searchValue);
  };

  const handleSelect = (e) => {
    const selectedCategory = e.target.value.trim().toLowerCase();
    setCategory(selectedCategory);
  };

  const filteredBooks = books.filter((book) => {
    const matchedSearch =
      search === "" ||
      book.title.trim().toLowerCase().includes(search) ||
      book.author.trim().toLowerCase().includes(search);

    const matchedCategory =
      category === "" || book.genre.trim().toLowerCase().includes(category);

    return matchedSearch && matchedCategory;
  });

  console.log(filteredBooks);

  return (
    <>
      <h1 className="text-center text-xl font-bold mt-1.5">
        Browse Books based on category or author/title
      </h1>
      <div className="flex flex-col-reverse lg:flex-row xl:mx-42 items-center gap-2 mt-4 p-1">
        <div className="w-full md:w-[80%] lg:w-[40%] flex items-center justify-center md:justify-normal md:px-2 gap-2.5 p-1 lg:mx-2">
          <h4 className="font-medium">Select Category:</h4>
          <select
            onChange={handleSelect}
            title="select the category of books"
            name="genre"
            className="cursor-pointer bg-slate-300 rounded py-1 px-2 shadow shadow-gray-400 hover:bg-slate-200"
          >
            <option value="">Select genre of the books</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>
        <div className="w-full md:w-[80%] lg:w-[60%] flex items-center justify-center gap-2.5 lg:mx-2">
          <div className="w-full flex items-center gap-2 p-0.5">
            <input
              onChange={handleChange}
              type="search"
              placeholder="Search by author or title"
              className="border py-0.5 px-2 w-full rounded"
            />
          </div>
        </div>
      </div>
      <div className="cardContainer flex flex-col flex-wrap md:flex-row md:justify-center gap-2.5 md:gap-8 items-center mt-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })
        ) : (
          <h3>Sorry your searched books are not available!</h3>
        )}
      </div>
    </>
  );
}

export default BrowseBooks;
