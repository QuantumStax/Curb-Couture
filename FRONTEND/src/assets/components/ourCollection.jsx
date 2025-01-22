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
    <div className="px-20 py-10">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Our Collection</h1>
        <p className="text-gray-600 mt-2">
          The 2023 Collection is an answer to the real-world situation
        </p>
      </div>
      <div className="grid grid-cols-2">
        {collection.map((item, i) => (
          <div className="relative h-[20rem] m-2 cursor-pointer hover:scale-[1.02] transition-all duration-500" key={i}>
            <img
              src={item.img}
              alt={item.category}
              className="w-full h-full object-cover rounded-lg filter brightness-75"
            />
            <div className="absolute bottom-10 left-6 z-50">
              <h1 className="text-5xl font-bold text-primary">{item.category}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCollection;
