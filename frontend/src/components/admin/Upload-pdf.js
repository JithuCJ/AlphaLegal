import React, { useState } from "react";
import {
  Layout,
  Typography,
  Upload,
  Button,
  Space,
  Card,
  Progress,
  Row,
  Col,
  Input,
} from "antd";
import {
  UploadOutlined,
  CloudUploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const { Content } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

const backend = process.env.REACT_APP_BACKEND_URL;

const AdminPage = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const handleUpload = async () => {
    if (fileList.length === 0) {
      toast.error("No file selected for upload.");
      return;
    }

    if (!title) {
      toast.error("Please provide a title for the questions.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    fileList.forEach((file) => {
      formData.append("pdf", file);
    });

    setUploading(true);

    try {
      const response = await axios.post(
        `${backend}/questions/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setFileList([]);
      setTitle("");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Upload failed";
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    multiple: false, // Since it's for a single PDF upload
    showUploadList: true,
  };

  return (
    <Layout>
      <Content
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          className="p-4 shadow"
          style={{
            width: "100%",
            maxWidth: 800,
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
          }}
        >
          <Title level={3} style={{ marginBottom: 20 }}>
            Upload Questions PDF
          </Title>
          <Input
            placeholder="Enter title for the questions"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <Dragger
            {...uploadProps}
            style={{ padding: "20px", borderRadius: 10 }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drop your file here or click to browse</p>
            <p className="ant-upload-hint">Maximum file size: 4 MB</p>
          </Dragger>
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", marginTop: 20 }}
          >
            {fileList.map((file) => (
              <Row key={file.uid} justify="space-between" align="middle">
                <Col span={16}>{file.name}</Col>
                <Col span={4}>
                  <Progress percent={100} status="active" />
                </Col>
              </Row>
            ))}
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={handleUpload}
              loading={uploading}
              disabled={fileList.length === 0 || !title}
              style={{ width: "100%" }}
            >
              {uploading ? "Uploading" : "Upload PDF"}
            </Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default AdminPage;
