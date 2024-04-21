import React, { useContext, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios"; // Import axios to make HTTP requests
import "../style.css";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { storeToken } = useContext(AuthContext); // Use storeToken from AuthContext

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", { email, password })
      .then((response) => {
        console.log("Login successful", response.data);
        storeToken(response.data.token); // Store the token on successful login
        navigate("/dashboard");
        alert("Login successful!");
      })
      .catch((error) => {
        console.error("Login error", error);
        alert("Login failed!");
      });
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "24rem" }} className="shadow">
        <Card.Body className="mb-4">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginForm;
