// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Container from "./../../../node_modules/react-bootstrap/esm/Container";
// import { Col } from "react-bootstrap";
import AuthUser from "../../Component/Auth/AuthUser";
import ProfileBlogCard from "./../../Component/BlogCard/ProfileBlogCard";
import BlogService from "./../../Component/BlogService/BlogService";
import { useState } from "react";
import { Col } from "react-bootstrap";
const ProfilePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = AuthUser();
  const { getYourBlog } = BlogService();

  useEffect(() => {
    getYourBlog(user.id)
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        alert("Faield ot fetch your blogs.");
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
          <p style={{ fontWeight: "bold", fontSize: "27px" }}>Your Blogs</p>
          <div
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
            className="d-flex flex-column gap-3"
          >
            {blogs.length === 0 ? (
              <p>You did not write any blog</p>
            ) : (
              <div className="d-flex flex-column gap-2">
                {blogs.map((blog) => (
                  <Col key={blog.id}>
                    <ProfileBlogCard
                      title={blog.title}
                      description={blog.content}
                      imageUrl={blog.image}
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
