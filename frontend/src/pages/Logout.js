import  { useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";

export const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        logoutUser();
        navigate("/");
    }, [logoutUser, navigate]);

    return <Navigate to="/login" />;; 
};
