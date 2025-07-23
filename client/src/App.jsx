
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FAQPage from "./pages/FAQPage";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Help from "./pages/Help";
import Policy from "./pages/Policy";
import About from "./pages/About";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "./Context.jsx";
import API from "./api";   // your axios.create({ baseURL, withCredentials })

function App() {
  const { setIsAuth, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
    useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await API.get("", { withCredentials: true });
        if (data?.user) {
          setIsAuth(true);
          setUser(data.user);
          let profileUrl = "/api/v1/user/me";
          if (data.user.role === "Student") {
            profileUrl = "/api/v1/student/student-profile";
          } else if (data.user.role === "Teacher") {
            profileUrl = "/api/v1/teacher/teacher-profile";
          } else if (data.user.role === "Admin") {
            profileUrl = "/api/v1/user/admin-profile";
          }
          if (profileUrl) {
            const profilesRes = await API.get(profileUrl, {
              withCredentials: true,
            });
            const profileData =
              profilesRes.data[data.user.role.toLowerCase()] ||
              profilesRes.data.user ||
              data.user;
            setUser(profileData);
          }
        }
      } catch (error) { 
        // console.log("User not logged in", error);
        setIsAuth(false);
        setUser({});
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setIsAuth, setUser]);
 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-blue-700">Loading…</p>
      </div>
    );
  }

  // Test‐cookie helper
  // const testCookie = async () => {
  //   try {
  //     const res = await API.get("/test-cookie");
  //     console.log("✅ /test-cookie response headers:", res.headers);
  //     alert("Check DevTools → Network → /test-cookie → Response Headers");
  //   } catch (err) {
  //     console.error("❌ /test-cookie error:", err);
  //     alert("Test‐cookie failed—see console");
  //   }
  // };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq-page" element={<FAQPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
}

export default App;
