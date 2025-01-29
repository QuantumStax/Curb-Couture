import { Link } from "react-router-dom";
import Nav from "../components/nav2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Footer from "../components/footer";

const Login = () => {
  return (
    <section>
      <section>
        <Nav />
      </section>
      <section className="flex flex-col items-center bg-primary px-6 md:px-20 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 md:mb-16 text-center">
          Login
        </h1>
        <div className="w-full max-w-[30rem]">
          <form>
            <div>
              <label htmlFor="email" className="block text-sm md:text-base">
                Username
              </label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm md:text-base">
                Password
              </label>
              <div className="flex items-center mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  className="bg-transparent border border-slate-950 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="relative left-[-2rem] opacity-70 cursor-pointer hover:opacity-100">
                  <VisibilityIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
              <button className="bg-black text-primary text-base md:text-lg py-2 px-4 rounded-md w-full sm:w-auto">
                Login
              </button>
              <div className="mt-4 sm:mt-0 sm:ml-4 hover:text-primary hover:bg-black border border-slate-950 py-2 px-4 rounded-md w-full sm:w-auto text-center transition-all duration-500">
                <Link to="/register">
                  <p className="text-sm md:text-base">Create an Account</p>
                </Link>
              </div>
            </div>
            <div className="mt-6 text-center text-sm md:text-base">
              <Link
                to="/forgot-password"
                className="flex flex-col sm:flex-row items-center justify-center"
              >
                <p className="mr-1">Dont remember your password?</p>
                <p className="hover:text-blue-700 hover:underline">
                  Recover Password
                </p>
              </Link>
            </div>
          </form>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default Login;
