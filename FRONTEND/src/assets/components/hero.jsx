const Hero = () => {
  return (
    <div className="relative flex items-center justify-center h-[40rem] w-full">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('/images/hero/burgess-milner-OYYE4g-I5ZQ-unsplash.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "brightness(40%)",
        }}
      ></div>

      <div className="relative text-secondary">
        <h1
          className="text-hero-head  font-fraunces"
          style={{
            lineHeight: 1.1,
          }}
        >
          Curb Coture
        </h1>
        <p className="text-3xl text-center">Redesigning Modern Elegance</p>
        <div className="flex flex-col justify-center rounded-3xl text-center w-[10rem] h-[3rem] translate-x-[25rem] mt-10 bg-primary text-text-main text-lg hover:bg-secondary transition-all duration-500 cursor-pointer font-semibold">
          <h3>Explore</h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
