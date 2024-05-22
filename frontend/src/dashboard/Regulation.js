import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Button, Form, Radio, Input, Select, Layout, Pagination } from "antd";
import { useUser } from "../store/UserContext";

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const QUESTIONS_PER_PAGE = 9;
const backend = process.env.REACT_APP_BACKEND_URL;

function Regulation() {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { customerId } = useUser();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/questions/questions`)
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  }, []);

  useEffect(() => {
    console.log("Customer ID from context:", customerId); // Log the customer ID from context
  }, [customerId]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      const answers = Object.keys(values).map((key) => {
        const [prefix, id] = key.split('_');
        return {
          question_id: id,
          answer: values[key] || "",
        };
      });

     
      if (customerId) {
        axios
          .post(`http://localhost:5000/questions/save`, { customerId, answers })
          .then((response) => {
            console.log("Answers saved successfully!");
          })
          .catch((error) => {
            console.error("There was an error saving the answers!", error);
          });
      } else {
        console.error("Customer ID is missing!");
      }
    });
  };

  const indexOfLastQuestion = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemRender = (page, type, originalElement) => {
    if (type === "page") {
      return Math.abs(currentPage - page) < 2 ? originalElement : null;
    }
    return originalElement;
  };

  return (
    <Layout>
      <Content>
        <Container className="shadow-sm bg-white border">
          <div className="container m-4">
            <Form form={form}>
              {currentQuestions.map((q) => (
                <Form.Item
                  key={q.id}
                  name={`question_${q.id}`}
                  label={q.question}
                  rules={[]}
                >
                  {q.options && q.options.includes("Yes/no") ? (
                    <Radio.Group>
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Radio.Group>
                  ) : q.options ? (
                    <Select>
                      {q.options.split("\n").map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <TextArea rows={3} />
                  )}
                </Form.Item>
              ))}
              <Pagination
                current={currentPage}
                pageSize={QUESTIONS_PER_PAGE}
                total={questions.length}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                itemRender={itemRender}
              />
              <Form.Item>
                <div className="question-btn">
                  <Button
                    type="primary"
                    style={{ width: "6rem", height: "2.3rem" }}
                    className="mt-3"
                    onClick={handleSave}
                    disabled={!customerId} // Disable save button if customerId is missing
                  >
                    Save
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Container>
      </Content>
    </Layout>
  );
}

export default Regulation;
