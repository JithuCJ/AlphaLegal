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
  Progress,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
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
  const [progress, setProgress] = useState(0); // New state for progress

  const { customerId, fetchUserProgress, userDetails } = useUser(0);
  const { username, email, customer_id } = userDetails;
  const navigate = useNavigate();

  // CustomerId
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

  // user Progress
  useEffect(() => {
    async function fetchProgress() {
      try {
        const progressData = await fetchUserProgress();
        const targetProgress = progressData.progress_percentage;

        // Smoothly increment progress
        let currentProgress = 0;
        const interval = setInterval(() => {
          if (currentProgress < targetProgress) {
            currentProgress += 1; // Increment by 1
            setProgress(currentProgress);
          } else {
            clearInterval(interval); // Stop incrementing when target is reached
          }
        }, 20); // Set interval time (adjust for smoothness)
      } catch (error) {
        console.error("There was an error fetching the user progress!", error);
      }
    }
    fetchProgress();
  }, [fetchUserProgress, customerId]);

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
                  {/* User Information */}

                  <div className="user-info">
                    <Row>
                      <Col span={8} className="text-center">
                        <Avatar size={64} icon={<UserOutlined />} />
                      </Col>
                      <Col span={12} className="text-center ">
                        <h4 className="text-2xl text-white mb-2 ">{username}</h4>
                        <p className="text-white text-lg">{email}</p>
                        {/* <p className="text-white">{customer_id}</p> */}
                      </Col>
                    </Row>
                  </div>

                  {/* User Progress */}

                  <div className="user-progress mb-4">
                    <div className="flex flex-col items-center mb-2">
                      {/* Display the percentage on top */}
                      <p className="text-white text-lg mb-0">
                        {progress}% Completed
                      </p>
                      {/* Progress bar */}
                      <div className="w-3/4">
                        <Progress
                          percent={progress}
                          showInfo={false} // Hide default percentage inside the bar
                          strokeColor={{
                            from: "#6EE7B7",
                            to: "#34D399",
                          }}
                          trailColor="#2d3748" // Set a darker trail color
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Titles */}
                  <hr className="text-white" />
                  <Title className="p-2 text-white" level={3}>
                    Questions Titles
                  </Title>
                  <ul className="titles-list list-unstyled">
                    {[...new Set(questions.map((q) => q.title))].map(
                      (title, index) => (
                        <li
                          key={index}
                          className={`title-item p-2 rounded ${
                            selectedTitle === title
                              ? "bg-primary text-white"
                              : "text-white"
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
