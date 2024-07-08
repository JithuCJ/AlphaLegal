import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import {
  Button,
  Form,
  Radio,
  Layout,
  Pagination,
  Row,
  Col,
  Typography,
} from "antd";
import { useUser } from "../store/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../CSS/Regulation.css"; // Import the custom CSS

const { Content } = Layout;
const { Title } = Typography;

const QUESTIONS_PER_PAGE = 10;
const backend = process.env.REACT_APP_BACKEND_URL;

function Regulation() {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [score, setScore] = useState(null);
  const { customerId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`${backend}questions/questions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched Questions: ", response.data); // Debug statement
        setQuestions(response.data.questions);
        setFilteredQuestions(response.data.questions);
      } catch (error) {
        console.error("There was an error fetching the questions!", error);
      }
    }
    fetchQuestions();
  }, []);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const answers = Object.keys(values)
        .map((key) => {
          const [prefix, id] = key.split("_");
          return {
            question_id: id,
            answer: values[key] || "",
          };
        })
        .filter((answer) => answer.answer.trim() !== "");

      if (customerId && answers.length > 0) {
        const response = await axios.post(
          `${backend}questions/save`,
          { answers },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Answers saved successfully!", response.data);
        toast.success("Answers saved successfully!");
      } else if (!customerId) {
        console.error("Customer ID is missing!");
        toast.error("Customer ID is missing!");
      } else {
        console.error("No answers to save!");
        toast.error(
          "There was an error saving your answers. Please try again."
        );
      }
    } catch (error) {
      console.error("There was an error saving the answers!", error);
      toast.error("There was an error saving your answers. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const answers = Object.keys(values)
        .map((key) => {
          const [prefix, id] = key.split("_");
          return {
            question_id: id,
            answer: values[key] || "",
          };
        })
        .filter((answer) => answer.answer.trim() !== "");

      if (customerId && answers.length > 0) {
        const response = await axios.post(
          `${backend}questions/submit`,
          {
            answers,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Answers submitted successfully!", response.data);
        const score = response.data.total_score;
        setScore(score);
        toast.success("Answers submitted successfully!");
        navigate("/score", { state: { score } }); // Navigate to ScorePage with the score
      } else if (!customerId) {
        console.error("Customer ID is missing!");
        toast.error("Customer ID is missing!");
      } else {
        console.error("No answers to submit!");
        toast.error(
          "There was an error submitting your answers. Please try again."
        );
      }
    } catch (error) {
      console.error("There was an error submitting the answers!", error);
      toast.error(
        "There was an error submitting your answers. Please try again."
      );
    }
  };

  const indexOfLastQuestion = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(
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

  const handleTitleClick = (title) => {
    setSelectedTitle(title);
    setFilteredQuestions(questions.filter((q) => q.title === title));
    setCurrentPage(1);
  };

  return (
    <Layout>
      <Content>
      
        <div className="custom-container shadow-sm bg-white ">
          <div className="scrollable-questions">
            <Row>

              {/* Title and Progress   */}
              <Col xs={24} md={6}>
                <div className="titles-container">

                <hr/>
                  <Title className="p-2" style={{ color: "white" }} level={3}>
                  Questions Titles
                  </Title>
                  <ul className="titles-list">
                    {[...new Set(questions.map((q) => q.title))].map(
                      (title, index) => (
                        <li
                          key={index}
                          className={`title-item ${
                            selectedTitle === title ? "selected" : ""
                          }`}
                          onClick={() => handleTitleClick(title)}
                        >
                          {title}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Col>

              {/* Question Colume */}
              <Col className="p-3" xs={24} md={18}>
                <div className="questions-container">
                  <Form form={form}>
                    {currentQuestions.map((q) => (
                      <div key={q.id} className="question-item">
                        <Title level={4}>
                          {q.question}{" "}
                          {q.attempted && (
                            <span style={{ color: "blue" }}>✔</span>
                          )}
                        </Title>
                        <Form.Item
                          name={`question_${q.id}`}
                          initialValue={q.answer || ""}
                        >
                          <Radio.Group disabled={q.attempted}>
                            <Row gutter={[36, 36]}>
                              {q.options.split("\n").map((option, index) => (
                                <Col span={12} key={index}>
                                  <Radio value={option}>{option}</Radio>
                                </Col>
                              ))}
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    ))}
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
          {/* <hr /> */}

          {/* Pagination  */}
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={QUESTIONS_PER_PAGE}
              total={filteredQuestions.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              itemRender={itemRender}
            />
            <Button
              type="primary"
              className="save-button"
              onClick={handleSave}
              disabled={!customerId}
            >
              Save
            </Button>
            {currentPage ===
              Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE) && (
              <Button
                type="primary"
                className="submit-button"
                onClick={handleSubmit}
                disabled={!customerId}
              >
                Submit
              </Button>
            )}
            {score !== null && (
              <div className="score-display">
                <Title level={4}>Your Score: {score}</Title>
              </div>
            )}
          </div>
        </div>
        {/* </Container> */}
      </Content>
    </Layout>
  );
}

export default Regulation;
