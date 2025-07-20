import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuth, setIsAuth, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
    // { name: "Policy", href: "/policy" },
    { name: "Login", href: "/login" },
  ];
  // logOut user
  const logOutHandler = async () => {
    try {
      let logoutUrl = "";
      let tokenName = "";
      if (user?.role === "Student") {
        logoutUrl("http://localhost:3030/api/v1/student/logOut-student");
        tokenName("studentToken");
      } else if (user?.role === "Teacher") {
        logoutUrl("http://localhost:3030/api/v1/teacher/logOut-teacher");
        tokenName("teacherToken");
      } else if (user?.role === "Admin") {
        logoutUrl("http://localhost:3030/api/v1/user/logOut-admin");
        tokenName("adminToken");
      }
      const res = await axios.get(logoutUrl, {
        withcCredentials: true,
        Headers: {
          "Content-Type": "application/json",
        },
      });
      setIsAuth(false);
      setUser({});
      localStorage.removeItem(tokenName);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("LogOut Error is:",error)
      if(error.response?.status===401){
        setIsAuth(false)
        setUser({})
          localStorage.clear()
          navigate("/login")
      } else{
        toast.error(
          error?.response?.data?.message||"LogOut failed,please try again"
        )
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            JS App
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-lg">
            {navLinks.map((link) => (
              <Link
                to={link.href}
                className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
