import React from "react";
import "../../CSS/home/about.css"; // Verify the path is correct
import ContactSection from "./ContactSection";

const About = () => {
  return (
    <>
      <div className="about-container1">
        <div className="about-background">
          <div className="about-content">
            <h1>Who We Are</h1>
            <p>
              At AlphaLegal, we are a pioneering force in the regulation of
              artificial intelligence. Committed to the responsible and ethical
              development, deployment, and governance of AI technologies, we are
              at the forefront of shaping a future where AI benefits humanity
              while mitigating potential risks.
            </p>
            <p>
              Our firm brings together a diverse team of experts, including
              technologists, legal professionals, policy analysts, and
              ethicists, united by a shared vision of establishing robust
              frameworks for AI regulation. We understand that AI has the power
              to transform industries, improve lives, and drive innovation.
              However, we also recognize the need to establish guardrails that
              ensure AI is used ethically, transparently, and in a manner that
              respects fundamental human rights.
            </p>
          </div>
        </div>
      </div>
      <ContactSection />
    </>
  );
};

export default About;
