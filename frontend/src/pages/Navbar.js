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
// import backgroundImage from '../CSS/ai.jpg'

const { Sider, Content, Footer, Header } = Layout;

const AppHeader = () => {
  const { isLoggedIn, logoutUser, role } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

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
              height="50"
              className="d-inline-block align-top"
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
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ height: "100vh", position: "fixed", left: 0 }}
        breakpoint="lg"
        collapsedWidth="80"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%" }}
        >
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Nav.Link as={NavLink} to="/admin">
              Admin
            </Nav.Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={logoutUser}>
            <Nav.Link as={NavLink} to="/">
              Logout
            </Nav.Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "0.3s ease",
          minHeight: "100vh",
        }}
      >
        <Header style={{ background: "#fff", padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
            }}
          >
            <img
              src="/external/logo.png"
              alt="logo"
              height="40"
              style={{ marginRight: "auto" }}
            />
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", padding: 24 }}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/userstable" element={<UsersTable />} />
            <Route path="/admin-blog" element={<Blog />} />
            <Route path="/post-blog" element={<Post_Blog />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} AlphaLegal | All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );

  const loggedOutNavbar = (
    <Navbar bg="" expand="lg" className="p-3 border-bottom Navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/external/logo.png" alt="logo" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={NavLink} to="/">
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/">
                Services
              </Nav.Link>
              <Nav.Link as={NavLink} to="/">
                Career
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blog
              </Nav.Link> */}
          </Nav>
          <Nav className="Login-Register">
            <Nav.Link
              as={NavLink}
              to="/login"
              className="btn login-register-btn"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/register"
              className="btn login-register-btn"
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
