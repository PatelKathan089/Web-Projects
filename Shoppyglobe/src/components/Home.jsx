import ProductList from "./ProductList";
import Header from "./Header";

function Home() {
  return (
    <>
      <Header />
      <h1 className="text-center text-xl font-bold mt-5">
        Welcome to Shoppy Globe - Your One Stop Shop for Everything
      </h1>
      <ProductList />
    </>
  );
}

export default Home;
