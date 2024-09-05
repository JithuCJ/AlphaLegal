import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, message, Space } from "antd";
import "../../CSS/admin.css";

const { TextArea } = Input;
const { Title } = Typography;

const JobForm = () => {
  const [jobData, setJobData] = useState({
    position: "",
    description: "",
    responsibility: "",
    qualification: "",
    benefits: "",
    job_type: "",
    job_category: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/job/add_job",
        jobData
      );
      message.success(response.data.message || "Job added successfully!");
    } catch (error) {
      console.error("Error adding job:", error);
      message.error(
        "Failed to add job. Please check the server logs for details."
      );
    }
  };

  return (
    <div className="form-container">
      <Title level={2} className="form-title">
        Add Job
      </Title>
      <Form layout="vertical" onFinish={handleSubmit} className="job-form">
        <Form.Item label="Position" required>
          <Input
            name="position"
            value={jobData.position}
            onChange={handleChange}
            placeholder="Enter job position"
          />
        </Form.Item>
        <Form.Item label="Description" required>
          <TextArea
            rows={4}
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Enter job description"
          />
        </Form.Item>
        <Form.Item label="Responsibility" required>
          <TextArea
            rows={4}
            name="responsibility"
            value={jobData.responsibility}
            onChange={handleChange}
            placeholder="Enter job responsibilities"
          />
        </Form.Item>
        <Form.Item label="Qualification" required>
          <Input
            name="qualification"
            value={jobData.qualification}
            onChange={handleChange}
            placeholder="Enter job qualifications"
          />
        </Form.Item>
        <Form.Item label="Benefits" required>
          <Input
            name="benefits"
            value={jobData.benefits}
            onChange={handleChange}
            placeholder="Enter job benefits"
          />
        </Form.Item>
        <Form.Item label="Job Type" required>
          <Input
            name="job_type"
            value={jobData.job_type}
            onChange={handleChange}
            placeholder="Enter job type"
          />
        </Form.Item>
        <Form.Item label="Job Category" required>
          <Input
            name="job_category"
            value={jobData.job_category}
            onChange={handleChange}
            placeholder="Enter job category"
          />
        </Form.Item>
        <Form.Item label="Location" required>
          <Input
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="Enter job location"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JobForm;
