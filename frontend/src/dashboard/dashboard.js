import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();
  const handleAgreement = () => {
    navigate("/terms");
  };
  return (
    <Content>
      <Container>
        <Card className="shadow-lg border-0 bg-white p-4 mb-5 rounded">
          <Row className="p-md-5 p-sm-3">
            <Col>
              <h1 className="mb-4 fs-1 text-center text-primary">Welcome</h1>
              <p className="lead text-secondary">
                Thank you for taking the time to participate in our AI
                infrastructure audit. At <strong>AlphaLegal</strong>, we are
                committed to helping businesses like yours ensure their AI
                systems are reliable, transparent, unbiased, user-centric,
                secure, and trustworthy.
              </p>
              <p className="lead text-secondary">
                This questionnaire is designed to provide a comprehensive
                assessment of your current AI practices, helping you identify
                strengths and areas for improvement. Additionally, we will help
                you check your compliance with relevant AI regulations and
                standards, ensuring your AI infrastructure meets industry and
                regional requirements.
              </p>
              <p className="lead text-secondary">
                The process should take approximately 1 hour to complete. Please
                be as thorough and accurate as possible in your responses. Your
                feedback will remain confidential and will only be used to
                generate your personalized audit report.
              </p>
              <p className="mt-4 text-center text-secondary">
                Warm regards, Team AlphaLegal
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAgreement}
                  className="mt-4"
                >
                  Proceed
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </Content>
  );
}

export default Dashboard;
