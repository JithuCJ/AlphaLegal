import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Radio, Input, Select } from "antd";

import { Layout } from "antd";

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

function Regulation() {
  const [form] = Form.useForm();
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question:
        "Has your organization established a dedicated governance framework for overseeing AI system data management?",
      type: "yes/no",
    },
    {
      id: 2,
      question:
        "Explain the measures your organization has implemented to identify and mitigate bias in AI algorithms.",
      type: "text",
    },
    {
      id: 3,
      question:
        "Is there encryption in place to secure data processed by the AI system?",
      type: "yes/no",
    },
    {
      id: 4,
      question:
        "Does your AI system incorporate mechanisms to obtain explicit consent from users for data processing?",
      type: "yes/no",
    },
    {
      id: 5,
      question:
        "How does your organization address the need for explainability and interpretability in AI systems?",
      type: "select",
      options: [
        "Feature importance analysis",
        "Model-agnostic interpretability tools",
        "Both a and b",
        "None of the above",
      ],
    },
    {
      id: 6,
      question:
        "Can users easily exercise their rights, such as data access, correction, and deletion, within your AI system?",
      type: "yes/no",
    },
    {
      id: 7,
      question:
        "How does your organization handle cross-border data transfers?",
      type: "select",
      options: [
        "Standard contractual clauses",
        "Binding corporate rules",
        "Adequacy decisions",
        "All of the above",
      ],
    },
    {
      id: 8,
      question:
        "Describe the steps your organization takes to address ethical concerns associated with AI, such as privacy and bias.",
      type: "text",
    },
    {
      id: 9,
      question:
        "Does your organization have a documented incident response plan specifically tailored for AI-related incidents?",
      type: "yes/no",
    },
    {
      id: 10,
      question:
        "Is there a designated individual or team responsible for the decisions and actions of the AI system?",
      type: "yes/no",
    },
    // Add more questions as needed
  ];

  const handleSubmit = (values) => {
    let count = 0;
    Object.keys(values).forEach((key) => {
      if (values[key] === "Yes") {
        count++;
      }
    });
    setScore(`${count}/${questions.filter((q) => q.type === "yes/no").length}`);
  };

  return (
    <Layout>
      <Content style={{ padding: "" }}>
        <Container className=" shadow-sm  bg-white border">
          <div className="container m-4">
            <Form form={form} onFinish={handleSubmit}>
              {questions.map((q) => (
                <Form.Item
                  key={q.id}
                  name={`question_${q.id}`}
                  label={q.question}
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  {/* <div className="row">
                    <label>{q.question}</label>
                    
                  
                  </div> */}

                  {q.type === "yes/no" ? (
                    <Radio.Group>
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Radio.Group>
                  ) : q.type === "text" ? (
                    <TextArea rows={3} />
                  ) : (
                    <Select>
                      {q.options.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <div>Score: {score}</div>
            </Form>
          </div>
        </Container>
      </Content>
    </Layout>
  );
}

export default Regulation;
