// src/Context.jsx
import { createContext, useState } from "react";

// Step 1: Create the context
export const Context = createContext();

// Step 2: Create a provider component
export function ContextProvider({ children }) {
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth]   = useState(false);
  const [user, setUser]       = useState(null);

  const value = {
    role,
    setRole,
      isAuth,
    setIsAuth,
    user,
    setUser,

  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}