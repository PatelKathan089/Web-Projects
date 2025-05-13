import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";
// lazy loading components for performance optimization:-
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./components/Cart"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product-details/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Spinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
