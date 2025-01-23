const ShopHero = () => {
  return (
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
  );
};

export default ShopHero;
