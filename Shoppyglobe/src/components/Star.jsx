import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function Star({ rating }) {
  const stars = [...Array(5)];
  const int_rating = Math.floor(rating);
  return (
    <>
      {stars.map((_, index) => {
        const filled = index < int_rating;
        return filled ? (
          <FaStar key={index} className="text-amber-500" />
        ) : (
          <FaRegStar key={index} className="text-amber-500" />
        );
      })}
    </>
  );
}

export default Star;
