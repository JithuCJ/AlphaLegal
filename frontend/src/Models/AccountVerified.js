import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const AccountVerified = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "28rem" }} className="shadow rounded">
        <Card.Body className="text-center p-4">
          <h2 className="mb-4 text-success">Account Verified Successfully !</h2>
          <h5 className="mb-3 text-muted">
            Kindly refer to the email for your User ID
          </h5>
          <p className="mb-4 text-secondary">You can now log in 👤</p>
          <Button href="/login" variant="primary" className="px-4">
            Go to Login
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountVerified;
