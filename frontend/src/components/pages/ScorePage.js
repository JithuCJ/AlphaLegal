import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Button, Card } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Container } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Content } = Layout;
const { Title, Text } = Typography;

function ScorePage() {
  const navigate = useNavigate();
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/questions/score",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setScore(response.data.score);
      } catch (error) {
        console.error("Error fetching the score:", error);
      }
    };

    fetchScore();
  }, []);

  const getRating = (score) => {
    if (score >= 75 && score <= 100)
      return { text: "Excellent", color: "green" };
    if (score >= 60 && score < 75) return { text: "Good", color: "green" };
    if (score >= 45 && score < 60)
      return { text: "Average", color: "lightgreen" };
    return { text: "Poor", color: "red" };
  };

  const noScoreData = {
    labels: ["No Score"],
    datasets: [
      {
        label: "No Score",
        data: [1],
        backgroundColor: ["red"],
        hoverBackgroundColor: ["red"],
      },
    ],
  };

  const noScoreOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: () => "No Score Available",
        },
      },
    },
  };

  const rating = getRating(score);

  const data = {
    labels: ["Score", ""],
    datasets: [
      {
        label: "Score",
        data: [score, 100 - score],
        backgroundColor: [rating.color, "#C83F49"],
        hoverBackgroundColor: [rating.color, "  #C83F49"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const labelIndex = context.dataIndex;
            const value = context.dataset.data[labelIndex];
            return `${context.label}: ${value}%`;
          },
        },
      },
    },
  };

  return (

    <Container >
    <Layout
    className="bg-white shadow-sm border "    >
      <Content >
        <Card
          className="shadow-sm bg-white border p-5"
          style={{ textAlign: "center", borderRadius: "10px" }}
        >
          <Title level={2}>Your Score</Title>
          <div
            style={{
              position: "relative",
              height: "300px",
              marginBottom: "20px",
            }}
          >
            <Pie data={data} options={options} />
          </div>
          <Text
            style={{
              fontSize: "48px",
              color: rating.color,
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            {score}%
          </Text>
          <h2 style={{ color: rating.color, marginTop: "20px" }}>
            Rating: {rating.text}
          </h2>
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
    </Container>
  );
}

export default ScorePage;
