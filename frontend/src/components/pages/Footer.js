import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white mt-5"
      style={{ bottom: 0, position: "fixed", width: "100%" }}
    >
      <Container className="text-center py-4 ">
      ©{new Date().getFullYear()} AlphaLegal | All rights reserved
      </Container>
    </footer>
  );
};

export default Footer;
