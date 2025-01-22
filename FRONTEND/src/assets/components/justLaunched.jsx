// const JustLaunced = () => {
//   return (
//     <div className="relative py-10 mx-20 px-10 bg-red-600 h-[30rem] rounded-lg">
//       <div className="uppercase font-fraunces text-5xl text-primary flex flex-col items-center translate-y-[10rem] translate-x-[5rem]">
//         Just Launched
//       </div>
//       <img
//         src="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
//         alt="just_launched"
//         className="absolute"
//       />
//     </div>
//   );
// };

// export default JustLaunced;

const ShirtsBanner = () => {
  return (
    <div className="relative py-10 mx-20 rounded-lg h-[25rem]">
      {/* Red Background Section */}
      <div className="h-full flex items-center bg-[#d82a20] p-8 rounded-lg overflow-hidden relative">
        {/* Shirt Image */}
        <img
          src="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
          alt="Shirt"
          className="w-1/2 max-w-md object-cover rounded-lg translate-y-[5rem]"
        />

        {/* Text Section */}
        <div className="ml-48 text-center">
          <h1 className="text-white font-bold text-6xl">
            Just Launched
          </h1>
          <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-semibold px-6 py-3 rounded-lg shadow-lg">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtsBanner;
