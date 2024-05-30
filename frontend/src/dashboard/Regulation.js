import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import {
  Button,
  Form,
  Radio,
  Input,
  Layout,
  Pagination,
  Modal,
  Row,
  Col,
  Typography,
} from "antd";
import { useUser } from "../store/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const QUESTIONS_PER_PAGE = 5;
const backend = process.env.REACT_APP_BACKEND_URL;
function Regulation() {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [score, setScore] = useState(null);
  const { customerId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backend}questions/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  }, []);

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
        .filter((answer) => answer.answer.trim() !== "");

      if (customerId && answers.length > 0) {
        axios
          .post(
            `${backend}questions/save`,
            { customerId, answers },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log("Answers saved successfully!", response.data);
            toast.success("Answers saved successfully!");
            setScore(response.data.total_score); // Set the score state
          })
          .catch((error) => {
            console.error("There was an error saving the answers!", error);
            toast.error(
              "There was an error saving your answers. Please try again."
            );
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

  const handleSubmit = () => {
    form.validateFields().then((values) => {
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
        axios
          .post(
            `${backend}questions/submit`,
            {
              customerId,
              answers,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log("Answers submitted successfully!", response.data);
            const score = response.data.total_score;
            setScore(response.data.total_score); // Set the score state
            navigate("/score", { state: { score } });
          })
          .catch((error) => {
            console.error("There was an error submitting the answers!", error);
            toast.error(
              "There was an error submitting your answers. Please try again."
            );
          });
      } else if (!customerId) {
        console.error("Customer ID is missing!");
        toast.error("Customer ID is missing!");
      } else {
        console.error("No answers to submit!");
        toast.error(
          "There was an error submitting your answers. Please try again."
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
                <div key={q.id} style={{ marginBottom: "24px" }}>
                  <Title level={4}>
                    {" "}
                    {q.question}{" "}
                    {q.attempted && <span style={{ color: "blue" }}>✔</span>}
                  </Title>
                  <Form.Item
                    name={`question_${q.id}`}
                    initialValue={q.answer || ""}
                  >
                    <Radio.Group disabled={q.attempted}>
                      <Row gutter={[16, 16]}>
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
              <hr />
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Pagination
                  current={currentPage}
                  pageSize={QUESTIONS_PER_PAGE}
                  total={questions.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  itemRender={itemRender}
                />
                <Button
                  type="primary"
                  style={{
                    marginTop: "20px",
                    width: "10rem",
                    height: "2.8rem",
                  }}
                  className="fs-6"
                  onClick={handleSave}
                  disabled={!customerId}
                >
                  Save
                </Button>
                {currentPage ===
                  Math.ceil(questions.length / QUESTIONS_PER_PAGE) && (
                  <Button
                    type="primary"
                    style={{
                      marginTop: "20px",
                      marginLeft: "10px",
                      width: "10rem",
                      height: "2.8rem",
                    }}
                    className="fs-6"
                    onClick={handleSubmit}
                    disabled={!customerId}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Container>
      </Content>
    </Layout>
  );
}

export default Regulation;
