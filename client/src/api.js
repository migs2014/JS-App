// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // https://js-app-23pn.onrender.com
  withCredentials: true,                   // if you rely on cookies
});

export default API;