// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Container from "./../../../node_modules/react-bootstrap/esm/Container";
// import { Col } from "react-bootstrap";
import AuthUser from "../../Component/Auth/AuthUser";
import ProfileBlogCard from "./../../Component/BlogCard/ProfileBlogCard";
import BlogService from "./../../Component/BlogService/BlogService";
import { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = AuthUser();
  const { getYourBlog } = BlogService();

  useEffect(() => {
    getYourBlog(user.id)
      .then((res) => {
        console.log("API response:", res.data); // এখানে দেখো কী আসছে
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        alert("Failed to fetch your blogs.");
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <div className="d-flex">
        {/* laft side */}
        <div
          className="d-flex flex-column pt-4 align-items-center text-center px-3"
          style={{ background: "#914e36ff", height: "100vh" }}
        >
          <img
            className="img-fluid mb-3"
            style={{
              maxWidth: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            }}
            src="https://writingstudio.com/wp-content/uploads/2021/07/article-writers-for-hire.jpg"
            alt="Profile"
          />

          <p className="text-light">{user.name}</p>
          <div className="col-12 d-flex flex-column align-items-start p-3 rounded">
            <p style={{ fontWeight: "bold" }} className="text-white mb-1">
              Email
            </p>
            <p className="text-light mb-3">{user.email}</p>

            <p style={{ fontWeight: "bold" }} className="text-white mb-1">
              User Id
            </p>
            <p className="text-light">{user.id}</p>
          </div>
        </div>

        {/* right side */}

        <Container className="p-4">
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bold", fontSize: "27px" }}>My Blogs</p>
            <Link to="/writing-blog">
              <button
                className="btn"
                style={{
                  background: "#1e90ff",
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                  transition: "all 0.2s",
                }}
              >
                Write a Blog
              </button>
            </Link>
          </div>
          <div
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
            className="d-flex flex-column gap-3"
          >
            {loading ? (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "50px",
                  color: "green",
                }}
              >
                Contents are loading...
              </p>
            ) : blogs.length === 0 ? (
              <div className="d-flex align-items-center flex-column">
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "50px",
                    color: "#555555",
                  }}
                >
                  You haven’t shared any blogs yet! ✍️
                  <br />
                  Click the button above to write your first amazing blog.
                </p>
                <Link to="/writing-blog">
                  <button
                    className="btn"
                    style={{
                      background: "#1e90ff",
                      color: "white",
                      padding: "10px 20px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                      transition: "all 0.2s",
                    }}
                  >
                    Write a Blog
                  </button>
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {blogs.map((blog) => (
                  <Col key={blog.id}>
                    <ProfileBlogCard
                      title={blog.title}
                      description={blog.content}
                      imageUrl={blog.image}
                      slug={blog.slug}
                      // url={`blog/${blog.slug}`}
                    />
                  </Col>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfilePage;
