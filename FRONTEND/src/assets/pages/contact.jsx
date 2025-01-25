import HeaderTopDeals from "../components/headerTopDeals";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Nav from "../components/nav2";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <section>
      <section>
        <HeaderTopDeals />
        <Nav />
        <Hero />
      </section>
      <section className="flex bg-primary py-36">
        <div className="px-[10rem] w-full">
          <div className="mx-24 text-4xl">
            <h1 className="font-semibold">Get in Touch</h1>
          </div>
          <div className="mx-24 my-5">
            <form>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-transparent border border-slate-950 w-[40rem] mt-6 p-2 h-[3rem] font-itim"
                placeholder="Name"
              />
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className="bg-transparent border border-slate-950 w-[40rem] mt-6 p-2 h-[3rem] font-itim"
                placeholder="Email"
              />
              <br />
              <input
                type="text"
                name="number"
                id="number"
                className="bg-transparent border border-slate-950 w-[40rem] mt-6 p-2 h-[3rem] font-itim"
                placeholder="Phone Number"
              />
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                rows={5}
                cols={80}
                className="bg-transparent py-3 px-2 border w-[40rem] border-slate-950 mt-5 font-itim"
              />
              <br />
              <div className="w-[7rem] h-[3rem] bg-black hover:bg-gray-800 transition-all duration-300 text-primary py-2.5 px-8 mt-5 rounded-xl cursor-pointer">
                <input
                  type="submit"
                  value="SEND"
                  className="h-full w-full cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="relative top-[5rem] w-[25rem] left-[-20rem]">
          <Link className="flex ml-24 w-full mb-10 items-center gap-4">
            <WhatsAppIcon
              style={{
                fontSize: "3rem",
                color: "#25D366",
              }}
            />
            <p className="hover:underline text-lg">Message us on whatsapp</p>
          </Link>
          <Link className="flex ml-24 w-full items-center gap-4">
            <LocalPhoneIcon
              style={{
                fontSize: "3rem",
                color: "#000",
              }}
            />
            <p className="hover:underline text-lg">+91 8956746301</p>
          </Link>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default Contact;
