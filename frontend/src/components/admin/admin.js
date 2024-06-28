import React from "react";
import { Layout, Card, Row, Col } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Container } from "react-bootstrap";
const { Header, Content } = Layout;

//  card data
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
  {
    title: "Blog",
    icon: <EditOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
    path: "/admin-blog",
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

      <Container>
        <Content className="mt-5">
          <Row gutter={[16, 16]}>
            {cardData.map((card, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                className="text-center"
              >
                <Card
                  title={card.title}
                  bordered={false}
                  hoverable
                  onClick={() => handleNavigation(card.path)}
                >
                  {card.icon}
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
