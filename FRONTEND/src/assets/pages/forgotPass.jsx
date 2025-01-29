import Footer from "../components/footer";
import Nav from "../components/nav2";

const ForgorPass = () => {
  return (
    <section>
      <section>
        <Nav />
      </section>
      <section className="flex flex-col items-center bg-primary px-20 md:pb-[19.5rem] py-24">
        <h1 className="text-4xl font-semibold mb-12">Recover Password</h1>
        <div>
          <form>
            <label htmlFor="reg-mail">Enter your Registered mail id</label>
            <br />
            <input
              type="email"
              name="reg-mail"
              id="reg-mail"
              placeholder="johndoe@gmail.com"
              className="bg-transparent border border-slate-950 lg:w-[25rem] md:w-[30rem] w-[22rem] sm:w-[20rem] px-3 py-2 mt-3"
            />
          </form>
          <div className="mt-2">
            <p>Lost your password? Please enter your email address.</p>
            <p>You will receive a link to create a new password via email.</p>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default ForgorPass;
