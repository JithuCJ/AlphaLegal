import React, { useContext, useState } from "react";
import { Layout, Menu, Button } from "antd";
import { NavLink, Routes, Route } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Dashboard from "../dashboard/dashboard";
import Regulation from "../dashboard/Regulation";
import Profile from "../dashboard/Profile";
import ScorePage from "../components/pages/ScorePage";
import { AuthContext } from "../store/auth";
import {
  UserOutlined,
  NotificationOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

function AppHeader() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={250}
            style={{
              overflow: "",
              height: "100%",
              position: "fixed",
              left: 0,
            }}
          >
            <Button
              type="text"
              onClick={toggleSidebar}
              style={{ marginBlock: 24, marginLeft: 30 }}
            >
              <MenuUnfoldOutlined
                style={{ color: "white", fontSize: "26px" }}
              />
            </Button>
            <Menu
              theme="dark"
              mode="inline"
              className=""
              defaultSelectedKeys={["1"]}
              style={{ height: "100%", borderRight: 0 }}
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
              {/* <Menu.Item key="3" icon={<NotificationOutlined />}>
                <Nav.Link as={NavLink} to="/regulation">
                  Regulation
                </Nav.Link>
              </Menu.Item> */}

              <Menu.Item key="3" icon={<PieChartOutlined />}>
                {" "}
                {/* Add ScorePage menu item */}
                <Nav.Link as={NavLink} to="/score">
                  Score
                </Nav.Link>
              </Menu.Item>

              <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logoutUser}>
                <Nav.Link as={NavLink} to="/">
                  Logout
                </Nav.Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: collapsed ? 80 : 250, // Adjusted for better visual alignment
              transition: "0.5s ease",
              minHeight: "100vh",
            }}
          >
            {/* <Header
              className="bg"
              style={{
                padding: 0,
                position: "",
                zIndex: 1,
                width: "100%",
              }}
            ></Header> */}
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
                paddingTop: 24,
              }}
            >
              {/* Routing */}
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
      ) : (
        <Navbar bg="light" expand="lg" className="p-3 custom-navbar">
          <Container className="">
            <Navbar.Brand as={NavLink} to="/">
              <img src="/external/logo.png" alt="logo" height={"30rem"} />
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
      )}
    </>
  );
}

export default AppHeader;
