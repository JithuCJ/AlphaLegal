import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Modal } from "react-bootstrap";
import "../style.css";
import axios from "axios";
import { toast } from "react-toastify";

const backend = process.env.REACT_APP_BACKEND_URL;

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("");

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !email.endsWith(
        "@gmail.com" && "yahoo.com" && "outlook.com" && "hotmail.com" && ""
      )
    ) {
      setMessage("Please use your organization email to register.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    axios
      .post(`${backend}register`, {
        username: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Registration successful", response.data);
        setMessage(
          "Registration successful! Please check your email to confirm."
        );
        setShowModal(true);
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

  const verifyToken = () => {
    // verify token
    axios
      .post(`${backend}confirm-token`, { token })
      .then((response) => {
        setMessage("Account verified successfully!");
        setShowModal(false);
        toast.success("Account verified successfully!");
      })
      .catch((error) => {
        setMessage("Verification failed. Please try again.");
      });
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "28rem" }} className="shadow">
        <Card.Body className="mb-3">
          <h2 className="text-center mb-4">Register</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={onSubmit}>
            {/* Name Input */}
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

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Confirm Password Input */}
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

            {/* Submit Button */}
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

      {/* Token Verification Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Verification Token</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter token sent to your email"
                value={token}
                onChange={handleTokenChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={verifyToken}>
            Verify Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
