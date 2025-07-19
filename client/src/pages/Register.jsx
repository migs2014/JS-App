import React, { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUpload,
  FaUser,
  FaUserTag,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  // const { name, setName } = useState("");
  // const { email, setEmail } = useState("");
  // const { password, setPassword } = useState("");
  // const { phone, setPhone } = useState("");
  // const { address, setAddress } = useState("");
  // const { gender, setGender } = useState("");
  // const { role, setRole } = useState("");
  // const { avatar, setAvatar } = useState(null);
  // const { dateOfBirth, setDateOfBirth } = useState("");
  // const { showPassword, setShowPassword } = useState(false);
  // const { loading, setLoading } = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // navigate into other page
  const navigate = useNavigate();
  // create user or register user
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Input validation check
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !avatar ||
      !dateOfBirth ||
      role
    ) {
      toast.error("Please fill in all fields");
      setLoading(false);
    }
    // password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("gender", gender);
      formData.append("avatar", avatar);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("role", role);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/create-user",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Registration Successfully");
      navigate("/login");
      // now send Reset fields
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setGender("");
      setAvatar(null);
      setAddress("");
      setRole("");
      setDateOfBirth("");
    } catch (error) {
      console.error("Registration Error", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };
  // image handle function
  const handleAvatarChange = (e) => {
    const file = e.target.files(0);
    if (file) {
      if (!file.type.match("image.*")) {
        toast.error("Please Select an image File");
        return;
      }
      setAvatar(file);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-[300px] md:max-w-md mt-15 md:mt-0">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-blue-600">
          Create a New Account
        </h2>
        <form action="" className="space-y-2" onSubmit={handleRegistration}>
          {/* Full Name */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              placeholder="Full Name"
              type="type"
              className="w-full outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Correct passwordb(Min 6 characters)"
              type={showPassword ? "text" : "password"}
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!password)}
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
          {/* Get gender */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUserTag className="text-gray-500 mr-3" />
            <select
              className="w-full outline-none bg-transparent"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Femala">Female</option>
            </select>
          </div>
          {/* phone */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="Phone"
              className="w-full outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {/* Address */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="Address"
              className="w-full outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {/* image upload */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUpload className="text-gray-500 mr-3" />
            <input
              type="file"
              accept="image/*"
              className="w-full outline-none"
              onChange={handleAvatarChange}
            />
          </div>
          {/* Date of Birth */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          {/* Register button */}
          <button
            className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 disable:blue-400 cursor-pointer rounded-md hover:scale-105 hover:duration-300"
            disabled={loading}
          >
            {loading ? "Registering" : "Register"}
            {/* Register */}
          </button>
          {/* Back to Login */}
          <div className="flex justify-between gap-2 px-2">
            <p className="text-center text-blue-600 hover:underline cursor-pointer">
              <Link to="/login">Login</Link>
            </p>
            <p className="text-center text-blue-600 hover:underline cursor-pointer">
              <Link to="/forgot-password">Forgot Password</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
