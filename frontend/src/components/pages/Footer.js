import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

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
        background: "black",
      }}
    >
      <Container
        className="text-center py-4"
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>©{new Date().getFullYear()} AlphaLegal | All rights reserved</div>
        <div>
          <a
            href="https://www.linkedin.com/company/alphalegal-ai/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#40a9ff", margin: "0 10px" }}
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#40a9ff", margin: "0 10px" }}
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://x.com/alphalegalai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#40a9ff", margin: "0 10px" }}
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/AlphaLegalAi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#40a9ff", margin: "0 10px" }}
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
