import { useEffect, useState } from "react";
import BlogService from "./BlogService";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import BlogCard from "../BlogCard/BlogCard";

const BlogList = () => {
  const { getBlogs } = BlogService();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.error("Error fatching Blogs:", err);
        alert("Faield to fetch Blogs from server.");
      });
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="inter-font mb-3">All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <Row className="g-3">
          {blogs
            .slice()
            .reverse()
            .map((blog) => (
              <Col key={blog.id} xs={12} sm={12} md={6} lg={4}>
                <BlogCard
                  title={blog.title}
                  description={blog.content}
                  imageUrl={blog.image}
                  url={`blog/${blog.slug}`}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default BlogList;
