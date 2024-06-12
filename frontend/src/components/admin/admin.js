import React from "react";
import { Layout, Card, Row, Col } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const { Header, Content } = Layout;

// Array of card data
const cardData = [
  {
    title: "Upload Questions PDF",
    icon: <UploadOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
    path: "/upload",
  },
  {
    title: "Customer - ID",
    icon: <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
    path: "/userstable",
  },
  {
    title: "Question",
    icon: (
      <QuestionCircleOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
    ),
    path: "/questions",
  },
];

const AdminDashboard = () => {
  // Handle card click navigation
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <Layout>
      <Header className="text-center bg-light py-3">
        <h1>Welcome to Admin Dashboard</h1>
      </Header>
      <Content className="container mt-5">
        <Row gutter={[32, 32]} justify="center">
          {cardData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={24}>
              <Card
                title={card.title}
                bordered={false}
                hoverable
                className="text-center"
                onClick={() => handleNavigation(card.path)}
              >
                {card.icon}
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
