import CategoryIcon from "@mui/icons-material/Category";
const OurCollection = () => {
  const collection = [
    {
      img: "/images/categories/manfinity_homme_khaki_normal_tshirt.webp",
      category: "Classics",
      items: 32,
    },
    {
      img: "/images/categories/new_york_green_font_tshirt.webp",
      category: "Oversized",
      items: 22,
    },
    {
      img: "/images/categories/oversized_batik_anime_tshirt.webp",
      category: "Custom Prints",
      items: 15,
    },
    {
      img: "/images/categories/oversized_hoodie_type_greatly_sweater.webp",
      category: "Hoodies",
      items: 10,
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-4xl">
            Our Collection
          </h1>
          <div className="relative top-1">
            <CategoryIcon style={{
              fontSize: "2rem"
            }}/>
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
          The 2025 Collection is an answer to the real-world Fashion
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1">
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
