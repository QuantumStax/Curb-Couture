import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom"

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-secondary_2 text-primary">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 xl:gap-44 items-baseline">
        {/* Newsletter Section */}
        <div className="w-full md:max-w-[25rem]">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-fraunces">
              Curb Coture
            </h1>
            <p className="w-full py-2 text-sm md:text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              asperiores iste sit suscipit magnam voluptate est tempore deleniti
              quas totam.
            </p>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl">
              Email <span className="text-red-600">*</span>
            </h1>
            <div>
              <input
                type="email"
                className="w-full max-w-[25rem] h-8 md:h-[2rem] text-base md:text-lg my-3 bg-transparent border-b-2 border-gray-50 focus:outline-none"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="confirm"
                id="confirm"
                className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200"
              />
              <label
                htmlFor="confirm"
                className="opacity-60 ml-2 cursor-pointer text-sm md:text-base"
              >
                Yes, Subscribe me to your newsletter
              </label>
            </div>
            <div>
              <button className="border-2 border-gray-50 p-2 w-[7rem] hover:bg-gray-50 hover:text-black transition-all duration-500 mt-3 uppercase text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Sections */}
        <div className="w-full grid grid-cols-2 md:flex md:gap-16 lg:gap-24 xl:gap-44 mt-8 md:mt-0">
          {/* Customer Service */}
          <div className="mb-6 md:mb-0">
            <h1 className="uppercase font-bold text-lg md:text-xl">
              Customer service
            </h1>
            <div className="mt-3 md:mt-5 space-y-2">
              <div className="hover:underline">
                <Link to="/contact" className="text-sm md:text-base">
                  Contact Us
                </Link>
              </div>
              <div className="hover:underline">
                <Link to="/faq" className="text-sm md:text-base">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h1 className="uppercase font-bold text-lg md:text-xl">Company</h1>
            <div className="mt-3 md:mt-5 space-y-2">
              <div className="hover:underline">
                <Link to="/about-us" className="text-sm md:text-base">
                  About Us
                </Link>
              </div>
              <div className="hover:underline">
                <Link to="/privacy-policy" className="text-sm md:text-base">
                  Privacy Policy
                </Link>
              </div>
              <div className="hover:underline">
                <Link to="/t-n-c" className="text-sm md:text-base">
                  Terms and Conditions
                </Link>
              </div>
              <div className="hover:underline">
                <Link to="/advertise" className="text-sm md:text-base">
                  Advertise your Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-row md:flex-col gap-5 mt-8 md:mt-0 w-full justify-center md:justify-start md:w-auto">
          <InstagramIcon className="!text-3xl md:!text-4xl cursor-pointer" />
          <FacebookIcon className="!text-3xl md:!text-4xl cursor-pointer" />
          <LinkedInIcon className="!text-3xl md:!text-4xl cursor-pointer" />
          <XIcon className="!text-3xl md:!text-4xl cursor-pointer" />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 md:mt-10 opacity-50 text-sm md:text-base">
        © {year}, Curb Coture.
      </div>
    </div>
  );
};

export default Footer;
