import React from "react";
import { Layout, Card, Row, Col } from "antd";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
const { Header, Content } = Layout;

// Array of card data for Post Blog
const postBlogCardData = [
  {
    title: " Job Post ",
    icon: <EditOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
    path: "/jobform",
  },
];

export const Job = () => {
  // Handle card click navigation
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    // admin page to show a option a Post Blogs and Blogs
    <Layout>
      <Header className="text-center bg-light py-3">
        <h1>Job Section</h1>
      </Header>

      <Container>
        <Content className="mt-5">
          <Row gutter={[16, 16]}>
            {postBlogCardData.map((card, index) => (
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

export default Job;
