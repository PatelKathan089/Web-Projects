import { NavLink, useNavigate } from "react-router";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";

function Header() {
  const cart_items = useSelector((state) => {
    return state.cart.cart_items;
  });

  const navigate = useNavigate();

  return (
    <>
      <header className="h-[5vh] flex items-center justify-between md:justify-center md:gap-20 lg:gap-40 px-5 py-1 bg-slate-300">
        <nav>
          <ul className="flex items-center gap-2 md:gap-4 lg:gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? "font-bold underline" : "";
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/product/1`}
                className={({ isActive }) => {
                  return isActive ? "font-bold underline" : "";
                }}
              >
                Product-Details
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => {
            navigate("/cart");
          }}
          title="Shopping Cart"
          className="relative cursor-pointer"
        >
          <TiShoppingCart className="text-blue-500 text-2xl hover:text-blue-700" />
          {cart_items.length > 0 && (
            <span className="flex items-center justify-center bg-amber-300 text-sm w-[10px] h-[10px] absolute rounded-[50%] bottom-0 right-0 translate-x-0.5">
              {cart_items.length}
            </span>
          )}
        </button>
      </header>
    </>
  );
}

export default Header;
