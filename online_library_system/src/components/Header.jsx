import React from "react";
import { NavLink } from "react-router";

function Header() {
  return (
    <>
      <header className="w-full h-[6vh] flex flex-col items-center justify-center bg-gray-300">
        <nav className="w-full p-0.5">
          <ul className="flex justify-center items-center gap-2.5 md:gap-8">
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "font-bold underline" : "";
                }}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "font-bold underline" : "";
                }}
                to="/browse-books"
              >
                Browse Books
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "font-bold underline" : "";
                }}
                to="/add-books"
              >
                Add Books
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
