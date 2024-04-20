import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/auth";

function Header() {
    const { isLoggedIn, logoutUser } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg" className="p-3">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                <img src="/external/logo.png" alt="logo" height={"30rem"} /> 
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/">Services</Nav.Link>
                    <Nav.Link as={NavLink} to="/">Career</Nav.Link>
                </Nav>
                <Nav>
                    {isLoggedIn ? (
                        <>
                            <Nav.Link onClick={logoutUser} as={NavLink} to="/logout">
                                Logout
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
