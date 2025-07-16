import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaYoutube,} from "react-icons/fa";
import { FaSquareInstagram} from "react-icons/fa6"
function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
        <div className="max-w-[1440px mx-auto grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="">
            <h2 className="text-2xl md:-3xl font-bold text-blue-400 mb-4">Junior school App</h2>
            <p className="text-gray-300 text-lg font-mono font-medium">Manage school efficiently</p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 md:text-xl font-sans">Quick Links</h3>
            <ul className="space-y-3 text-gray-300 text-sm md:text-lg">
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to={"/about"}>About Us</Link>
              </li>
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to={"/services"}>Services</Link>
              </li>
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to={"/contact"}>Contact</Link>
              </li>
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to={"/policy"}>Policy</Link>
              </li>
            </ul>
          </div>
          {/*support  */}
          <div>
            <h3 className="text-lg font-semibold mb-3 md:text-xl font-sans">Support</h3>
            <ul className="space-y-3 text-gray-300 text-sm md:text-lg">
               <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/faq-page">FAQ</Link>
                </li>
               <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/policy">Policy</Link>
                </li>
                <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/terms">Terms & conditions</Link>
                </li>
                <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/help">FAQ</Link>
                </li>
            </ul>
          </div>
          {/* social media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow us</h3>
            <div className="flex-gap-4 cursor-pointer items-center">
              <Link to={"https://web.facebook.com/Powerlearnproject/?_rdc=1&_rdr#"}>
              <FaFacebookSquare size={22} className="text-blue-500 hover:text-blue-700"/>
              </Link>
              <Link to={"https://www.youtube.com/@powerlearnproject"}>
              <FaYoutube size={22} className="text-red-500 hover:text-red-700"/> 
              </Link> 
              <Link to={"https://www.instagram.com/accounts/login/?next=%2Fplpafrica%2F&source=omni_redirect"}>
                <FaSquareInstagram size={22} className="text-purple-500 hover:text-purple-700"/>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
