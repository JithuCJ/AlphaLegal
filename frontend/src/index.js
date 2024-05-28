// import React from 'react'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./store/auth";
import { UserProvider } from "./store/UserContext";
import "./style.css";

import "./style.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./pages/Navbar";
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
        <Route path="/logout"  element={<Logout />} />

      </Routes>
  
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
