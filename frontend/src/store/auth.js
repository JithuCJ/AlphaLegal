import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const setUserRole = (userRole) => {
    setRole(userRole);
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, storeToken, setUserRole, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
