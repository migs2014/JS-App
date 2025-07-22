// import React, { useContext, useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import PageNotFound from "./pages/PageNotFound";
// import FAQPage from "./pages/FAQPage";
// import Terms from "./pages/Terms";
// import Contact from "./pages/Contact";
// import Services from "./pages/Services";
// import Help from "./pages/Help";
// import Policy from "./pages/Policy";
// import About from "./pages/About";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { Context } from "./main.jsx";
// import { Context } from "./Context.jsx";
// // import axios from "axios";
// // import API from "../api";
// import API from "./api";   // ← your axios.create({ baseURL: VITE_API_URL, withCredentials: true })
// function App() {
//   const { setIsAuth, setUser } = useContext(Context);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const { data } = await API.get("", { withCredentials: true });
//         if (data?.user) {
//           setIsAuth(true);
//           setUser(data.user);
//           let profileUrl = "/api/v1/user/me";
//           if (data.user.role === "Student") {
//             profileUrl = "/api/v1/student/student-profile";
//           } else if (data.user.role === "Teacher") {
//             profileUrl = "/api/v1/teacher/teacher-profile";
//           } else if (data.user.role === "Admin") {
//             profileUrl = "/api/v1/user/admin-profile";
//           }
//           if (profileUrl) {
//             const profilesRes = await API.get(profileUrl, {
//               withCredentials: true,
//             });
//             const profileData =
//               profilesRes.data[data.user.role.toLowerCase()] ||
//               profilesRes.data.user ||
//               data.user;
//             setUser(profileData);
//           }
//         }
//       } catch (error) {
//         setIsAuth(false);
//         setUser({});
//         console.log("User not Logged in", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, [setIsAuth]);
//   // Loading
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-2xl font-semibold text-blue-700">Loading........</p>
//       </div>
//     );
//   }
//   // TEST COOKIE
//   const testCookie = async () => {
//     try {
//       const res = await API.get("/test-cookie");
//       console.log("✅ /test-cookie response headers:", res.headers);
//       alert("Check DevTools → Network for Set-Cookie and console.headers");
//     } catch (err) {
//       console.error("❌ /test-cookie error:", err);
//       alert("Test-cookie failed—see console");
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="p-4 text-center bg-yellow-50">
//        <button 
//        onClick={testCookie}
//        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//        >
//         Test Cookie Endpoint
//        </button>
//       </div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/help" element={<Help />} />
//         <Route path="/policy" element={<Policy />} />
//         <Route path="/terms" element={<Terms />} />
//         <Route path="/faq-page" element={<FAQPage />} />
//         <Route path="*" element={<PageNotFound />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//       <ToastContainer position="bottom-right" />
//       <Footer />
//     </div>
//   );
// }

// export default App;

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

  // // Fetch current user on mount
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const { data } = await API.get("/api/v1/user/me");
  //       if (data?.user) {
  //         setIsAuth(true);
  //         setUser(data.user);

  //         // Determine profile URL by role
  //         let profilePath;
  //         switch (data.user.role) {
  //           case "Student":
  //             profilePath = "/api/v1/student/student-profile";
  //             break;
  //           case "Teacher":
  //             profilePath = "/api/v1/teacher/teacher-profile";
  //             break;
  //           case "Admin":
  //             profilePath = "/api/v1/user/admin-profile";
  //             break;
  //           default:
  //             profilePath = null;
  //         }

  //         if (profilePath) {
  //           const { data: profileData } = await API.get(profilePath);
  //           // The response might nest data under a key matching the role
  //           const payload =
  //             profileData[data.user.role.toLowerCase()] ||
  //             profileData.user ||
  //             data.user;
  //           setUser(payload);
  //         }
  //       }
  //     } catch (error) {
  //       console.log("User not logged in", error);
  //       setIsAuth(false);
  //       setUser({});
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [setIsAuth, setUser]);
  useEffect(() => {
  const fetchUserProfile = async () => {
    console.log("🚀 [fetchUserProfile] starting…");
    let user;

    // 1) Get the bare‐bones user object
    try {
      console.log("👉 GET /api/v1/user/me");
      const response = await API.get("/api/v1/user/me");
      console.log("👈 /user/me response.data:", response.data);
      user = response.data.user;
      setIsAuth(true);
      setUser(user);
    } catch (err) {
      console.error("❌ Failed GET /user/me:", err);
      setIsAuth(false);
      setUser({});
      setLoading(false);
      return;            // bail out early if this fails
    }

    // 2) Depending on role, grab the full profile
    let profilePath;
    switch (user.role) {
      case "Student":
        profilePath = "/api/v1/student/student-profile";
        break;
      case "Teacher":
        profilePath = "/api/v1/teacher/teacher-profile";
        break;
      case "Admin":
        profilePath = "/api/v1/user/admin-profile";
        break;
      default:
        console.warn("[fetchUserProfile] unknown role:", user.role);
        profilePath = null;
    }

    if (profilePath) {
      try {
        console.log("👉 GET", profilePath);
        const profileRes = await API.get(profilePath);
        console.log(`👈 ${profilePath} response.data:`, profileRes.data);

        // pull out the nested object safely
        const nestedKey = user.role.toLowerCase();
        const fullProfile =
          profileRes.data[nestedKey] ||
          profileRes.data.user ||
          user;

        console.log("🏷️ using payload:", fullProfile);
        setUser(fullProfile);
      } catch (err) {
        console.error(`❌ Failed GET ${profilePath}:`, err);
      }
    }

    setLoading(false);
    console.log("✅ [fetchUserProfile] done");
  };

  fetchUserProfile();
}, []);   // notice we only run once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-blue-700">Loading…</p>
      </div>
    );
  }

  // Test‐cookie helper
  const testCookie = async () => {
    try {
      const res = await API.get("/test-cookie");
      console.log("✅ /test-cookie response headers:", res.headers);
      alert("Check DevTools → Network → /test-cookie → Response Headers");
    } catch (err) {
      console.error("❌ /test-cookie error:", err);
      alert("Test‐cookie failed—see console");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-4 text-center bg-yellow-50">
        <button
          onClick={testCookie}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Cookie Endpoint
        </button>
      </div>

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
