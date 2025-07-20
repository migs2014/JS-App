// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

// src/main.jsx
import { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./Context.jsx"; // 👈 import the provider

// Context api create
export const Context = createContext();
const Apps =() =>{
  const [isAuth, setIsAuth] =useState( ()=>{
    return !localStorage.getItem("authToken")
  })
 const [user, setUser] =useState(()=>{
  const savedUser=localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser):{};
 });
return (
  <Context.Provider value={{isAuth,setIsAuth,user,setUser}}>
    <App/>
  </Context.Provider>
)
}
createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
 
);