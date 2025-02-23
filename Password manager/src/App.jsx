import "./App.css";
import Header from "./components/header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="window w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App;
