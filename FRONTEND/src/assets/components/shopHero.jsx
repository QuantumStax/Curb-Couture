/* eslint-disable react/prop-types */
const ShopHero = ({ image, heading }) => {
  return (
    <div className="relative h-[30rem] bg-red-800" id="hero">
      <img src={image} alt="hero-img" className="lg:ml-20 pt-10" />
      <div className="absolute top-[50%] left-[50%] lg:translate-x-[0] md:translate-x-0 translate-x-[-50%] translate-y-[-50%] lg:w-[40rem] w-fit p-5 text-primary font-extrabold font-itim">
        <h1 className="w-fit lg:text-9xl text-7xl uppercase">{heading}</h1>
      </div>
    </div>
  );
};

export default ShopHero;
