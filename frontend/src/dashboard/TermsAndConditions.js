import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreement = () => {
    navigate("/contactinfo");
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <Content>
      <Container
        className="bg-white shadow-lg border rounded "
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
      >
        <div>
          <h1
            className="mb-4 text-center"
            style={{ fontSize: "28pt", fontWeight: "bold" }}
          >
            Terms and Conditions
          </h1>
          <div>
            <p className="lead" style={{ fontWeight: "bold" }}>
              Before you begin, please take a moment to review our Terms and
              Conditions. These terms outline the rules and regulations for
              using our questionnaire and are designed to ensure a clear
              understanding of our mutual responsibilities.
            </p>
            <p className="lead" style={{ fontWeight: "bold" }}>
              By accessing and using this questionnaire, you agree to comply
              with and be bound by these Terms and Conditions. They are here to
              protect both your interests and ours, ensuring a fair and
              transparent process. If you do not agree with any part of these
              terms, please do not proceed with the questionnaire.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Acceptance of Terms</h5>
            <p>
              By accessing and using this questionnaire, you agree to comply
              with and be bound by these Terms and Conditions.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Purpose of the Questionnaire</h5>
            <p>
              This questionnaire is designed to assess your company's AI
              infrastructure and compliance with relevant regulations.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Confidentiality and Data Use</h5>
            <p>
              All information provided will remain confidential and will only be
              used for the purposes of generating your audit report. We will not
              share your information with third parties without your consent.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Accuracy of Information</h5>
            <p>
              You agree to provide accurate and truthful information to the best
              of your knowledge.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Disclaimer</h5>
            <p>
              The audit results and recommendations provided are based on the
              information you supply and should be used as guidance only.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Limitation of Liability</h5>
            <p>
              AlphaLegal is not liable for any damages arising from the use or
              inability to use the audit questionnaire.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Changes to Terms</h5>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be posted on this page.
            </p>
            <h5 style={{ fontWeight: "bold" }}>User Conduct</h5>
            <p>
              Users agree to not use the questionnaire for any unlawful purpose
              or in any way that could harm AlphaLegal or its partners.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Termination of Access</h5>
            <p>
              AlphaLegal reserves the right to terminate access to the
              questionnaire for any user who violates these terms.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Intellectual Property</h5>
            <p>
              All content and materials provided through the questionnaire are
              the intellectual property of AlphaLegal and are protected by
              applicable laws.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Governing Law</h5>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of [Your Country/Region], without regard
              to its conflict of law principles.
            </p>
            <h5 style={{ fontWeight: "bold" }}>Contact Information</h5>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at contact@alphalegal.ai.
            </p>
            <Form.Check
              type="checkbox"
              label="I have read and agree to the Terms and Conditions."
              id="agreement"
              className="mt-4"
              onChange={handleCheckboxChange}
            />
            <Button
              variant="primary"
              size="lg"
              className="mt-4"
              onClick={handleAgreement}
              disabled={!isAgreed}
            >
              Begin Survey
            </Button>
          </div>
        </div>
      </Container>
    </Content>
  );
}

export default TermsAndConditions;
