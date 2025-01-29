/* eslint-disable react/prop-types */
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";

const Cupon = ({
  message = "Super discount for your first purchase",
  code = "free15first",
}) => {
  return (
    <section
      className="flex flex-col sm:flex-row items-center justify-center bg-cupon-bg text-lg sm:text-xl md:text-2xl py-3 sm:py-4 px-4 text-center"
      aria-labelledby="cupon-heading"
    >
      <div className="mr-1 mb-2 sm:mb-0" aria-label="Discount Icon">
        <DiscountOutlinedIcon className="text-lg sm:text-xl md:text-2xl" />
      </div>
      <p id="cupon-heading" className="mr-2 text-sm sm:text-base md:text-lg">
        {message}
      </p>
      <div className="bg-slate-50 mr-2 px-3 py-1 border-2 border-dashed border-gray-400 uppercase text-sm sm:text-base md:text-lg">
        <code>{code}</code>
      </div>
      <p className="text-xs sm:text-sm md:text-base">Use discount code at checkout!</p>
    </section>
  );
};

export default Cupon;
