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
      className="bg-light text-black mt-5"
      style={{ bottom: 0, position: "relative", width: "100%" }}
    >
      <Container className="text-center py-4 ">
        ©{new Date().getFullYear()} AlphaLegal | All rights reserved
      </Container>
    </footer>
  );
};

export default Footer;
