// import React from 'react'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./store/auth";
import { UserProvider } from "./store/UserContext";
import "./style.css";

import "./style.css";
// import Desktop1 from "./views/desktop1";
import NotFound from "./views/not-found";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./pages/Navbar";
// import Footer from "./components/pages/Footer";
import { Logout } from "./pages/Logout";
import Dashboard from "./dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Profile from "./dashboard/Profile";
import Regulation from "./dashboard/Regulation";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout"  element={<Logout />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/regulation" element={<Regulation />} /> */}
        {/* <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/" />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

ReactDOM.render(
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
  </AuthProvider>,

  document.getElementById("app")
);
