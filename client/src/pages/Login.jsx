import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../main.jsx";
import { Context } from "../Context.jsx";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserTag,
} from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Accessing context api
  const { setIsAuth, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login-user",
        { email, password, role },
        { withCredentials: true }
      );
      setIsAuth(true);
      setUser(data.user);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // response
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-blue-200">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-[300px] md:max-w-md mt-15 md:mt-0">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-blue-600">
            Login Your Account
          </h2>
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <form action="" className="space-y-2" onSubmit={handleLogin}>
            {/* Email */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                placeholder="Enter valid Email"
                type="text"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password */}
            <div className="flex items-center border rounded-md px-3 py-2 relative">
              <FaLock className="text-gray-500 mr-3" />
              <input
                placeholder="Correct password (Min 6 characters)"
                type={showPassword ? "text" : "password"}
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Role DropDown */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaUserTag className="text-gray-500 mr-3" />
              <select
                className="w-full outline-none bg-transparent"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Rememeber Me
              </label>
            </div>
            {/* Login button */}
            <button className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 disable:blue-400 cursor-pointer rounded-md hover:scale-105 hover:duration-300">
              Login
            </button>
            {/* Back to Register */}
            <div className="flex justify-between gap-2 px-2">
              <p className="text-center text-blue-600 hover:underline cursor-pointer">
                <Link to="/register">Create a New Account</Link>
              </p>
              <p className="text-center text-blue-600 hover:underline cursor-pointer">
                <Link to="/forgot-password">Forgot Password</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
