import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const storeToken = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    const isLoggedIn = !!token;

    const logoutUser = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeToken, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
