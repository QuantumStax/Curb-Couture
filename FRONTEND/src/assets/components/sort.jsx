const Sort = () => {
  const sortMenuItems = [
    "Rating",
    "Best Sellers",
    "Price - Low to High",
    "Price - High to Low",
    "Date - New to Old",
    "Date - Old to New",
  ];

  return (
    <section>
      <div className="bg-secondary_2 rounded-md p-3 text-primary_2">
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
