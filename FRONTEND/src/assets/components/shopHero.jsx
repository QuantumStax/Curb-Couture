/* eslint-disable react/prop-types */

const ShopHero = ({ image }) => {
  return (
    <div className="relative top-[-4rem]">
      <img src={image} alt="" className="h-auto w-[100vw] object-cover" />
    </div>
  );
};

export default ShopHero;
