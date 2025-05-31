import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { removeAllProducts } from "../redux/slices/cartSlice";
import Header from "./Header";

function Checkout() {
  const cart = useSelector((state) => state.cart.cart_items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total_price = cart.reduce((acc, item) => {
    return (acc += Math.round(
      item.price * (1 - item.discountPercentage / 100) * item.qty
    ));
  }, 0);

  const handleOrder = () => {
    const isConfirmed = confirm("Do you want place your order?");
    if (isConfirmed) {
      dispatch(removeAllProducts());
      navigate("/"); // navigate to home page!
      toast.success("Item ordered successfully!");
    } else {
      toast.error("Your order is not placed!");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center gap-2 p-1 md:px-10 xl:px-20">
        <table className="w-full mt-1 rounded table-fixed text-sm md:text-base shadow shadow-slate-500">
          <thead>
            <tr>
              <th className="p-1 text-center w-[60%]">Item</th>
              <th className="p-1 text-center w-[20%]">Qty</th>
              <th className="p-1 text-center w-[20%]">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="p-1 text-center">{item.title}</td>
                  <td className="p-1 text-center">{item.qty}</td>
                  <td className="p-1 text-center">
                    $
                    {item.qty *
                      Math.round(
                        item.price * (1 - item.discountPercentage / 100)
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-xl p-1 mt-2.5 self-start">
          <span className="mr-1 font-semibold">Total Price:</span>${total_price}
        </p>
        <div className="self-start flex flex-col md:flex-row items-center p-1">
          <h3 className="text-lg font-semibold">Shipping Information:-</h3>
          <p className="mx-1">{cart[0]?.shippingInformation}</p>
        </div>
        <button
          type="button"
          onClick={handleOrder}
          className="px-2.5 py-1 bg-amber-300 cursor-pointer rounded-full hover:outline hover:bg-amber-400"
        >
          Place Order
        </button>
      </div>
    </>
  );
}

export default Checkout;
