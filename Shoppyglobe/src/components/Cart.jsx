import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";

function Cart() {
  const cart = useSelector((state) => state.cart.cart_items);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="flex flex-col gap-10 p-2">
        {cart.length > 0 ? (
          cart.map((item) => {
            return <CartItem key={item.id} cart_item={item} />;
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
