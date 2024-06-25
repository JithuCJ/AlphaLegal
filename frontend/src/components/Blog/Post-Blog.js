import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
 Button,
  Card,
  Avatar,
  Spin,
  Space,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { addBlog } from "../../API/Blog-Api"; 
import { toast } from "react-toastify";

const { TextArea } = Input;

export const Post_Blog = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addBlog(values);
      toast.success("Blog post added successfully!");
      form.resetFields();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // admin page to Post a latest Blogs
    <Layout className="layout">
      <Card className="post-card shadow">
        <Space align="center" className="post-header">
          <Avatar size={48} icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <h2 className="post-title">Post a Blog</h2>
            <p className="post-description">
              Share your thoughts and experiences.
            </p>
          </Space>
        </Space>
        <Form
          form={form}
          name="post_blog"
          onFinish={onFinish}
          layout="vertical"
          className="form"
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter the blog title" }]}
          >
            <Input
              prefix={<EditOutlined />}
              placeholder="Enter the title of your blog"
            />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Please enter the blog content" },
            ]}
          >
            <TextArea placeholder="Enter the content of your blog" rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? <Spin /> : "Post Blog"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Post_Blog;
