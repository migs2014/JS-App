import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import API from "../api";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
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
        logoutUrl("/api/v1/student/logOut-student");
        tokenName("studentToken");
      } else if (user?.role === "Teacher") {
        logoutUrl("/api/v1/teacher/logOut-teacher");
        tokenName("teacherToken");
      } else if (user?.role === "Admin") {
        logoutUrl("/api/v1/user/logOut-admin");
        tokenName("adminToken");
      }
      const res = await API.get(logoutUrl, {
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
      console.error("LogOut Error is:", error);
      if (error.response?.status === 401) {
        setIsAuth(false);
        setUser({});
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error(
          error?.response?.data?.message || "LogOut failed,please try again"
        );
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
          {/* Right Icons */}
          <div>
            {isAuth ? (
              <div>
                <button>
                  {user?.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-600" />
                  )}
                </button>
                {profileOpen && (
                  <div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-200"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 bg-red-600 hover:text-bg-red text-white"
                      onClick={() => {
                        setProfileOpen(false);
                        logOutHandler();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Login
              </Link>
            )}
            {/* Mobile Menu  Toggle */}
            <button>
              {menuOpen && (
                <div
                  className="md:hidden text-2xl text-gray-700"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
              )}
              {/* Mobile Menu */}
              {menuOpen && (
                <div className="md:hidden bg-white px-4 shadow-md space-y-4">
                  {navLinks.map((link) => {
                    <Link key={link.name}
                     to={link.href} 
                     onClick={()=>setMenuOpen(false)}
                     className="block text-gray-700 hover:text-blue-600 font-medium"
                     >
                      {link.name}
                    </Link>
                  })}
                  {
                    isAuth?(
                      <>
                      <Link to="/dashboard" onClick={()=>setMenuOpen(false)} className="block bg-green-600 text-white text-center py-2 rounded-md">Dashboard</Link>
                      <button onClick={()=>{
                        setMenuOpen(false)
                        logOutHandler()
                      }} 
                      className="block bg-red-600 text-white w-full py-2 rounded-md"
                      >Logout</button>
                      </>
                    ):(
                      <Link  to={"/login"} onClick={()=>setMenuOpen(false)} className="block bg-blue-600 text-white text-center py-2 rounded-md">Login</Link>
                    )
                  }
                </div>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
