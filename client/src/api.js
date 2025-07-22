// // src/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL, // https://js-app-23pn.onrender.com
//   withCredentials: true,                   // if you rely on cookies
// });

// export default API;
// src/api.js
// import axios from "axios";

//  console.log("🔧 API baseURL:", import.meta.env.VITE_API_URL);

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// export default API;
import axios from "axios";

const RENDER_URL = "https://js-app-23pn.onrender.com";

console.log("🔧 API baseURL:", import.meta.env.VITE_API_URL || RENDER_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || RENDER_URL,
  withCredentials: true,
});

export default API;