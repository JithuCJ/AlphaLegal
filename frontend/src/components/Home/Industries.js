import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "../../CSS/home/about.css"; // Verify the path is correct
import ContactSection from "./ContactSection";

// Data for the cards
const industries = [
  {
    title: "Healthcare",
    description:
      "With the growing adoption of AI in healthcare, ensuring compliance with regulatory standards is crucial. We assist healthcare organizations in developing AI systems that meet the requirements of healthcare regulators, such as privacy and security regulations (e.g., HIPAA), clinical validation, and ethical considerations.",
    imageUrl: "healthcare.jpg",
  },
  {
    title: "Finance",
    description:
      "AI is transforming the financial sector, enabling advanced data analytics, fraud detection, and personalized customer experiences. We help financial institutions navigate regulatory challenges related to risk management, algorithmic transparency, anti-money laundering (AML), and customer data protection (e.g., GDPR and CCPA).",
    imageUrl: "healthcare.jpg",
  },
  {
    title: "Retail And E-Commerce",
    description:
      "In the era of AI-driven personalization and smart retail solutions, compliance with consumer protection laws, data privacy regulations, and fairness principles is essential. Our firm assists retail and e-commerce companies in implementing AI technologies while addressing legal and ethical concerns surrounding customer data, pricing algorithms, and targeted marketing.",
    imageUrl: "healthcare.jpg",
  },

  //

  {
    title: "Transportation And Logistics",
    description:
      "Autonomous vehicles, predictive maintenance, and intelligent supply chain management are revolutionizing the transportation and logistics industry. We support companies in adhering to safety standards, privacy regulations, and liability frameworks associated with AI-powered transportation systems.",
    imageUrl: "healthcare.jpg",
  },

  {
    title: "Manufacturing",
    description:
      "AI applications in manufacturing, such as predictive maintenance, quality control, and optimization, offer significant benefits. Our experts guide manufacturers in complying with industry-specific regulations, including worker safety, product quality standards, and intellectual property protection.",
    imageUrl: "healthcare.jpg",
  },

  {
    title: "Public Sector",
    description:
      "AI adoption in government and public sector organizations brings various challenges, including ethical considerations, transparency, and accountability. We assist public entities in formulating AI governance frameworks, ensuring fair and unbiased AI algorithms, and maintaining compliance with legal and regulatory requirements.",
    imageUrl: "healthcare.jpg",
  },
];

const Industries = () => {
  return (
    <>
      <header
        className="header text-center"
        style={{ color: "#6ec1e4", padding: "2rem" }}
      >
        <Container>
          <h1 className="display-3">Industries</h1>
          <br />
          <p>
            Industries are the backbone of any economy, and in the rapidly
            evolving field of artificial intelligence, they play a crucial role
            in shaping the future. At Alpha Legal, we recognize the diverse and
            transformative impact that AI technologies have across various
            sectors. Our expertise lies in understanding and addressing the
            unique regulatory challenges faced by different industries, enabling
            businesses to leverage AI while ensuring compliance, ethics, and
            responsible practices.
          </p>
        </Container>
      </header>
      <Container className="">
        <Row>
          {industries.map((industry, index) => (
            <Col md={4} sm={12} key={index} className="mb-5">
              <Card className="h-100">
                {" "}
                {/* Ensures that all cards are of full container height */}
                <Card.Img
                  variant="top"
                  src={industry.imageUrl}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <h3>
                    {" "}
                    <b> {industry.title} </b>{" "}
                  </h3>
                  <Card.Text>{industry.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <ContactSection />
    </>
  );
};

export default Industries;
