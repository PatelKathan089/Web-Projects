import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { searched_items } from "../redux/slices/searchProductSlice";
import Spinner from "./Spinner";

function ProductList() {

  const { data, loading, error } = useFetch("http://localhost:3000/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  });

  const [products, setProducts] = useState([]); // Local state for all the product list:-
  const [search, setSearch] = useState(""); // Local state for search string:-
  const [toggleSearch, setToggleSearch] = useState(false);

  // Getting redux state and dispatch function for filttering my data:-
  const filteredData = useSelector((state) => {
    return state.search_product.filtered_products;
  });
  const dispatch = useDispatch();

  // Using side effect for setting my local products state on change of the fetched data by useFetch hook:-
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // seting search string:-
  const handleChange = (e) => {
    const search_str = e.target.value.trim().toLowerCase();
    setSearch(search_str);
    if (search_str === "") {
      setToggleSearch(false);
    }
  };

  // Search functionality:-
  const handleSearch = () => {
    setToggleSearch(true);
    dispatch(
      searched_items(
        products.filter((product) => {
          const matched =
            product.title?.trim().toLowerCase().includes(search) ||
            product.brand?.trim().toLowerCase().includes(search);
          return matched;
        })
      )
    );
  };

  // Returning jsx based on state of the fetched data:-
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
    return (
      <p className="text-center text-xl font-bold mt-10 text-red-600">
        Oops! Something went wrong.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center mt-10 gap-2.5 w-full px-4 md:px-16 lg:px-32 xl:px-64">
          <input
            onChange={handleChange}
            className="shadow shadow-slate-400 rounded px-2 py-1 w-full"
            type="search"
            name=""
            placeholder="Search products..."
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-slate-400 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-300 hover:outline-2"
          >
            Search
          </button>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center gap-2.5 lg:gap-6 xl:gap-10 mt-5 py-2.5 perspective-origin-center perspective-normal">
          {toggleSearch
            ? filteredData.map((data) => {
                return <ProductItem key={data._id} product={data} />;
              })
            : products.map((product) => {
                return <ProductItem key={product._id} product={product} />;
              })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
