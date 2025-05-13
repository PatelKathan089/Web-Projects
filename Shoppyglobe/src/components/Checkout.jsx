import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Checkout() {
  const cart = useSelector((state) => state.cart.cart_items);
  const total_price = cart.reduce((acc, item) => {
    return (acc += Math.round(
      item.price * (1 - item.discountPercentage / 100) * item.qty
    ));
  }, 0);

  return (
    <div className="w-full flex flex-col items-center gap-2 p-1 md:px-10 xl:px-20">
      <table className="w-full mt-1 table-fixed text-sm md:text-base shadow shadow-slate-500">
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
      <p className="text-xl p-1 mt-2.5">
        <span className="mr-1 font-semibold">Total Price:</span>${total_price}
      </p>
      <button
        type="button"
        onClick={() => {
          toast.success("Item ordered successfully!");
        }}
        className="px-2.5 py-1 bg-amber-300 cursor-pointer rounded-full hover:outline hover:bg-amber-400"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
