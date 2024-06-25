import React, { useEffect, useState } from "react";
import { List, Card, Skeleton, message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../../API/Blog-Api"; 
import "bootstrap/dist/css/bootstrap.min.css";

const dummyImage = "https://via.placeholder.com/300"; // Placeholder image URL

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogData = await fetchBlogs();
        // Sort blogs by date in descending order
        const sortedBlogs = blogData.sort(
          (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  const handleCardClick = (id) => {
    console.log("Blog ID clicked:", id); // Debugging log
    navigate(`/blog/${id}`);
  };

  return (
    <div className="container mt-5 ">
      <div className="section-header">
        <h2 className="section-title">Blog Posts</h2>
        <div className="section-line">
          <span className="section-dot"></span>
        </div>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={blogs}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                className="blog-card"
                cover={<img alt="example" src={dummyImage} />}
                onClick={() => handleCardClick(item.id)}
              >
                <div className="blog-meta">
                  <h2 className="blog-title">{item.title}</h2>
                  <p className="blog-description">
                    {item.content.substring(0, 100)}...
                  </p>
                  <p className="blog-date">
                    <small>
                      {new Date(item.date_posted).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Blog;
