import React, { useContext, useState } from "react";
import { Layout, Menu, Button } from "antd";
import { NavLink, Routes, Route } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Dashboard from "../dashboard/dashboard";
import Regulation from "../dashboard/Regulation";
import Profile from "../dashboard/Profile";
import ScorePage from "../components/pages/ScorePage";
import AdminPage from "../components/admin/admin";
import UsersTable from "../components/admin/User-Data";
import Blog from "../components/admin/Post-Blog";
import Upload from "../components/admin/Upload-pdf";
import { AuthContext } from "../store/auth";

import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Post_Blog } from "../components/Blog/Post-Blog";
import TermsAndConditions from "../dashboard/TermsAndConditions";
import ContactInfo from "../dashboard/ContactInfo";
import Job from "../components/admin/Job";
import JobForm from "../components/admin/jobPost";
// import backgroundImage from '../CSS/ai.jpg'

const { Sider, Content, Footer, Header } = Layout;

const AppHeader = () => {
  const { isLoggedIn, logoutUser, role } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  // const handleMouseLeave = () => {
  //   setCollapsed(true);
  // };

  const userLogin = (
    <Layout>
      <Navbar
        bg="light"
        expand="lg"
        className="border-bottom"
        style={{ height: "4rem" }}
      >
        <div className="container d-flex justify-content-between">
          {" "}
          {/* Updated this div to use flex */}
          <Navbar.Brand>
            <img
              src="/external/logo.png"
              alt="logo"
              height="40"
             className="w-16"
            />
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" style={{ lineHeight: "4rem" }}>
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/score">
                  Score
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" onClick={logoutUser}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>

      <Content className="content-background">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/regulation" element={<Regulation />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/contactinfo" element={<ContactInfo />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} AlphaLegal | All rights reserved
      </Footer>
      {/* </Layout> */}
    </Layout>
  );

  const adminLogin = (
    <Layout>
      <Navbar
        bg="light"
        expand="lg"
        className="border-bottom"
        style={{ height: "4rem" }}
      >
        <div className="container d-flex justify-content-between">
          {" "}
          {/* Updated this div to use flex */}
          <Navbar.Brand>
            <img
              src="/external/logo.png"
              alt="logo"
              height="50"
              className="w-16"
            />
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" style={{ lineHeight: "4rem" }}>
                <Nav.Link as={NavLink} to="/admin">
                  Admin
                </Nav.Link>

                <Nav.Link as={NavLink} to="/" onClick={logoutUser}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>

      <Content style={{ margin: "24px 16px 0", padding: 24 }}>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/userstable" element={<UsersTable />} />
          <Route path="/admin-blog" element={<Blog />} />
          <Route path="/post-blog" element={<Post_Blog />} />
          <Route path="/job" element={<Job />} />
          <Route path="/jobform" element={<JobForm />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} AlphaLegal | All rights reserved
      </Footer>
    </Layout>
  );

  const loggedOutNavbar = (
    <Navbar
      bg=""
      expand="lg"
      expanded={collapsed}
      className="p-3 border-bottom Navbar"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/external/logo.png" alt="logo" height="40" className="w-16" />
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setCollapsed(collapsed ? false : true)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-5 fs-5">
            <Nav.Link
              as={NavLink}
              to="/services"
              className="nav-link-hover"
              activeClassName="active"
              onClick={handleMouseEnter}
            >
              Services
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/industries"
              className="nav-link-hover"
              activeClassName="active"
              onClick={handleMouseEnter}
            >
              Industries
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/blog"
              className="nav-link-hover"
              activeClassName="active"
              onClick={handleMouseEnter}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className="nav-link-hover"
              activeClassName="active"
              onClick={handleMouseEnter}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/careers"
              className="nav-link-hover"
              activeClassName="active"
              onClick={handleMouseEnter}
            >
              Careers
            </Nav.Link>
          </Nav>
          <Nav className="Login-Register">
            <Nav.Link
              as={NavLink}
              to="/login"
              className="btn login-register-btn"
              onClick={handleMouseEnter}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/register"
              className="btn login-register-btn"
              onClick={handleMouseEnter}
            >
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return isLoggedIn
    ? role === "admin"
      ? adminLogin
      : userLogin
    : loggedOutNavbar;
};

export default AppHeader;
