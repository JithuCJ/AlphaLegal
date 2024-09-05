import React from "react";
import { useNavigate } from "react-router-dom";

import "../../CSS/home/CareerPage.css"; // Ensure this path is correct for your project structure

function ContactSection() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact"); // Ensure the route is defined in your router setup
  };

  return (
    <div className="contact-section" style={{ background: "#F3F5F8" }}>
      <h1>
        We would love to hear <br /> from you!
      </h1>
      <p>
        If you have any questions, feedback, or inquiries, please <br /> don't hesitate
        to get in touch with us. Our dedicated <br /> team is here to assist you.
      </p>
      <button onClick={handleContactClick}>Contact Us</button>
    </div>
  );
}

export default ContactSection;
