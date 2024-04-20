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
import "./style.css";

import "./style.css";
// import Desktop1 from "./views/desktop1";
import NotFound from "./views/not-found";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./pages/Navbar";
import { Logout } from "./pages/Logout";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,

  document.getElementById("app")
);
