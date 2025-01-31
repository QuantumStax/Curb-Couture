/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/nav2";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsError(false);
      setMessage("User Registered.");
      setShowMessage(true);
    } catch (error) {
      setIsError(true);
      setMessage("An error occurred!");
      setShowMessage(true);
    }
  }

  return (
    <section>
      <section>
        <Nav />
      </section>
      <section className="flex flex-col items-center bg-primary px-6 md:px-20 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 md:mb-16 text-center">
          Create an Account
        </h1>
        <div className="w-full max-w-[30rem]">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="firstname" className="block text-sm md:text-base">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="John"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="lastname" className="block text-sm md:text-base">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Doe"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="johndoe123@gmail.com"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm md:text-base"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+91 1234567890"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="dob" className="block text-sm md:text-base">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm md:text-base">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Make sure to use special characters (!, @, # ..)"
                className="bg-transparent border border-slate-950 w-full px-3 py-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
            </div>
            {showMessage && (
              <div className="text-center my-5">
                {isError ? (
                  <p>Error Registering user⚠️</p>
                ) : (
                  <p>User Registered✅</p>
                )}
              </div>
            )}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-black text-primary text-base md:text-lg py-2 px-4 rounded-md w-full"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="flex flex-col sm:flex-row gap-2 text-sm md:text-base mt-6 justify-center items-center">
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
