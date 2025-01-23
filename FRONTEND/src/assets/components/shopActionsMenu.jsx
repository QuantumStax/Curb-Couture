import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
const ShopActionsMenu = () => {
  return (
    <div className="flex items-end gap-5 px-20 py-10 h-[15rem]">
      {/* filter */}
      <div className="relative rounded-lg bg-slate-950 text-primary py-2 px-6 w-[10rem] h-[3rem] cursor-pointer hover:shadow-lg">
        <div className="relative -left-3 top-0.5 opacity-75">
          <FilterListIcon
            style={{
              color: "#FEFAF0",
            }}
          />
        </div>
        <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
          Filter
        </h1>
      </div>
      {/* sort */}
      <div className="relative rounded-lg bg-slate-200 hover:bg-slate-950 hover:text-primary transition-all duration-500 py-2 px-6 w-[10rem] h-[3rem] cursor-pointer hover:shadow-lg">
        <div className="relative -left-3 top-0.5 opacity-75 hover:text-primary">
          <SortIcon />
        </div>
        <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
          Sort
        </h1>
      </div>
      {/* back to home link */}
      <div className="flex items-center gap-1 ml-20">
        <a
          href="/"
          className="opacity-60 hover:opacity-100 hover:underline cursor-default"
        >
          Home
        </a>
        <p className="cursor-default">/</p>
        <a
          href="/"
          className="opacity-60 hover:opacity-100 hover:underline cursor-default"
        >
          Categories
        </a>
      </div>
    </div>
  );
};

export default ShopActionsMenu;
