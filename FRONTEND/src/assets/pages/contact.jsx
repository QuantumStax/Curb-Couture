import HeaderTopDeals from "../components/headerTopDeals";
import Hero from "../components/hero";
import Nav from "../components/nav2";
const Contact = () => {
  return (
    <section>
      <section>
        <HeaderTopDeals />
        <Nav />
        <Hero />
      </section>
      <section className="px-[20rem] w-full bg-tertiary py-24">
        <div className="mx-24 py-10 text-4xl">
          <h1>Get in Touch</h1>
        </div>
        <div className="mx-24 my-5">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-transparent border border-slate-950 w-[40rem] mt-6 p-2 h-[3rem]"
              placeholder="Name"
            />{" "}
            <br />
            <input
              type="email"
              name="email"
              id="email"
              className="bg-transparent border border-slate-950 w-[40rem] mt-6 p-2 h-[3rem]"
              placeholder="Email"
            />{" "}
            <br />
            <input
              type="text"
              name=""
              id=""
              className="bg-transparent border border-slate-950 w-[40rem] mt-6 p-2 h-[3rem]"
              placeholder="Phone Number"
            />
            <textarea name="message" id="message" placeholder="Message" rows={5} cols={80} className="bg-transparent py-3 px-2 border w-[40rem] border-slate-950 mt-5"></textarea>
            <br />
            <div className="w-[7rem] h-[3rem] bg-black text-primary py-2.5 px-8 mt-5 rounded-xl">
              <input type="submit" value="SEND" className="h-full w-full cursor-pointer" />
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Contact;
