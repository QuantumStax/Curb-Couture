const ShirtsBanner = () => {
  return (
    <div className="relative py-10 sm:py-12 px-6 sm:px-12 md:mx-10 lg:mx-20 rounded-lg h-[22rem] sm:h-[26rem] md:h-[30rem] overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div
        className="h-full flex flex-col sm:flex-row items-center justify-between bg-cover bg-center rounded-lg relative p-6 sm:p-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.4)), url('/images/backgrounds/fashion-bg.jpg')",
        }}
      >
        {/* Shirt Image */}
        <img
          src="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
          alt="Shirt"
          className="max-w-[50%] sm:max-w-[40%] md:max-w-[35%] lg:max-w-[30%] drop-shadow-lg transform scale-110 sm:scale-125 md:scale-150"
        />

        {/* Text Section */}
        <div className="text-center sm:text-left text-primary z-10">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl">
            Just Launched
          </h1>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl opacity-90">
            Explore the new collection now!
          </p>
          <button className="mt-6 bg-banner_2 hover:bg-secondary_2 hover:text-primary_2 text-secondary_2 text-lg sm:text-xl font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtsBanner;
