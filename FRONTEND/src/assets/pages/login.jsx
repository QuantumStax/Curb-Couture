import { Link } from "react-router-dom";
import HeaderTopDeals from "../components/headerTopDeals";
import HeroSlider from "../components/hero2";
import Nav from "../components/nav2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ForgorPass from "./forgotPass";
import Footer from "../components/footer";
const Login = () => {
  return (
    <section>
      <section>
        <HeaderTopDeals />
        <Nav />
        <HeroSlider />
      </section>
      <section className="flex flex-col items-center bg-primary px-20 py-24">
        <h1 className="text-4xl font-semibold mb-16">Login</h1>
        <div>
          <form>
            <div>
              <label htmlFor="email">Username</label>
              <br />
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="passwprd">Password</label>
              <br />
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="bg-transparent border border-slate-950 w-[25rem] px-3 py-2 mt-3"
                />
                <div className="relative left-[-2rem] top-1 opacity-70 cursor-pointer hover:opacity-100">
                  <VisibilityIcon />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-black text-primary text-lg py-2 px-4 rounded-md w-[10rem] mt-4">
                Login
              </button>
              <div className="relative top-2 left-10 hover:text-primary hover:bg-black border border-slate-950 py-2 px-6 rounded-md w-[12rem] transition-all duration-500">
                <Link to="/forgot-password">
                  <p className="text-lg">Forgot Password</p>
                </Link>
              </div>
            </div>
            <div className="relative top-6 text-center text-lg">
              <Link
                to="/register"
                className="relative left-7 flex items-center"
              >
                <p className="mr-2">Dont have an Account? </p>
                <p className="hover:text-blue-700 hover:underline">
                  Create an Account
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
