import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="px-20 py-10">
      <div className="flex gap-44 items-baseline">
        <div>
          <div className="w-[25rem]">
            <h1 className="text-5xl font-fraunces">Curb Coture</h1>
            <p className="w-full py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              asperiores iste sit suscipit magnam voluptate est tempore deleniti
              quas totam.
            </p>
          </div>
          <div>
            <h1 className="text-2xl">
              Email <span className="text-red-600">*</span>
            </h1>
            <div>
              <input
                type="email"
                className="w-[25rem] h-[2rem] text-lg my-3 bg-transparent border-b-2 border-slate-950 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="confirm"
                id="confirm"
                className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200"
              />
              <label htmlFor="confirm" className="opacity-60 ml-2 cursor-pointer">
                Yes, Subscribe me to your newsletter
              </label>
            </div>
            <div>
              <button className="border-2 border-slate-950 p-2 w-[7rem] hover:bg-slate-950 hover:text-primary transition-all duration-500 mt-3 uppercase">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="uppercase font-bold">Customer service</h1>
          <div className="mt-5 leading-loose">
            <li className="list-none hover:underline">
              <a href="/contactus">Contact Us</a>
            </li>
            <li className="list-none hover:underline">
              <a href="/contactus">FAQ</a>
            </li>
          </div>
        </div>
        <div>
          <h1 className="uppercase font-bold">Company</h1>
          <div className="mt-5 leading-loose">
            <li className="list-none hover:underline">
              <a href="/contactus">About Us</a>
            </li>
            <li className="list-none hover:underline">
              <a href="/contactus">Privacy Policy</a>
            </li>
            <li className="list-none hover:underline">
              <a href="/contactus">Terms and Conditions</a>
            </li>
            <li className="list-none hover:underline">
              <a href="/contactus">Advertise your Product</a>
            </li>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <InstagramIcon
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          />
          <FacebookIcon
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          />
          <LinkedInIcon
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          />
          <XIcon
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div className="relative w-fit bottom-0 left-[50%] translate-x-[-50%] opacity-50">© {year}, Curb Coture.</div>
    </div>
  );
};

export default Footer;
