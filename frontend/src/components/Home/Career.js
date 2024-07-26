import React from "react";
import "../../CSS/home/CareerPage.css"; // Ensure this path is correct for your project structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShieldAlt,
  faBalanceScale,
  faLock,
  faHandsHelping,
  faArrowRight,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ContactSection from "./ContactSection";

const coreValues = [
  {
    icon: faSearch,
    title: "Transparency",
    description:
      "Ensuring AI systems and their decision-making processes are transparent and understandable.",
  },
  {
    icon: faShieldAlt,
    title: "Safety",
    description:
      "Prioritising the development and deployment of safe and reliable AI systems, with mechanisms to identify and mitigate potential risks.",
  },
  {
    icon: faBalanceScale,
    title: "Fairness",
    description:
      "Designing AI systems to avoid biases, discrimination, and unfair treatment towards individuals or groups.",
  },
  {
    icon: faLock,
    title: "Privacy",
    description:
      "Safeguarding personal information and establishing clear guidelines on data collection, usage, and storage.",
  },
  {
    icon: faHandsHelping,
    title: "Ethical Considerations",
    description:
      "Addressing the ethical implications of AI, including its impact on society, human rights, and the environment.",
  },
  {
    icon: faUsers,
    title: "Accountability",
    description:
      "Holding developers, organizations, and users of AI systems accountable for their decisions and actions.",
  },
];

const CareerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="career-page">
      <header className="jumbotron text-center bg-dark text-light">
        <Container>
          <h1 className="display-3 p-3">Join Us in Shaping the Future Of AI</h1>
          <p className="p-2">
            We are constantly seeking individuals with diverse backgrounds and
            expertise to contribute to the development of AI systems that are
            both safe and beneficial. If you have a curious mind and are
            interested in joining our team, we would like to hear from you.
          </p>
          <button
            className="btn btn-primary impressive-button"
            onClick={() => navigate("/job-openings")}
          >
            View Open Roles <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Container>
      </header>
      <section className="core-values container">
        <h2 className="text-center p-5 display-6 "> Core Values</h2>
        <div className="row">
          {coreValues.map((value, index) => (
            <div key={index} className="col-md-6 text-center">
              <div className="value-item">
                <FontAwesomeIcon
                  icon={value.icon}
                  size="4x"
                  className="value-icon"
                />
                <h3>
                  {" "}
                  <b> {value.title} </b>
                </h3>
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactSection />
    </div>
  );
};

export default CareerPage;
