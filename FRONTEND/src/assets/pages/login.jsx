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
              <div className="relative top-2 left-8 hover:text-primary hover:bg-black border border-slate-950 py-2 px-6 rounded-md w-[13rem] transition-all duration-500">
                <Link to="/register">
                  <p className="text-lg">Create an Account</p>
                </Link>
              </div>
            </div>
            <div className="relative top-6 text-center text-lg">
              <Link
                to="/forgot-password"
                className="flex items-center"
              >
                <p className="mr-2">Dont remember your password? </p>
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
