import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";

// lazy loading components for performance optimization:-
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  // Function for checking authentication status:-
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  // Function for setting a route based on authentication status:-
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to={"/login"} />;
  };

  // Creating a router for the application:-
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<Home />} />,
    },
    {
      path: "/product/:id",
      element: (
        <ProtectedRoute
          element={
            <Suspense fallback={<Spinner />}>
              <ProductDetails />
            </Suspense>
          }
        />
      ),
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute
          element={
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          }
        />
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute
          element={
            <Suspense fallback={<Spinner />}>
              <Checkout />
            </Suspense>
          }
        />
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Spinner />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
