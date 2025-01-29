const ShirtsBanner = () => {
  return (
    <div className="relative py-8 sm:py-10 px-4 sm:px-10 md:mx-10 lg:mx-20 rounded-lg h-[20rem] sm:h-[22rem] md:h-[25rem] overflow-hidden">
      {/* Red Background Section */}
      <div className="h-full flex items-center justify-center bg-[#d82a20] p-6 sm:p-8 md:p-10 rounded-lg relative">
        {/* Shirt Image */}
        <img
          src="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
          alt="Shirt"
          className="absolute inset-0 w-full h-full object-contain lg:left-[-25rem] rounded-lg opacity-100 z-[10]"
        />

        {/* Text Section */}
        <div className="text-center text-white z-50">
          <h1 className="font-bold text-5xl sm:text-4xl md:text-5xl lg:text-6xl text-primary">
            Just Launched
          </h1>
          <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black text-sm sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtsBanner;
