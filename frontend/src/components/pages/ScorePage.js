import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Button, Card } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

function ScorePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: null };

  const getRating = (score) => {
    if (score >= 75 && score <= 100)
      return { text: "Excellent", color: "green" };
    if (score >= 60 && score < 75) return { text: "Good", color: "green" };
    if (score >= 45 && score < 60)
      return { text: "Average", color: "lightgreen" };
    return { text: "Poor", color: "red" };
  };
  if (score === null) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Content>
          <Card
            className="shadow-sm bg-white border p-5"
            style={{ textAlign: "center" }}
          >
            <Title level={2}>No Score Available</Title>
            <Button
              type="primary"
              onClick={() => navigate("/dashboard")}
              style={{ marginTop: "20px" }}
            >
              Go to Dashboard
            </Button>
          </Card>
        </Content>
      </Layout>
    );
  }

  const rating = getRating(score);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content>
        <Card
          className="shadow-sm bg-white border p-5"
          style={{ textAlign: "center" }}
        >
          <Title level={2}>Your Score</Title>
          <Text
            style={{
              fontSize: "48px",
              color: rating.color,
              fontWeight: "bold",
            }}
          >
            {score}
          </Text>
          <h2 style={{ color: rating.color }}>Rating: {rating.text}</h2>
          <Button
            type="primary"
            onClick={() => navigate("/dashboard")}
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              width: "10rem",
              height: "2.8rem",
            }}
            className="fs-6"
          >
            Go to Dashboard
          </Button>
        </Card>
      </Content>
    </Layout>
  );
}

export default ScorePage;
