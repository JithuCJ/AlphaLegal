import axios from "axios";

const backend = process.env.REACT_APP_BACKEND_URL;

export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${backend}/blog/blog/${id}`);
    return response.data.blog;
  } catch (error) {
    throw new Error("Failed to fetch blog details");
  }
};

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${backend}/blog/get_blogs`);
    return response.data.blogs;
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};

export const addBlog = async (blogData) => {
  try {
    await axios.post(`${backend}/blog/add_blog`, blogData);
  } catch (error) {
    throw new Error("Failed to add blog post. Please try again.");
  }
};
