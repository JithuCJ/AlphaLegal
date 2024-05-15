import { createContext, useState, useEffect } from 'react';



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || "");

    useEffect(() => {
        // This effect runs only once on mount and whenever the token changes
        const currentToken = localStorage.getItem('token');
        if (currentToken !== token) {
            setToken(currentToken);
        }
    }, [token]);

    const storeToken = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken);
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, storeToken, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
