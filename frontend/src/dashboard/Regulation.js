import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Button, Form, Radio, Input, Select, Layout, Pagination } from "antd";
import { useUser } from "../store/UserContext";
import { toast } from "react-toastify";

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
  // const [saveSuccess, setSaveSuccess] = useState(false);
  // const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    axios
      .get(`${backend}questions/questions`)
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  }, []);

  useEffect(() => {
    console.log("Customer ID from context:", customerId);
  }, [customerId]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      const answers = Object.keys(values)
        .map((key) => {
          const [prefix, id] = key.split("_");
          return {
            question_id: id,
            answer: values[key] || "",
          };
        })
        .filter((answer) => answer.answer.trim() !== ""); // Filter out unanswered questions

      console.log("Customer ID before save:", customerId);
      console.log("Filtered Answers:", answers); // Log to verify filtered answers

      if (customerId && answers.length > 0) {
        axios
          .post(`${backend}questions/save`, { customerId, answers })
          .then((response) => {
            console.log("Answers saved successfully!");
           
            toast.success("Answers saved successfully!");
          })
          .catch((error) => {
            console.error("There was an error saving the answers!", error);
           
            toast("There was an error saving your answers. Please try again.");
          });
      } else if (!customerId) {
        console.error("Customer ID is missing!");
       toast.error("Customer ID is missing!");
      } else {
        console.error("No answers to save!");
       
        toast.error(
          "There was an error saving your answers. Please try again."
        );
      }
    });
  };

  const indexOfLastQuestion = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

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
                    disabled={!customerId}
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
