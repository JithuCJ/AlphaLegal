import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogById } from "../../API/Blog-Api"; 
import {
  Skeleton,
  message,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const { Title, Paragraph, Text } = Typography;

export const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      if (id) {
        try {
          const blogData = await fetchBlogById(id);
          setBlog(blogData);
        } catch (error) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (loading) {
    return <Skeleton active />;
  }

  if (!blog) {
    return <div className="container mt-5">Blog not found</div>;
  }

  const renderParagraphs = (content) => {
    return content.split("\n").map((paragraph, index) => (
      <Paragraph
        key={index}
        style={{ fontSize: "16px", lineHeight: "1.8", textAlign: "justify" }}
      >
        {paragraph}
      </Paragraph>
    ));
  };

  return (
    <div className="container mt-5">
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18}>
          <Button
            onClick={() => navigate("/blog")}
            className="mb-4"
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: "20px" }}
          >
            Back to Blogs
          </Button>
          <Card
            bordered={false}
            className="shadow-sm p-4"
            style={{ borderRadius: "10px" }}
          >
            <Title level={2} className="mb-3">
              {blog.title}
            </Title>
            <Divider />
            {renderParagraphs(blog.content)}
            <Divider />
            <Paragraph>
              <Text type="secondary">
                Posted on: {new Date(blog.date_posted).toLocaleDateString()}
              </Text>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogDetail;
