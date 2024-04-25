import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";
import {
  UserOutlined,
  NotificationOutlined,
  HomeOutlined,
  LogoutOutlined,
  StepBackwardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";

const { Header, Sider, Content } = Layout;

function AppHeader() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

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
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{ marginTop: "15rem" }}
            >
              <Menu.Item key="1" icon={<HomeOutlined />} className="">
                <Nav.Link as={NavLink} to="/dashboard">
                  Welcome
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
                <Nav.Link as={NavLink} to="/regulation">
                  Regulation
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
          <Layout
            className="site-layout"
            style={{
              marginLeft: collapsed ? 40 : 200,
              transition: "0.5s ease-",
            }}
          >
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Button
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleSidebar}
                style={{ marginLeft: 22 }}
              />
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              {/* <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                Content goes here.
              </div> */}
            </Content>
          </Layout>
        </Layout>
      ) : (
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
      )}
    </>
  );
}

export default AppHeader;
