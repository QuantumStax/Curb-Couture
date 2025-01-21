/* eslint-disable react/prop-types */
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";

const Cupon = ({
  message = "Super discount for your first purchase",
  code = "free15first",
}) => {
  return (
    <section
      className="flex items-center justify-center bg-cupon-bg text-2xl py-4"
      aria-labelledby="cupon-heading"
    >
      <div className="mr-1" aria-label="Discount Icon">
        <DiscountOutlinedIcon />
      </div>
      <p id="cupon-heading" className="mr-2">
        {message}
      </p>
      <div className="bg-slate-50 mr-2 px-3 py-1 border-2 border-dashed border-gray-400 uppercase">
        <code>{code}</code>
      </div>
      <p className="text-base">Use discount code at checkout!</p>
    </section>
  );
};

export default Cupon;
