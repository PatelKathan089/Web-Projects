import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { mockBooks } from "../utils/mockBook";
import { useSelector } from "react-redux";

const Home = () => {
  const [books, setBooks] = useState([]);
  const redux_books = useSelector((state)=>state.books.items);

  useEffect(() => {
    setBooks([...mockBooks, ...redux_books]);
  }, []);

  return (
    <>
      <h1 className="font-bold text-center text-sm md:text-xl mt-1">
        Welcome to the Library Management System.
      </h1>
      <div className="cardContainer flex flex-col flex-wrap md:flex-row md:justify-center gap-2.5 md:gap-8 items-center mt-1.5">
        {books.length > 0 ? (
          books.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })
        ) : (
          <h3>Sorry no books available!</h3>
        )}
      </div>
    </>
  );
};

export default Home;
