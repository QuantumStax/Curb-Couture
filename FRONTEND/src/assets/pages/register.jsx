import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/nav2";

const Register = () => {
  return (
    <section>
      <section>
        <Nav />
      </section>
      <section className="flex flex-col items-center bg-primary px-20 py-24">
        <h1 className="text-4xl font-semibold mb-16">Create an Account</h1>
        <div>
          <form>
            <div className="mt-2">
              <label htmlFor="first-name">First Name</label>
              <br />
              <input
                type="text"
                name="first-name"
                placeholder="John"
                className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="last-name">Last Name</label>
              <br />
              <input
                type="text"
                name="last-name"
                placeholder="Doe"
                className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="johndoe123@gmail.com"
                className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="phone-number">Phone Number</label>
              <br />
              <input
                type="text"
                name="phone-number"
                placeholder="+91 1234567890"
                className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password">Create Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Make sure to use special characters (!, @, # ..)"
                className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-black text-primary text-lg py-2 px-4 rounded-md w-[10rem] mt-4"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="flex gap-2 text-lg mt-3 justify-center">
            <p>Already have an account?</p>
            <Link to="/my-account">
              <p className="hover:text-blue-700 hover:underline">Login</p>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default Register;
