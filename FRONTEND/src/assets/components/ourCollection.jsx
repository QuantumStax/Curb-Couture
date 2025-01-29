const OurCollection = () => {
  const collection = [
    {
      img: "/images/collection/retro/retro-shirt-225762.webp",
      category: "Retro",
      items: 32,
    },
    {
      img: "/images/collection/oversized/egyptian-oversized-t-shirt-302886.webp",
      category: "Oversized",
      items: 22,
    },
    {
      img: "images/collection/doodle/doodles-shirt-559986.webp",
      category: "Doodles",
      items: 15,
    },
    {
      img: "images/collection/specials/starry-night-385896.webp",
      category: "Specials",
      items: 10,
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Our Collection
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
          The 2023 Collection is an answer to the real-world situation
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {collection.map((item, i) => (
          <div
            className="relative h-[15rem] sm:h-[20rem] m-2 cursor-pointer hover:scale-[1.02] transition-all duration-500"
            key={i}
          >
            <img
              src={item.img}
              alt={item.category}
              className="w-full h-full object-cover rounded-lg filter brightness-75"
            />
            <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 z-50">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                {item.category}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCollection;
