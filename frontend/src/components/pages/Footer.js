import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../store/auth";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return null; // Don't render the footer if the user is logged in
  }
  return (
    <footer
      className="text-black"
      style={{
        bottom: 0,
        zIndex: 1000,
        position: "relative",
        width: "100%",
        background: "#0A2239",
      }}
    >
      <Container className="text-center py-4" style={{ color: "white" }}>
        ©{new Date().getFullYear()} AlphaLegal | All rights reserved
      </Container>
    </footer>
  );
};

export default Footer;
