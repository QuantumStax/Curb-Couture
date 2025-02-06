const Sort = () => {
  const sortMenuItems = [
    "Top Deals",
    "Best Sellers",
    "Price - Low to High",
    "Price - High to Low",
    "Date - New to Old",
    "Date - Old to New",
  ];

  return (
    <section>
      <div className="bg-white rounded-md p-3 text-brand">
        {sortMenuItems.map((item, i) => (
          <div key={i} className="mt-2">
            <li className="list-none text-lg leading-loose cursor-pointer hover:underline">
              {item}
            </li>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sort;
