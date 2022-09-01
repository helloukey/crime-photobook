import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

// assets
import fingerprint from "../assets/fingerprint.svg";
import errorIcon from "../assets/error.svg";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("crime");
  const navigate = useNavigate();

  const { firebaseSignup, error, pending, user } = useSignup();

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password && accountType) {
      firebaseSignup(email, password, accountType);
    }
  };

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  },[user, navigate])

  return (
    <div className=" bg-gray-900 text-gray-50 py-12 sm:py-16 md:py-24 lg:pt-24 lg:pb-36">
      <div className="text-left mx-auto max-w-screen-xl pb-12 px-4 items-center gap-16 lg:flex md:px-8">
        <form className="lg:w-2/4" onSubmit={handleRegister}>
          <h3 className="text-3xl mb-4 lg:text-6xl font-semibold">Register</h3>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Your Email
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="email"
                placeholder="name@email.com"
                id="email"
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Account Type */}
          <div>
            <label className="block py-3 text-gray-500 lg:text-xl">
              Account Type
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <select
                value={accountType}
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="crime">Crime Branch</option>
                <option value="asylum">Asylum</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block py-3 text-gray-500 lg:text-xl"
            >
              Your Password
            </label>
            <div className="flex items-center p-1 border rounded-md">
              <input
                type="password"
                placeholder="password..."
                id="password"
                className="w-full py-2 px-1 ml-3 text-gray-500 outline-none bg-transparent lg:text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Signup link */}
          <div className="my-5 text-lg">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 font-bold hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>
          {/* Error Message */}
          {error && (
            <div className="py-2 px-1 bg-red-50 flex items-center gap-2 rounded">
              <img src={errorIcon} alt="error" className="w-5 h-5 mx-1" />
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
          {/* Submit Button */}
          <div>
            <div className="flex items-center mt-10">
              {pending ? (
                <button className="pointer-events-none transition hover:bg-gray-700 w-full py-4 px-1 text-gray-500 outline-none bg-gray-800 rounded-md shadow-xl font-bold">
                  Registering...
                </button>
              ) : (
                <button className="transition hover:bg-gray-700 w-full py-4 px-1 text-gray-500 outline-none bg-gray-800 rounded-md shadow-xl font-bold">
                  Register
                </button>
              )}
            </div>
          </div>
        </form>
        {/* Image for desktop */}
        <div className="hidden lg:block w-2/4 pt-8">
          <img src={fingerprint} alt="register" className="w-full" />
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
