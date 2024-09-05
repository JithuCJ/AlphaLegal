import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const backend = process.env.REACT_APP_BACKEND_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backend}/forgot-password`, {
        email,
      });
      toast.success(response.data.message);
      setError("");
    } catch (err) {
      toast.error(err.response.data.message);
      setMessage("");
    }
  };

  return (
    <Row className="justify-content-center align-items-center pt-5">
      <Col xs={12} md={6} lg={4}>
        <div className="forgot-password-container">
          <h2 className="text-center">Forgot Password</h2>
          {message && (
            <Alert message={message} type="success" showIcon className="mb-3" />
          )}
          {error && (
            <Alert message={error} type="error" showIcon className="mb-3" />
          )}
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
