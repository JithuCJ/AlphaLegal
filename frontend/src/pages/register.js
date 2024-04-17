// RegisterForm.js
import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import "../style.css";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      setMessage("Please use your organization email to register.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:5000/register", {
        username: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Registration successful", response.data);
        setMessage(
          "Registration successful! Please check your email to confirm."
        );
      })
      .catch((error) => {
        console.error("Registration error", error);
        setMessage(
          "Registration Failed! Error: " +
            (error.response?.data?.message || "Token Error")
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "28rem" }} className="shadow">
        <Card.Body className="mb-3">
          <h2 className="text-center mb-4">Register</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Registering…" : "Register"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterForm;
