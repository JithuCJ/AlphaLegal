import React, { useContext, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";
import { useUser } from "../store/UserContext";
import { toast } from "react-toastify";

const backend = process.env.REACT_APP_BACKEND_URL;

function LoginForm() {
  const [customer_id, setCustomer_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { storeToken } = useContext(AuthContext);
  const { setCustomerId } = useUser();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/login`, { customer_id, password })
      .then((response) => {
        console.log("Login successful", response.data);
        storeToken(response.data.access_token);
        setCustomerId(response.data.customer_id);
        navigate("/dashboard");
        toast("Login successful!");
      })
      .catch((error) => {
        console.error("Login error", error);
        toast("Login failed!");
      });
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "24rem" }} className="shadow">
        <Card.Body className="mb-4">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User ID"
                value={customer_id}
                onChange={(e) => setCustomer_id(e.target.value)}
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
