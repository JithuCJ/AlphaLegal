import React, { useState } from "react";
import { Form, Input, Button, Layout, Typography, Card } from "antd";
import { useUser } from "../store/UserContext";
import { toast } from "react-toastify";
// import "../styles/Profile.css"; // Assuming you have a custom CSS file for additional styles

const { Content } = Layout;
const { Title } = Typography;

function Profile() {
  const [form] = Form.useForm();
  const { customerId, updateUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const { newCustomerId, newPassword } = values;
      await updateUser(newCustomerId, newPassword);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Error updating user: " + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content className="profile-content">
        <div className="profile-container">
          <Card className="profile-card">
            <Title level={2} className="profile-title">
              Profile Management
            </Title>
            <Form form={form} onFinish={handleUpdate} layout="vertical">
              <Form.Item
                label="New Customer ID"
                name="newCustomerId"
                rules={[
                  {
                    required: true,
                    message: "Please input your new customer ID!",
                  },
                ]}
              >
                <Input placeholder="Enter your new customer ID" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter your new password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

export default Profile;
