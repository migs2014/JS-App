import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
    { name: "Policy", href: "/policy" },
  ];
  return (
    <div>
      <header className="bg-white shadow-md fixed w-full top-0 z-50"> 
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">JS App</Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-lg">
            {navLinks.map((link)=>(
                <Link to={link.href} className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium cursor-pointer">
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
