import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Typography, Tag, Button, Divider } from 'antd';

const { Paragraph } = Typography;

const backend = process.env.REACT_APP_BACKEND_URL;


const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${backend}/job/get_jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Divider orientation="left">Job Openings</Divider>
      <Row gutter={16}>
        {jobs.map((job) => (
          <Col span={8} key={job.id} style={{ marginBottom: '20px' }}>
            <Card
              title={job.position}
              extra={<Link to={`/jobs/${job.id}`}>View Details</Link>}
              style={{ width: '100%' }}
            >
              <Paragraph>
                <Tag color="blue">{job.job_type}</Tag>
                <Tag color="green">{job.job_category}</Tag>
                <span style={{ marginLeft: 10 }}>{job.location}</span>
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobList;
