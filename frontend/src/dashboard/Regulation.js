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
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { customerId } = useUser();

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
    if (customerId) {
      axios
        .get(`${backend}questions/unanswered-questions/${customerId}`
        )
        .then((response) => {
          setQuestions(response.data.questions);
        })
        .catch((error) => {
          console.error("There was an error fetching the questions!", error);
        });
    }
  }, [customerId]);

  // const handleSave = () => {
  //   const values = form.getFieldsValue();
  //   const answers = Object.keys(values).map((key) => {
  //     const questionId = key.split("_")[1];
  //     return { question_id: questionId, answer: values[key] };
  //   });

  //   axios
  //     .post(`${backend}/questions/save-answer`, {
  //       customer_id: customerId,
  //       answers: answers,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error saving the answers!", error);
  //     });
  // };

  const handleSave = () => {
    const values = form.getFieldsValue();
    console.log("Form Values:", values);

    const answers = Object.keys(values).map((key) => {
      const questionId = key.split("_")[1];
      return { question_id: questionId, answer: values[key] };
    });

    const payload = {
      customer_id: customerId,
      answers: answers,
    };

    console.log("Payload:", payload);

    axios
      .post(`${backend}questions/save-answer`, payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the answers!", error);
      });
  };

  // pagination
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
            <Form form={form} onFinish={handleSave}>
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
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>

                  <Button onClick={handleSave}>Save</Button>
                </div>
              </Form.Item>

              {/* <div>Score: {score}</div>  */}
            </Form>
          </div>
        </Container>
      </Content>
    </Layout>
  );
}

export default Regulation;
