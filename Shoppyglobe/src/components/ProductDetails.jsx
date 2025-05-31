import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import Star from "./Star";
import Header from "./Header";

function ProductDetails() {
  const [img_index, setImgIndex] = useState(0);
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:3000/products/${id}`
  );

  const mrp = data.price;
  const discounted_price = Math.round(
    mrp * (1 - data.discountPercentage / 100)
  );

  const handleChange = (e) => {
    setImgIndex(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="m-1.5 flex flex-col md:flex-row shadow shadow-stone-400 items-center md:items-start p-2.5 text-sm md:text-base gap-2.5 rounded-lg">
        <div className="w-[300px] md:w-max rounded bg-stone-50 shadow shadow-slate-500 md:shadow-slate-200 flex flex-col items-center gap-1.5">
          <div className="flex relative rounded w-full h-[250px] md:w-[250px] bg-stone-200">
            <img
              className="absolute w-full h-full"
              src={data.images && data.images[img_index]}
              alt=""
            />
            ;
          </div>
          <div className="flex items-center gap-1.5">
            {data.images?.map((_, index) => {
              return (
                <input
                  className="cursor-pointer"
                  onChange={handleChange}
                  value={index}
                  name="img"
                  key={index}
                  type="radio"
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full px-2">
          <h2 className="font-bold">{data.title}</h2>
          <p className="font-semibold">{data.brand}</p>
          <div className="flex items-center gap-0.5">
            <Star rating={data.rating} />
          </div>
          <div className="tags flex items-center gap-1">
            {data.tags?.map((tag) => {
              return (
                <div
                  key={data.tags.indexOf(tag)}
                  className="w-max h-max text-sm px-3 py-1 mt-1 flex items-center justify-center  rounded-full bg-stone-300"
                >
                  {tag}
                </div>
              );
            })}
          </div>
          <p>{data.description}</p>
          <div className="flex items-center gap-4">
            <p className="font-semibold">
              width:
              {data.dimensions && (
                <span className="font-normal ml-1">
                  {data.dimensions.width}cm
                </span>
              )}
            </p>
            <p className="font-semibold">
              height:
              {data.dimensions && (
                <span className="font-normal ml-1">
                  {data.dimensions.height}cm
                </span>
              )}
            </p>
            <p className="font-semibold">
              depth:
              {data.dimensions && (
                <span className="font-normal ml-1">
                  {data.dimensions.depth}cm
                </span>
              )}
            </p>
          </div>
          <p className="font-semibold text-green-600">
            inStock:
            <span className="ml-1 text-slate-700 font-normal">
              {data.stock}
            </span>
          </p>
          <p className="font-semibold">
            Warranty Period:
            <span className="font-normal text-base ml-0.5">
              {data.warrantyInformation}
            </span>
          </p>
          <p className="font-semibold">
            Price:
            <span className="font-normal ml-1">
              {discounted_price.toString()}
            </span>
          </p>
          <p className="text-sm font-medium">
            Mrp: <span className="text-slate-400 ml-1 line-through">{mrp}</span>
          </p>
        </div>
      </div>
      <div className="m-1.5 p-1 flex flex-col gap-1">
        <h1 className="text-lg font-bold">Customer Reviews:-</h1>
        {data.reviews?.map((review, index) => {
          return (
            <div
              key={index}
              className="rounded my-2 flex flex-col gap-1.5 shadow shadow-slate-400 p-2"
            >
              <h3 className="text-lg font-bold">{review.reviewerName}</h3>
              <p className="font-semibold">
                {review.date.slice(0, review.date.indexOf("T"))}
              </p>
              <div className="flex items-center gap-0.5">
                <Star rating={data.rating} />
              </div>
              <p>{review.comment}</p>
              <a
                className="text-blue-700 hover:underline hover:font-semibold"
                href={`mailto:${review.reviewerEmail}`}
              >
                {review.reviewerEmail}
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductDetails;
