import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Header from "./components/Header";
import BookDetails from "./components/BookDetails";
import AddBooks from "./components/AddBooks";
import Error from "./components/Error";
import BrowseBooks from "./components/BrowseBooks";
import CategorizedBooks from "./components/CategorizedBooks";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-details" element={<BookDetails />} />
        <Route path="/add-books" element={<AddBooks />} />
        <Route path="/browse-books" element={<BrowseBooks />} />
        <Route path="/books/:category" element={<CategorizedBooks />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
