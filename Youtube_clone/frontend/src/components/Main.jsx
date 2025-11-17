import Chips from "./Chips.jsx";
import Content from "./Content.jsx";

function Main() {
  return (
    <>
      <div
        className={
          "xl:w-[calc(100%-270px)] lg:w-[calc(100%-100px)] w-full h-full flex flex-col"
        }
      >
        <Chips />
        <Content />
      </div>
    </>
  );
}

export default Main;
