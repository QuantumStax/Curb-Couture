import Footer from "../components/footer";
import Hero from "../components/hero";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TelegramIcon from '@mui/icons-material/Telegram';
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <main>
      <header>
        <Hero />
      </header>

      {/* Contact Form Section */}
      <section className="flex flex-col lg:flex-row bg-primary py-36 px-8 lg:px-36 bg-secondary_2">
        {/* Left Section: Contact Form */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-semibold mb-6 text-primary_2">
            Get in Touch
          </h1>
          <form className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full lg:w-[40rem] bg-transparent border border-primary_2 rounded-md p-2 text-lg font-robert-regular text-primary_2"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full lg:w-[40rem] bg-transparent border border-primary_2 rounded-md p-2 text-lg font-robert-regular text-primary_2"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="number"
                id="number"
                className="w-full lg:w-[40rem] bg-transparent border border-primary_2 rounded-md p-2 text-lg font-robert-regular text-primary_2"
                placeholder="Your Phone Number"
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                id="message"
                rows="5"
                className="w-full lg:w-[40rem] bg-transparent border border-primary_2 rounded-md p-2 text-lg font-robert-regular text-primary_2"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary_2 text-primary hover:bg-banner_2 hover:text-primary_2 transition-all duration-300 py-2 px-6 rounded-lg flex items-center gap-2"
            >
              <span>SEND</span>
              <span><TelegramIcon/></span>
            </button>
          </form>
        </div>

        {/* Right Section: Contact Information */}
        <aside className="mt-12 lg:mt-0 lg:ml-12 w-full lg:w-1/3 space-y-8 text-primary_2">
          <div className="flex items-center gap-4">
            <WhatsAppIcon
              fontSize="large"
              className="text-[#25D366]"
              aria-label="WhatsApp Icon"
            />
            <Link
              to="#"
              className="text-lg hover:underline"
              aria-label="Message us on WhatsApp"
            >
              Message us on WhatsApp
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <LocalPhoneIcon
              fontSize="large"
              className="text-primary_2"
              aria-label="Phone Icon"
            />
            <p className="text-lg">+91 8956746301</p>
          </div>
        </aside>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Contact;
