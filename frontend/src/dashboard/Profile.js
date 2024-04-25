import React from "react";
import { Container, Button } from "react-bootstrap";
import { Layout } from "antd";

const { Content } = Layout;

function Profile() {
  return (
    <Layout>
      <Content style={{ padding: "50px" }}>
        <Container className="text-center shadow">
          <div className="bg-light p-5 rounded">
            <h1 className="mb-4">Profile</h1>
          </div>
        </Container>
      </Content>
    </Layout>
  );
}

export default Profile;
