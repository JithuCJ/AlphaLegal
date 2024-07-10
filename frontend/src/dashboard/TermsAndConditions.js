import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreement = () => {
    navigate("/regulation");
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <Content>
      <Container
        className="bg-white shadow-lg border rounded "
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="p-md-5 p-sm-3">
          <h1 className="mb-4 text-center text-primary ">
            Terms and Conditions
          </h1>
          <div className="p-4">
            {" "}
            <p className="lead text-secondary">
              Before you begin, please take a moment to review our Terms and
              Conditions. These terms outline the rules and regulations for
              using our questionnaire and are designed to ensure a clear
              understanding of our mutual responsibilities.
            </p>
            <p className="lead text-secondary">
              By accessing and using this questionnaire, you agree to comply
              with and be bound by these Terms and Conditions. They are here to
              protect both your interests and ours, ensuring a fair and
              transparent process. If you do not agree with any part of these
              terms, please do not proceed with the questionnaire.
            </p>
            <h4 className="text-primary">Acceptance of Terms</h4>
            <p>
              By accessing and using this questionnaire, you agree to comply
              with and be bound by these Terms and Conditions.
            </p>
            <h4 className="text-primary">Purpose of the Questionnaire</h4>
            <p>
              This questionnaire is designed to assess your company's AI
              infrastructure and compliance with relevant regulations.
            </p>
            <h4 className="text-primary">Confidentiality and Data Use</h4>
            <p>
              All information provided will remain confidential and will only be
              used for the purposes of generating your audit report. We will not
              share your information with third parties without your consent.
            </p>
            <h4 className="text-primary">Accuracy of Information</h4>
            <p>
              You agree to provide accurate and truthful information to the best
              of your knowledge.
            </p>
            <h4 className="text-primary">Disclaimer</h4>
            <p>
              The audit results and recommendations provided are based on the
              information you supply and should be used as guidance only.
            </p>
            <h4 className="text-primary">Limitation of Liability</h4>
            <p>
              AlphaLegal is not liable for any damages arising from the use or
              inability to use the audit questionnaire.
            </p>
            <h4 className="text-primary">Changes to Terms</h4>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be posted on this page.
            </p>
            <h4 className="text-primary">User Conduct</h4>
            <p>
              Users agree to not use the questionnaire for any unlawful purpose
              or in any way that could harm AlphaLegal or its partners.
            </p>
            <h4 className="text-primary">Termination of Access</h4>
            <p>
              AlphaLegal reserves the right to terminate access to the
              questionnaire for any user who violates these terms.
            </p>
            <h4 className="text-primary">Intellectual Property</h4>
            <p>
              All content and materials provided through the questionnaire are
              the intellectual property of AlphaLegal and are protected by
              applicable laws.
            </p>
            <h4 className="text-primary">Governing Law</h4>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of [Your Country/Region], without regard
              to its conflict of law principles.
            </p>
            <h4 className="text-primary">Contact Information</h4>
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
              className="mt-4 d-flex justify-content-center"
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
