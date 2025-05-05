import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { mockBooks } from "../utils/mockBook";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

function CategorizedBooks() {
  const { category } = useParams(); // Get the category from the URL parameters
  const [books, setBooks] = useState([]); // local state to hold books
  const user_books = useSelector((state) => state.books.items); // Get books from Redux store

  useEffect(() => {
    setBooks([...user_books, ...mockBooks]); // Combine user books and mock books
  }, []);

  const filteredBooks = books.filter((book) => {
    return book.genre
      .trim()
      .toLowerCase()
      .includes(category.trim().toLowerCase());
  });

  return (
    <>
      <h1 className="text-center font-bold text-xl mt-1">{category}</h1>
      <div className="cardContainer flex flex-col flex-wrap md:flex-row md:justify-center gap-2.5 md:gap-8 items-center mt-1.5">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })
        ) : (
          <h3>Sorry no books available!</h3>
        )}
      </div>
    </>
  );
}

export default CategorizedBooks;
