import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/auth";

import {
  UserOutlined,
  NotificationOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

function Header() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const { Sider } = Layout;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Layout className="">
            <Sider
              className="p-3 "
              width="40vh"
              style={{
                height: "100vh",
                position: "fixed",
                left: 0,
                overflow: "auto",
                zIndex: 3,
                minHeight: "100%",
              }}
              trigger={null} // Custom trigger option
            >
              <div
                className="logo d-flex justify-content-center align-items-center border rounded-2"
                style={{
                  height: "40px",

                  margin: "16px",
                  background: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <h4 className="text-center text-white m-2 shadow">
                  LegalShield
                </h4>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{ marginTop: "4rem" }}
              >
                <Menu.Item key="1" icon={<HomeOutlined />} className="">
                  <Nav.Link as={NavLink} to="/dashboard">
                    Home
                  </Nav.Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<UserOutlined />}
                  className="sidebar-menu"
                >
                  <Nav.Link as={NavLink} to="/profile">
                    Profile
                  </Nav.Link>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<NotificationOutlined />}
                  className="sidebar-menu"
                >
                  <Nav.Link as={NavLink} to="/notifications">
                    Notifications
                  </Nav.Link>
                </Menu.Item>
                <Menu.Item
                  key="4"
                  icon={<LogoutOutlined />}
                  onClick={() => logoutUser()}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Sider>
          </Layout>
        </>
      ) : (
        <>
          <Navbar bg="light" expand="lg" className="p-3">
            <Container>
              <Navbar.Brand as={NavLink} to="/">
                <img src="/external/logo.png" alt="logo" height={"30rem"} />
              </Navbar.Brand>
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
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
}

export default Header;
