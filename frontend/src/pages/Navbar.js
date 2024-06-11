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
import Upload from "../components/admin/Upload-pdf";
import { AuthContext } from "../store/auth";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Sider, Content, Footer } = Layout;

const AppHeader = () => {
  const { isLoggedIn, logoutUser, role } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const userLogin = (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ height: "100vh", position: "fixed", left: 0 }}
      >
        <Button
          type="text"
          onClick={toggleSidebar}
          style={{ margin: 24, marginLeft: 30 }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={{ color: "white", fontSize: "26px" }} />
          ) : (
            <MenuFoldOutlined style={{ color: "white", fontSize: "26px" }} />
          )}
        </Button>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%" }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Nav.Link as={NavLink} to="/profile">
              Profile
            </Nav.Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Nav.Link as={NavLink} to="/score">
              Score
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
          transition: "0.5s ease",
          minHeight: "100vh",
        }}
      >
        <Content style={{ margin: "24px 16px 0", padding: 24 }}>
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
      </Layout>
    </Layout>
  );

  const adminLogin = (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          style={{ height: "100vh", position: "fixed", left: 0 }}
        >
          <Button
            type="text"
            onClick={toggleSidebar}
            style={{ margin: 24, marginLeft: 30 }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                style={{ color: "white", fontSize: "26px" }}
              />
            ) : (
              <MenuFoldOutlined style={{ color: "white", fontSize: "26px" }} />
            )}
          </Button>
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
            transition: "0.5s ease",
            minHeight: "100vh",
          }}
        >
          <Content style={{ margin: "24px 16px 0", padding: 24 }}>
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/userstable" element={<UsersTable />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()} AlphaLegal | All rights reserved
          </Footer>
        </Layout>
      </Layout>
    </>
  );

  const loggedOutNavbar = (
    <Navbar bg="light" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/external/logo.png" alt="logo" height="30" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
              Services
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
              Career
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

 return isLoggedIn ? (role === "admin" ? adminLogin : userLogin) : loggedOutNavbar;
};

export default AppHeader;
