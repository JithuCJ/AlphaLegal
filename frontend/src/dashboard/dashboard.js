import React from "react";
import { Container, Button } from "react-bootstrap";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Layout className="bg-white shadow-sm border p-5">
      <Content className="" style={{ padding: "10px", overflow: "auto" }}>
        <Container className="text-center shadow-sm border bg-white p-3 mb-5 bg-white rounded">
          <div className="p-md-5 p-sm-3">
            <h1 className="mb-4">
              Welcome To AI Infrastructure Audit Questionnaire!
            </h1>
            <p className="lead">
              We appreciate your commitment to ensuring compliance and
              regulatory adherence in your company's AI endeavors. This
              questionnaire is designed to comprehensively assess your AI
              infrastructure, identifying strengths, weaknesses, and areas for
              improvement.
            </p>
            <p className="lead">
              Your input will play a crucial role in enhancing the integrity,
              transparency, and ethical standards of your AI systems. By
              completing this questionnaire thoroughly, you're taking proactive
              steps to mitigate risks and ensure that your AI initiatives align
              with regional laws and industry best practices.
            </p>
            <p className="lead">
              Thank you for your participation. Let's work together to foster
              trust, accountability, and responsible AI innovation.
            </p>
            <p className="mt-4">Warm regards, Team AlphaLegal</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/regulation")}
              className="mt-4"
            >
              Regulation Survey
            </Button>
          </div>
        </Container>
      </Content>
    </Layout>
  );
}

export default Dashboard;
