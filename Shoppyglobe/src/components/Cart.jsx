import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import Header from "./Header";

function Cart() {
  // State to hold cart items:-
  const [cart, setCart] = useState([]);

  // Fetch cart items from the server:-
  const { data, reFetch } = useFetch("http://localhost:3000/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-10 p-2">
        {cart.length > 0 ? (
          cart.map((item) => {
            return (
              <CartItem key={item._id} cart_item={item} reFetch={reFetch} />
            );
          })
        ) : (
          <h1 className="text-center text-2xl font-bold mt-2.5">
            No Item added to the cart
          </h1>
        )}
      </div>
      <div
        className={
          cart.length > 0
            ? "w-full flex items-center justify-center p-1 my-1"
            : "hidden"
        }
      >
        <button
          type="button"
          title="Go to checkout"
          onClick={handleCheckout}
          className="px-2 py-1 bg-amber-300 cursor-pointer hover:outline hover:bg-amber-400 rounded-full"
        >
          Checkout your orders
        </button>
      </div>
    </>
  );
}

export default Cart;
