import { useSelector } from "react-redux";
import CartItem from "./CartItem";

function Cart() {
  const cart = useSelector((state) => state.cart.cart_items);
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
    </>
  );
}

export default Cart;
