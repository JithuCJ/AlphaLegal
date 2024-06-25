// index.js
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
import { Blog } from "./components/Blog/Blog";
import { BlogDetail } from "./components/Blog/Blog-Details";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/pages/Footer";

const App = () => (
  <Router>
    <AppHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/account-verified" element={<AccountVerified />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="*"
        element={<div className="container mt-5">Page not found</div>}
      />
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
    <Footer />
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
