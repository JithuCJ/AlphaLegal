import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faShieldAlt,
  faExclamationTriangle,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/LandingPage.css";

function Home() {
  const services = [
    {
      title: "AI Compliance Audits",
      description: [
        "Comprehensive audits to ensure AI systems meet all relevant regulatory requirements",
        "Detailed reports highlighting areas of non-compliance and recommendations for improvement",
      ],
    },

    {
      title: "Legal Advisory on AI Implementation",
      description: [
        "Expert legal consultation on AI deployment and usage",
        "Guidance on navigating the legal landscape of AI technologies",
        "Representation in regulatory and compliance matters",
      ],
    },
    {
      title: "Ongoing Compliance Monitoring",
      description: [
        "Continuous monitoring of AI systems to ensure ongoing regulatory compliance",
        "Regular updates on changes in AI regulations and their impact on your business",
        "Proactive management of compliance documentation and reporting",
      ],
    },
    {
      title: "Ethical AI Implementation",
      description: [
        "Consultation on integrating ethical principles into AI development and deployment",
        "Auditing AI systems for ethical compliance",
        "Workshops and training on ethical AI practices",
      ],
    },
    {
      title: "Data Privacy and Security",
      description: [
        "Assessment of data handling practices for compliance with privacy laws",
        "Implementation of robust data protection measures",
        "Ongoing auditing and monitoring for data privacy compliance",
      ],
    },

    {
      title: "  Customized Training and Workshops",
      description: [
        "Tailored training programs on AI compliance and ethics for different industries",
        "Workshops on emerging AI regulations and best practices",
        "On-demand training sessions for specific organizational needs",
      ],
    },
  ];

  const WhyChoose = [
    {
      title: "Expertise in AI Regulatory Compliance",
      description: [
        "Alphalegal specializes in the intricate landscape of AI regulations",
        "Providing unparalleled expertise to ensure your AI systems meet all legal requirements",
      ],
      icon: faCheckCircle,
    },
    {
      title: "Comprehensive Services",
      description: [
        "From AI compliance audits to ongoing monitoring and risk assessments",
        "Our comprehensive suite of services covers all aspects of AI regulatory and ethical implementation",
      ],
      icon: faShieldAlt,
    },
    {
      title: "Proactive Risk Management",
      description: [
        "Our proactive approach to risk management helps identify and mitigate potential issues",
        "Safeguarding your business from regulatory pitfalls",
      ],
      icon: faExclamationTriangle,
    },
    {
      title: "Commitment to Ethical AI",
      description: [
        "Alphalegal is committed to promoting ethical AI practices",
        "Helping you integrate ethical principles into your AI systems",
        "Building trust and ensuring responsible AI usage",
      ],
      icon: faHeart,
    },
  ];

  return (
    <>
      {/* Title */}
      <div className="home-container d-flex flex-column align-items-center">
        {/* else */}

        <Container className="about-container mb-5 mt-5">
          <Row>
            <Col md={6} className="about-text-container">
              <h1 className="about-title display-4">
                Navigating The Ethical Frontier
              </h1>
              <p className="about-text lead">
                At AlphaLegal, we build a future where AI is developed,
                deployed, and regulated safely and responsibly, ensuring ethical
                use, adherence to regulatory frameworks, and combating potential
                misuse to safeguard AI integrity.
              </p>
            </Col>
            <Col
              md={6}
              className="d-flex mt-3 justify-content-center align-items-center"
            >
              <img
                src="logo.png"
                alt="AlphaLegal team"
                className="about-img img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* WHy Alpha-Legal */}

      {/* WHy Alpha-Legal */}
      <div className="p-5 bg-light">
        <Container>
          <h1 className="Why-title mt-5 text-center">Why Choose Alphalegal?</h1>
          <Row className="mt-5">
            {WhyChoose.map((service, index) => (
              <Col md={6} key={index} className="mb-4">
                <div
                  className="why-item text-center p-4 shadow-sm rounded bg-white"
                  style={{}}
                >
                  <FontAwesomeIcon
                    icon={service.icon}
                    size="3x"
                    className="text-primary mb-3"
                  />
                  <h4 className="mb-3">{service.title}</h4>
                  <p style={{ textAlign: "justify" }}>{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      {/* Services */}
      <div className="services-section">
        <Container>
          <h1 className="Service-title mt-5">Services</h1>
          <Row className="mt-5">
            {services.map((service, index) => (
              <Col md={6} key={index} className="mb-4 card-container">
                <Card
                  className="card-title"
                  title={service.title}
                  style={{
                    height: "260px",
                    width: "100%",
                    backgroundColor: "#0a2239",
                    transition: "width 0.3s ease, border-radius 0.3s ease",
                  }}
                >
                  <ul>
                    {service.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
