function Spinner() {
  return (
    <>
      <div className="w-[100vw] h-[95vh] flex items-center justify-center">
        <div className="w-25 h-25 rounded-full border-[15px] border-t[10px] border-t-amber-200 border-amber-600 animate-spin"></div>
      </div>
    </>
  );
}

export default Spinner;