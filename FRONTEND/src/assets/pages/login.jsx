import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import Footer from "../components/footer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(null);
    setMessage("");
    setShowMessage(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.user) {
        setAuthState({
          isAuthenticated: true,
          isAdmin: response.data.user.role === "admin",
          user: response.data.user,
        });

        navigate(
          response.data.user.role === "admin"
            ? "/admin"
            : `/home/${formData.email}`
        );

        setIsError(false);
        setMessage("Login Successful ✅");
      }
    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Invalid email or password. Try again."
      );
    } finally {
      setShowMessage(true);
      setLoading(false);
    }
  };

  return (
    <section>
      <section className="flex flex-col items-center bg-primary px-6 md:px-20 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 md:mb-16 text-center">
          Login
        </h1>
        <div className="w-full max-w-[30rem]">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm md:text-base">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>
            <div className="relative mt-4">
              <label htmlFor="password" className="block text-sm md:text-base">
                Password
              </label>
              <input
                id="password"
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
              <div
                onClick={toggleVisibility}
                className="absolute top-[2.5rem] right-0 flex items-center pr-3 opacity-70 cursor-pointer hover:opacity-100"
              >
                {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>

            {showMessage && (
              <div className="text-center my-5">
                <p className={isError ? "text-red-500" : "text-green-500"}>
                  {message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
              <button
                className="bg-black text-primary text-base md:text-lg py-2 px-4 rounded-md w-full disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="mt-4 sm:mt-0 sm:ml-4 hover:text-primary hover:bg-black border border-slate-950 py-2 px-4 rounded-md w-full text-center transition-all duration-500">
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
                <p className="mr-1">Forgot your password?</p>
                <p className="hover:text-blue-700 hover:underline">
                  Recover Password
                </p>
              </Link>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
