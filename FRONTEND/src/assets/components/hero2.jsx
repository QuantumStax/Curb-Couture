import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const HeroSlider = () => {
  return (
    <div className="relative top-[-4rem] w-full h-[100vh] overflow-hidden bg-secondary_2">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
        src="/videos/3163534-uhd_3840_2160_30fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/video-poster.jpg"
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Social Links */}
      <div
        aria-label="social"
        className="flex flex-col items-center justify-end gap-20 absolute right-10 top-24 h-[80vh] w-[5%] py-12 text-primary_2"
      >
        <a href="#" className="-rotate-90 w-fit nav-hover-social">
          Instagram
        </a>
        <a href="#" className="-rotate-90 w-fit nav-hover-social">
          Twitter
        </a>
        <a href="#" className="-rotate-90 w-fit nav-hover-social">
          Facebook
        </a>
      </div>

      {/* Hero Title & CTA */}
      <div className="absolute left-[4%] top-[15vh] z-20 text-primary_2 w-[10%]">
        <h1 className="uppercase text-9xl w-full special-font font-zentry font-black">
          gr<b>a</b>phic print c<b>o</b>llecti<b>o</b>n
        </h1>
        <button className="absolute top-[35%] left-[18rem] rounded-full bg-primary_2 text-secondary_light p-8 hover:bg-banner_2 hover:text-primary_2 transition-colors duration-200">
          <ArrowOutwardIcon />
        </button>
      </div>

      {/* Product Images */}
      <div className="relative left-[50%] top-[40%] flex items-end gap-5">
        <img
          src="/images/hero/one_piece_anime_oversized_tshirt.webp"
          alt="One Piece Anime Oversized T-Shirt"
          className="w-[15%] object-cover rounded-lg"
          loading="lazy"
        />
        <img
          src="/images/hero/obito_anime_oversized_tshirt.webp"
          alt="Obito Anime Oversized T-Shirt"
          className="w-[20%] h-[25rem] object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Bottom Description & Explore Button */}
      <div className="absolute left-[4%] bottom-20 text-primary_2 text-4xl w-[35%] font-circular-web">
        <h2 className="opacity-75">
          Rare Zero introducing our latest Graphic Print Collection
        </h2>
        <button className="relative top-[1rem] left-[0%] w-fit flex items-center rounded-full px-4 py-2 bg-banner_2 text-primary_2 transition-colors duration-200">
          <span className="text-2xl font-semibold">Explore</span>
          <ArrowOutwardIcon />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
