import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Button } from "antd";
const { Content } = Layout;
const { Title } = Typography;

function ScorePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: 50 };

  const getRating = (score) => {
    if (score >= 75 && score <= 100)
      return { text: "Excellent", color: "green" };
    if (score >= 60 && score < 75) return { text: "Good", color: "green" };
    if (score >= 45 && score < 60)
      return { text: "Average", color: "lightgreen" };
    return { text: "Poor", color: "red" };
  };

  const rating = getRating(score);

  return (
    <Layout>
      <Content>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Title>Your Score</Title>
          <p style={{ fontSize: "48px", color: rating.color }}>{score}</p>
          <h2 style={{ color: rating.color }}>Rating: {rating.text}</h2>
          <Button
            type="primary"
            onClick={() => navigate("/dashboard")}
            style={{ marginTop: "20px" }}
          >
            Go to Dashboard
          </Button>
        </div>
      </Content>
    </Layout>
  );
}

export default ScorePage;
