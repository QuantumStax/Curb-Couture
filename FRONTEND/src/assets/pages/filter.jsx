/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useRef } from "react";
import { gsap } from "gsap";

const Filter = ({ toggleFilter }) => {
  const filterItems = [
    { head: "price" },
    {
      head: "color",
      colors: [
        {
          name: "Black",
          value: "#000",
        },
        {
          name: "Grey",
          value: "#808080",
        },
        {
          name: "Red",
          value: "#FF0000",
        },
        {
          name: "Green",
          value: "#008000",
        },
        {
          name: "Blue",
          value: "#0000FF",
        },
      ],
    },
    {
      head: "size",
      value: ["s", "m", "l", "xl", "xxxl"],
    },
    {
      head: "material",
      value: ["cottom", "rayon", "polyster", "satin"],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      gsap.to(contentRefs.current[index], {
        height: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      setOpenIndex(null);
    } else {
      if (openIndex !== null) {
        gsap.to(contentRefs.current[openIndex], {
          height: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      gsap.set(contentRefs.current[index], { height: "10rem" });
      const fullHeight = contentRefs.current[index].scrollHeight;
      gsap.fromTo(
        contentRefs.current[index],
        { height: 0 },
        { height: fullHeight, duration: 0.3, ease: "power2.out" }
      );
      setOpenIndex(index);
    }
  };

  return (
    <aside className="fixed top-0 left-0 lg:w-[25rem] md:w-[25rem] w-[20rem] h-[100vh] p-6 bg-secondary_2 text-primary_2">
      <div
        className="flex items-center justify-between"
        onClick={() => toggleFilter()}
      >
        <h1 className="text-3xl uppercase font-semibold opacity-70">Filter</h1>
        <CloseIcon
          style={{
            fontSize: "2rem",
          }}
          className="cursor-pointer"
        />
      </div>
      <hr className="opacity-50 mt-3" />
      {/* Accordion Section */}
      <div className="relative mt-10">
        {filterItems.map((item, index) => (
          <div key={index}>
            {/* Accordion Header */}
            <div
              className="flex items-center justify-between my-6 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="uppercase text-2xl">{item.head}</h2>
              <ExpandMoreIcon
                style={{
                  fontSize: "2rem",
                  transform:
                    openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
            {/* Accordion Content */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden h-0 bg-transparent"
            >
              {item.head === "price" && (
                <div>
                  <label htmlFor="from">Minimum</label>
                  <br />
                  <input
                    type="number"
                    name="min"
                    id="minimum"
                    className="mt-2 p-2 bg-primary text-slate-950 w-[20rem] rounded-md"
                    placeholder="0"
                  />{" "}
                  <br />
                  <label htmlFor="from">Maximum</label>
                  <br />
                  <input
                    type="number"
                    name="min"
                    id="minimum"
                    className="mt-2 p-2 bg-primary text-slate-950 w-[20rem] rounded-md"
                    placeholder="1000"
                  />
                </div>
              )}
              {item.head === "color" && (
                <div className="flex gap-8 flex-wrap mt-10">
                  {item.colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div
                        className="w-7 h-7 rounded-full border-2"
                        style={{
                          backgroundColor: color.value,
                        }}
                      ></div>
                      <li className="list-none">{color.name}</li>
                    </div>
                  ))}
                </div>
              )}
              {item.head === "size" && (
                <div className="flex items-center gap-8 flex-wrap">
                  {item.value.map((val, i) => (
                    <div
                      key={i}
                      className="border py-2 px-5 border-gray-400 cursor-pointer hover:bg-white hover:text-secondary_2 rounded-md"
                    >
                      <li className="list-none uppercase text-lg">{val}</li>
                    </div>
                  ))}
                </div>
              )}
              {item.head === "material" && (
                <div className="flex items-center gap-8 flex-wrap">
                  {item.value.map((material, i) => (
                    <div
                      key={i}
                      className="border py-2 px-5 border-gray-400 cursor-pointer hover:bg-white hover:text-secondary_2 rounded-md"
                    >
                      <li className="list-none uppercase text-lg">
                        {material}
                      </li>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="fixed bottom-5 flex items-center gap-5">
          <button className="uppercase bg-primary text-black py-2 px-6 font-semibold rounded-md w-[10rem]">
            Apply
          </button>
          <button className="uppercase rounded-md border py-2 px-4">
            Clear Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Filter;
