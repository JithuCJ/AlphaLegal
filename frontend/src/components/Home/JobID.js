import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Tag,
  Space,
  Spin,
  Form,
  Input,
  Button,
} from "antd";
import "../../CSS/careers.css";

const { Title, Paragraph } = Typography;
const backend = process.env.REACT_APP_BACKEND_URL;

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${backend}/job/get_jobs/${id}`);
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job details", error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  if (!job)
    return <Spin size="large" tip="Loading..." style={{ marginTop: 50 }} />;

  return (
    <div className="job-details-container">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <div className="job-details-content">
            <Card
              title={<Title level={1}>{job.position}</Title>}
              bordered={false}
              style={{
                width: "100%",
                marginTop: 20,
              }}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Divider
                    orientation="left"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    Job Information
                  </Divider>
                  <Paragraph style={{ fontSize: "16px" }}>
                    <strong>Description:</strong> {job.description}
                  </Paragraph>
                  <Paragraph style={{ fontSize: "16px" }}>
                    <strong>Responsibilities:</strong> {job.responsibility}
                  </Paragraph>
                  <Paragraph style={{ fontSize: "16px" }}>
                    <strong>Qualifications:</strong> {job.qualification}
                  </Paragraph>
                  <Paragraph style={{ fontSize: "16px" }}>
                    <strong>Benefits:</strong> {job.benefits}
                  </Paragraph>
                  <Divider
                    orientation="left"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    Job Details
                  </Divider>
                  <Space
                    direction="horizontal"
                    size="large"
                    style={{ display: "flex" }}
                  >
                    <Tag color="#53a2be" style={{ fontSize: "16px" }}>
                      <strong>Job Type:</strong> {job.job_type}
                    </Tag>
                    <Tag color="#53a2be" style={{ fontSize: "16px" }}>
                      <strong>Job Category:</strong> {job.job_category}
                    </Tag>
                    <Tag color="#53a2be" style={{ fontSize: "16px" }}>
                      <strong>Location:</strong> {job.location}
                    </Tag>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title={<Title level={3}>Apply for this Position</Title>}
            bordered={false}
            style={{
              marginTop: 20,
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>
              <Form.Item
                label="Position"
                name="position"
                initialValue={job.position}
                rules={[
                  { required: true, message: "Please enter the position!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Cover Letter"
                name="coverLetter"
                rules={[
                  {
                    required: true,
                    message: "Please enter your cover letter!",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Your Cover Letter" />
              </Form.Item>
              <Form.Item
                label="Resume Link (Google Drive)"
                name="resumeLink"
                rules={[
                  { required: true, message: "Please enter your resume link!" },
                ]}
              >
                <Input placeholder="Google Drive Link" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetails;
