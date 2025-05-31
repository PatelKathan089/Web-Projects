import Star from "./Star";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

function CartItem({ cart_item, reFetch }) {
  const dispatch = useDispatch();
  const mrp = cart_item.price;
  const discounted_price = Math.round(
    mrp * (1 - cart_item.discountPercentage / 100)
  );

  const handleRemove = () => {
    if (cart_item.qty === 1) {
      let res = fetch("http://localhost:3000/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: cart_item._id,
          sign: "-",
        }),
      });
      res.then((res) => {
        if (res.ok) {
          reFetch(); // Re-fetch the cart items after deletion
        }
      });
      toast.error("Item removed from your cart!");
    }
    dispatch(decreaseQty(cart_item._id)); // use item.id if item is your prop
    let res = fetch("http://localhost:3000/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: cart_item._id,
        sign: "-",
      }),
    });
    res.then((res) => {
      if (res.ok) {
        reFetch(); // Re-fetch the cart items after decreasing quantity
      }
    });
  };

  const handleAdd = () => {
    dispatch(increaseQty(cart_item._id));
    let res = fetch("http://localhost:3000/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: cart_item._id,
        sign: "+",
      }),
    });
    res.then((res) => {
      if (res.ok) {
        reFetch(); // Re-fetch the cart items after increasing quantity
      }
    });
  };

  return (
    <>
      <div className="w-full md:h-[300px] p-2.5 flex gap-5 rounded shadow shadow-slate-600">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] bg-stone-100 rounded shadow shadow-stone-300">
            <img className="w-full h-full" src={cart_item.thumbnail} alt="" />
          </div>
          <div className="w-full md:w-[80%]">
            <div className="w-full flex justify-between h-[25px] rounded-full bg-amber-200">
              <button
                type="button"
                onClick={handleRemove}
                className="bg-amber-500 rounded-l-full px-2.5 cursor-pointer hover:bg-amber-600"
              >
                -
              </button>
              <span>{cart_item.qty}</span>
              <button
                type="button"
                onClick={handleAdd}
                className="bg-amber-500 rounded-r-full px-2.5 cursor-pointer hover:bg-amber-600"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="text-[11px] md:text-base flex flex-col py-1 pl-2 gap-2">
          <h2 className="font-bold">{cart_item.title}</h2>
          <p className="font-semibold">{cart_item.brand}</p>
          <p className="text-[8px] md:text-sm">{cart_item.description}</p>
          <div className="flex items-center gap-1">
            {<Star rating={cart_item.rating} />}
          </div>
          <div className="tags flex items-center gap-1">
            {cart_item.tags.map((tag) => {
              return (
                <div
                  key={cart_item.tags.indexOf(tag)}
                  className="w-max h-max text-[8px] md:text-sm px-3 py-1 mt-1 flex items-center justify-center text-sm rounded-full bg-slate-200"
                >
                  {tag}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] md:text-sm font-semibold text-green-600">
            inStock:
            <span className="text-[10px] md:text-sm ml-1 font-normal text-black">
              {cart_item.stock}
            </span>
          </p>
          <p className="font-semibold">{cart_item.warrantyInformation}</p>
          <p>
            Price:
            <span className="font-semibold ml-0.5">
              ${discounted_price * cart_item.qty}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default CartItem;
