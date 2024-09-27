import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  initialFormData,
  industryOptions,
  companySizeOptions,
  aiApplicationsOptions,
  complianceRequirementsOptions,
} from "../components/data/comapnayInfo.data";

const backend = process.env.REACT_APP_BACKEND_URL;

const ContactInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [companyInfoChecked, setCompanyInfoChecked] = useState(false); // To prevent rerendering multiple times
  const [isCompanyInfoFilled, setIsCompanyInfoFilled] = useState(false); // To store if company info is already filled
  const [loading, setLoading] = useState(true); // Use 'loading' state to control the Skeleton

  // Check if company info is already filled
  useEffect(() => {
    const checkCompanyInfo = async () => {
      try {
        const response = await axios.get(
          `${backend}questions/company_info/check`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200 && response.data.company_info_exists) {
          setIsCompanyInfoFilled(true);
          navigate("/regulation"); // Redirect if info exists
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking company info", error);

        setLoading(false);
      } finally {
        setCompanyInfoChecked(true); // Ensure that the form is rendered if data is not found
      }
    };

    checkCompanyInfo();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: checked
        ? [...prevFormData[field], value]
        : prevFormData[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend}questions/company_info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/regulation");
      } else {
        console.error("Failed to submit company info", response.data);
      }
    } catch (error) {
      console.error("Error submitting company info", error);
    }
  };

  if (!companyInfoChecked || isCompanyInfoFilled) {
    return null;
  }
  if (loading) {
    return (
      <Content style={{ padding: "24px" }}>
        <Skeleton active />
      </Content>
    );
  }

  return (
    <Content>
      <Container className="bg-white shadow-lg border rounded p-5 my-4">
        <h1 className="text-center mb-5">Company Information</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  as="select"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Size</Form.Label>
                <Form.Control
                  as="select"
                  name="company_size"
                  value={formData.company_size}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Company Size</option>
                  {companySizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Annual Revenue</Form.Label>
                <Form.Control
                  type="text"
                  name="annual_revenue"
                  value={formData.annual_revenue}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Locations</Form.Label>
                <Form.Control
                  type="text"
                  name="locations"
                  value={formData.locations}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Position</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_position"
                  value={formData.contact_position}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>AI Vendors</Form.Label>
                <Form.Control
                  type="text"
                  name="ai_vendors"
                  value={formData.ai_vendors}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>AI Applications</Form.Label>
            <Row>
              {aiApplicationsOptions.map((option) => (
                <Col md={4} key={option}>
                  <Form.Check
                    type="checkbox"
                    label={option}
                    value={option}
                    checked={formData.ai_applications.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, "ai_applications")}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Compliance Requirements</Form.Label>
            <Row>
              {complianceRequirementsOptions.map((option) => (
                <Col md={4} key={option}>
                  <Form.Check
                    type="checkbox"
                    label={option}
                    value={option}
                    checked={formData.compliance_requirements.includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(e, "compliance_requirements")
                    }
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>AI Governance</Form.Label>
            <Row>
              <Col md={6}>
                <Form.Check
                  type="radio"
                  name="ai_governance"
                  label="Yes"
                  value="true"
                  checked={formData.ai_governance === "true"}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="radio"
                  name="ai_governance"
                  label="No"
                  value="false"
                  checked={formData.ai_governance === "false"}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>
          <div className="text-center mt-4">
            <Button variant="primary" size="lg" type="submit">
              Start Survey
            </Button>
          </div>
        </Form>
      </Container>
    </Content>
  );
};

export default ContactInfo;
