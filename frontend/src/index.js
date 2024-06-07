import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./store/auth";
import { UserProvider } from "./store/UserContext";
import "./style.css";
import Footer from "./components/pages/Footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./pages/Navbar";
import AccountVerified from "./Models/AccountVerified";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/account-verified" element={<AccountVerified />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <UserProvider>
      <App />
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
    </UserProvider>
  </AuthProvider>
);
