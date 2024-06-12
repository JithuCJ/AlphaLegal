import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Space, Tag, message, Card, Input, Form, Row, Col } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const backend = process.env.REACT_APP_BACKEND_URL;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend}admin/customers`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${backend}admin/delete-customer`, {
        data: { customer_id: record.customer_id },
      });
      if (response.status === 200) {
        message.success("User deleted successfully");
        setUsers(users.filter((user) => user.customer_id !== record.customer_id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    }
  };

  const handleEdit = (record) => {
    console.log("Edit record:", record);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
      sorter: (a, b) => a.customer_id - b.customer_id,
      ellipsis: true,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ellipsis: true,
    },
    {
      title: "Email Confirmed",
      dataIndex: "email_confirmed",
      key: "email_confirmed",
      render: (text) => (
        <Tag color={text ? "green" : "volcano"}>
          {text ? "Confirmed" : "Not Confirmed"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.customer_id.toString().includes(searchText) ||
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card title="Users" className="shadow" style={{ margin: "20px auto",  maxWidth: "100%" }}>
      <Row gutter={16}>
        <Col span={12}>
          <Input.Search
            placeholder="Search by ID, username, or email"
            onSearch={handleSearch}
            style={{ marginBottom: "20px" }}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="customer_id"
        pagination={{ pageSize: 5 }}
        bordered
        size="middle"
        loading={users.length === 0}
        title={() => <h3>User List</h3>}
      />
    </Card>
  );
};

export default UsersTable;
