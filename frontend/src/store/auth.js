import { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  // Use useEffect to synchronize the token state with localStorage
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken !== token) {
      setToken(currentToken);
    }

    const currentRole = localStorage.getItem("role");
    if (currentRole !== role) {
      setRole(currentRole);
    }
    
  }, [token, role]);

  // Function to store token in localStorage and state
  const storeToken = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // Function to store role in localStorage and state
  const storeRole = (serverRole) => {
    localStorage.setItem("role", serverRole);
    setRole(serverRole);
  };

  // Function to clear token and role from localStorage and state
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        role,
        storeToken,
        storeRole,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
