import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import "../style.css";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      axios
        .post("http://localhost:5000/register", {
          username: name,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("Registration successful", response.data);
          alert("Registration Successful!");
        })
        .catch((error) => {
          console.error("Registration error", error);
          alert(
            "Registration Failed! Error: " +
              (error.response?.data?.message || "Unknown Error")
          );
        });
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "26rem" }} className="shadow">
        <Card.Body className="mb-4">
          <h2 className="text-center mb-4">Register</h2>
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

            <Button variant="primary" type="submit" className="w-100 mt-2">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterForm;
