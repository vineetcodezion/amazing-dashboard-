import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch login action
import { loginUser } from "./../Features/auth/AuthSlice"; // Import your login action from the auth slice
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch(); // Create a dispatch function
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!uniqueKey) {
      newErrors.uniqueKey = "Unique Key is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading
      try {
        // Dispatch the login action and await the response
        await dispatch(loginUser({ email, password, uniqueKey })).unwrap();
        console.log("Login successful");
        navigate("/");
      } catch (error) {
        setErrors({ form: error }); // Set form error if login fails
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: 'url("/assets/vector.png")',
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        margin: "auto",
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[600px] p-8 rounded-lg shadow-lg border-4"
      >
        <img
          className="w-[100px] object-contain"
          src="/assets/Logo.png"
          alt=""
        />
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Display form errors if present */}
        {errors.form && (
          <p className="text-red-500 text-xs mb-2">{errors.form}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="uniqueKey"
          >
            Unique Key
          </label>
          <input
            type="text"
            id="uniqueKey"
            value={uniqueKey}
            onChange={(e) => setUniqueKey(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.uniqueKey ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your unique key"
          />
          {errors.uniqueKey && (
            <p className="text-red-500 text-xs mt-1">{errors.uniqueKey}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
