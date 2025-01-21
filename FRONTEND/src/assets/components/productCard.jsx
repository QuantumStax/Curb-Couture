/* eslint-disable react/prop-types */
// import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
const ProductCard = ({
  offer,
  badge,
  imgSrc,
  brand,
  title,
  price,
  discount,
  rating,
}) => {
  return (
    <div className="relative mx-2 px-2 py-3 w-[21rem]">
      <div>
        <img
          src={imgSrc}
          alt={title}
          className="w-[20rem] h-[20rem] rounded-md object-center shadow-md"
        />
        <div className="absolute top-3 left-3 w-[5rem] font-semibold flex items-center justify-center rounded-md bg-red-500 text-primary py-0.5">
          <p>{offer}</p>
        </div>
        <div className="absolute top-12 left-3 bg-blue-600 w-[5rem] py-0.5 flex items-center justify-center uppercase font-bold text-primary rounded-md">
          <p>{badge}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="opacity-65 uppercase">{brand}</p>
        <p className="text-xl">{title}</p>
        <div className="flex gap-3 items-center">
          <p className="text-lg font-semibold">{price}</p>
          <span className="line-through opacity-60">{discount}</span>
        </div>
        <div>
          <p className="">
            {rating}
            <span>
              <StarOutlinedIcon
                style={{
                  fontSize: "1.3rem",
                  transform: "translateY(-0.1rem)",
                  color: "#FFD700"
                }}
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
