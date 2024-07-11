import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Content } from "antd/es/layout/layout";

const initialFormData = {
  company_name: "",
  industry: "",
  company_size: "",
  annual_revenue: "",
  locations: "",
  contact_name: "",
  contact_position: "",
  contact_email: "",
  contact_phone: "",
  ai_applications: [],
  compliance_requirements: [],
  ai_governance: "",
  ai_vendors: "",
};

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
];
const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001-10000",
  "10001+",
];
const aiApplicationsOptions = [
  "Machine Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Robotics",
  "Predictive Analytics",
];
const complianceRequirementsOptions = [
  "GDPR",
  "HIPAA",
  "CCPA",
  "SOX",
  "PCI DSS",
];

const ContactInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const checkCompanyInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/questions/company_info/check",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200 && response.data.company_info_exists) {
          navigate("/regulation");
        }
      } catch (error) {
        console.error("Error checking company info", error);
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
        "http://localhost:5000/questions/company_info",
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

  return (
    <Content>
      <Container
        style={{
          maxHeight: "87vh",
          overflowY: "auto",

          padding: "20mm",
          margin: "auto",
          backgroundColor: "white",
          color: "#333",

          fontSize: "12pt",
          lineHeight: "1.6",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        className="bg-white shadow-lg border rounded p-5 my-4"
      >
        <h1
          className=" text-center"
          style={{ fontSize: "28pt", fontWeight: "bold" }}
        >
          Company Information
        </h1>
        <Form onSubmit={handleSubmit}>
          {Object.keys(initialFormData).map((key) => {
            if (key === "industry") {
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    as="select"
                    name={key}
                    value={formData[key]}
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
              );
            }

            if (key === "company_size") {
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>Company Size</Form.Label>
                  <Form.Control
                    as="select"
                    name={key}
                    value={formData[key]}
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
              );
            }

            if (key === "ai_applications") {
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>AI Applications</Form.Label>
                  {aiApplicationsOptions.map((option) => (
                    <Form.Check
                      key={option}
                      type="checkbox"
                      label={option}
                      value={option}
                      checked={formData[key].includes(option)}
                      onChange={(e) => handleCheckboxChange(e, key)}
                    />
                  ))}
                </Form.Group>
              );
            }

            if (key === "compliance_requirements") {
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>Compliance Requirements</Form.Label>
                  {complianceRequirementsOptions.map((option) => (
                    <Form.Check
                      key={option}
                      type="checkbox"
                      label={option}
                      value={option}
                      checked={formData[key].includes(option)}
                      onChange={(e) => handleCheckboxChange(e, key)}
                    />
                  ))}
                </Form.Group>
              );
            }

            if (key === "ai_governance") {
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>AI Governance</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name={key}
                      label="Yes"
                      value={true}
                      checked={formData[key] === true}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name={key}
                      label="No"
                      value={false}
                      checked={formData[key] === false}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              );
            }

            return (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>
                  {key
                    .replace(/_/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </Form.Label>
                <Form.Control
                  type={key.includes("email") ? "email" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            );
          })}
          <Button variant="primary" size="lg" type="submit">
            Start Survey
          </Button>
        </Form>
      </Container>
    </Content>
  );
};

export default ContactInfo;
