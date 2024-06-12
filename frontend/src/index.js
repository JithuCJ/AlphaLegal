import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./store/auth";
import { UserProvider } from "./store/UserContext";
import "./style.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AppHeader from "./pages/Navbar";
import AccountVerified from "./Models/AccountVerified";
import ForgotPassword from "./components/Password/ForgotPassword";
import ResetPassword from "./components/Password/ResetPassword";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Router>
    <AppHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/account-verified" element={<AccountVerified />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </Router>
);

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>
);
