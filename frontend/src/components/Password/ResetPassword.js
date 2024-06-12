import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Alert, Card } from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/reset-password/${token}`,
        { new_password: newPassword }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="reset-password-card">
        <h2 className="text-center">Reset Password</h2>

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="New Password" required>
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
