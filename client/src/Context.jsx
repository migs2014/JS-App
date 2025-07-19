// src/Context.jsx
import { createContext, useState } from "react";

// Step 1: Create the context
export const Context = createContext();

// Step 2: Create a provider component
export function ContextProvider({ children }) {
  const [role, setRole] = useState("");

  const value = {
    role,
    setRole,
    // Add more shared state or functions here if needed
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}