import React, { useEffect, useState } from "react";
import { Layout, Tabs, Form, Input, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Profile.css";
import { Container } from "react-bootstrap";
import { useUser } from "../store/UserContext";
import { toast } from "react-toastify";

const { Content } = Layout;
const { TabPane } = Tabs;

const ProfileManagement = () => {
  const [activeKey, setActiveKey] = useState("1");
  const { userDetails, updateUser } = useUser();
  const [form] = Form.useForm();
  const [securityForm] = Form.useForm();

  const formFields = [
    { label: "Name", name: "name" },
    { label: "User ID", name: "userId" },
    { label: "Email", name: "email" },
  ];

  const securityFields = [
    {
      label: "New Password",
      name: "newPassword",
      rules: [{ required: true, message: "Please enter your new password" }],
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      dependencies: ["newPassword"],
      rules: [
        { required: true, message: "Please confirm your new password" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("newPassword") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match!"));
          },
        }),
      ],
    },
  ];

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    form.setFieldsValue({
      userId: userDetails.customer_id,
      email: userDetails.email,
      name: userDetails.username,
    });
  }, [userDetails, form]);

  const handleSubmit = async (values) => {
    console.log("Submitted values: ", values);
    try {
      await updateUser(values.newPassword);
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <Container>
      <Layout className="bg-white shadow-sm border p-5">
        <Content>
          <div>
            <h2>Profile Management</h2>
          </div>
          <hr />
          <Tabs
            activeKey={activeKey}
            onChange={handleTabChange}
            tabBarGutter={30}
            tabBarStyle={{ fontSize: "18px", fontWeight: "bold" }} // Increase tab text size
          >
            {/* Profile Details */}
            <TabPane tab="Profile" key="1">
              <Form layout="vertical" form={form}>
                <div className="row">
                  {formFields.map((field, index) => (
                    <div key={index} className="col-md-6 col-12">
                      <Form.Item label={field.label} name={field.name}>
                        <Input readOnly />
                      </Form.Item>
                    </div>
                  ))}
                </div>
              </Form>
            </TabPane>

            {/* Password Update */}
            <TabPane tab="Security" key="2">
              <Form layout="vertical" form={securityForm} onFinish={handleSubmit}>
                <div className="row">
                  {securityFields.map((field, index) => (
                    <div key={index} className="col-md-6 col-12">
                      <Form.Item
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                        dependencies={field.dependencies}
                      >
                        <Input.Password placeholder={field.label} />
                      </Form.Item>
                    </div>
                  ))}
                </div>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Container>
  );
};

export default ProfileManagement;
