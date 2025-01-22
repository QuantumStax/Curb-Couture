import Navbar from "../components/navbar";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
const Shop = () => {
  return (
    <section className="bg-primary">
      <Navbar />
      {/* Hero */}
      <div className="relative h-[30rem] bg-red-800" id="hero">
        <img
          src="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
          alt="hero-img"
          className="ml-20 pt-10"
        />
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] w-[20rem] p-5 text-primary font-extrabold font-fraunces">
          <h1 className="w-fit text-9xl">Shop</h1>
        </div>
      </div>
      {/* Actions menu */}
      <div className="flex items-end gap-5 px-20 py-10 h-[15rem]">
        <div className="relative rounded-xl bg-slate-950 text-primary py-2 px-6 w-[8rem] h-[3rem] cursor-pointer hover:shadow-lg">
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
        <div className="relative rounded-xl bg-slate-200 hover:bg-slate-950 hover:text-primary transition-all duration-500 py-2 px-6 w-[8rem] h-[3rem] cursor-pointer hover:shadow-lg">
          <div className="relative -left-3 top-0.5 opacity-75 hover:text-primary">
            <SortIcon
              // style={{
              //   color: "#000",
              // }}
            />
          </div>
          <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
            Sort
          </h1>
        </div>
        {/* back to home link */}
        <div className="flex items-center gap-1 text-lg ml-20">
            <a href="/" className="opacity-60 hover:opacity-100 cursor-default">Home</a>
            <p className="cursor-default">/</p>
            <a href="/" className="opacity-60 hover:opacity-100 cursor-default">Categories</a>
        </div>
      </div>
    </section>
  );
};

export default Shop;
