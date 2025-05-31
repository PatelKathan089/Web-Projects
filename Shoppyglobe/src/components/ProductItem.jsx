import Star from "./Star";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ProductItem({ product }) {
  const mrp = product.price;
  const discounted_price = Math.round(
    mrp * (1 - product.discountPercentage / 100)
  );

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart_items);
  const dispatch = useDispatch();

  const handleClick = (e, id) => {
    // This will exclude the button part when I clicked on card for product-details!
    if (e.target.closest("button")) {
      return;
    }
    navigate(`/product/${id}`);
  };

  const handleAddCart = (product) => {
    const e_product = cart.find((item) => {
      return item._id === product._id;
    });
    if (e_product) {
      toast.info(`Item is already in the cart!`);
    } else {
      dispatch(addToCart(product));
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      });
      toast.success(`Item added to your cart`);
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          handleClick(e, product._id);
        }}
        className="flex flex-col gap-1.5 w-[80%] md:w-[30%] xl:w-[20%] rounded shadow shadow-slate-600 hover:translate-z-1 hover:translate-0.5 hover:shadow-amber-600 transition-all duration-500 hover:"
      >
        <div className="w-full h-[200px] bg-stone-100 rounded">
          <img className="w-full h-full" src={product.thumbnail} alt="" />
        </div>
        <div className="flex flex-col gap-1 p-1 ml-2">
          <h2 className="font-medium">{product.title}</h2>
          <p>{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star rating={product.rating} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600">
              -{product.discountPercentage} %
            </span>
            <span className="text-lg">${discounted_price}</span>
          </div>
          <div className="text-sm flex items-center gap-1">
            <span>MRP:</span>
            <span className="line-through">{mrp}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            handleAddCart(product);
          }}
          className="self-center px-2 py-1 mb-2.5 rounded-full bg-amber-400 hover:cursor-pointer hover:outline-2 outline-amber-600 hover:bg-amber-300"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}

export default ProductItem;
