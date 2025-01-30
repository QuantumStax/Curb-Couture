/* eslint-disable react/prop-types */
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const SearchModal = ({ setIsModalOpen }) => {
  const [isResult, setIsResult] = useState(true);
  const resultItems = [
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      name: "Starry Night Oversized T-Shirt",
      price: "$876",
    },
  ];
  return (
    <section className="absolute top-0 flex flex-col items-center justify-center backdrop-brightness-50 backdrop-blur-sm backdrop-filter w-full h-[100vh]">
      <div
        className="relative left-[45rem] top-[-3rem] text-primary cursor-pointer"
        onClick={() => setIsModalOpen(false)}
      >
        <CloseIcon
          style={{
            fontSize: "2rem",
          }}
        />
      </div>
      <section className="bg-primary py-10 px-20 w-[80rem] h-[35rem]">
        <div className="w-full">
          <input
            type="search"
            name="search"
            className="w-[94%] h-[2.5rem] px-5 py-5 bg-transparent border-b border-b-black focus:outline-none text-xl"
            placeholder="Search"
          />
          <button
            className="relative left-[-2.4rem] opacity-70 hover:opacity-100 h-[3rem] w-[3rem]"
            onClick={() => setIsResult(false)}
          >
            <CloseIcon />
          </button>
        </div>
        {isResult ? (
          <div className="mt-10 grid grid-cols-2 overflow-y-auto gap-2">
            {resultItems.map((result, i) => (
              <div
                key={i}
                className="flex gap-5 items-start w-fit p-2 hover:shadow-lg cursor-pointer"
              >
                <img
                  src={result.img}
                  alt={result.name}
                  className="w-[8rem] h-[8rem] rounded-lg"
                />
                <div>
                  <h1 className="text-2xl font-semibold">{result.name}</h1>
                  <p className="text-xl">{result.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center relative top-[50%] translate-y-[-50%] opacity-50">
            <p>No Result!</p>
            <p>Search for an Item</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default SearchModal;
