// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Container from "./../../../node_modules/react-bootstrap/esm/Container";
import AuthUser from "../../Component/Auth/AuthUser";
import ProfileBlogCard from "./../../Component/BlogCard/ProfileBlogCard";
import BlogService from "./../../Component/BlogService/BlogService";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../LoginPage/LoginPage.css";
import "../ProfilePage/ProfilePage.css";

const ProfilePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { user } = AuthUser();
  const [selectedCategory, setSelectedCategory] = useState();
  const { getYourBlog } = BlogService();

  useEffect(() => {
    getYourBlog(user.id)
      .then((res) => {
        console.log("API response:", res.data); // এখানে দেখো কী আসছে
        setBlogs(res.data);

        const uniqueCategories = [
          ...new Set(res.data.map((blog) => blog.category.category_name)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        alert("Failed to fetch your blogs.");
      })
      .finally(() => setLoading(false));
  }, []);

  //category er unic name save kora

  const { setToken } = AuthUser();

  const handleLogout = () => {
    setToken(null, null);
  };

  return (
    <div>
      <div className="d-flex">
        {/* laft side */}
        <div
          className="d-flex flex-column pt-4 align-items-center text-center px-3"
          style={{
            // background: "#fff6e53a",
            borderRight: "1.6px solid #06c3e461",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              padding: "1.5px", // border thickness
              background: "linear-gradient(45deg, #00b3ff, #ff00ff)", // gradient border
              display: "inline-block",
            }}
          >
            <img
              src="https://writingstudio.com/wp-content/uploads/2021/07/article-writers-for-hire.jpg"
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <p className="merriweather-font  mt-2">{user.name}</p>
          <div className="col-12 d-flex flex-column align-items-start p-3 rounded merriweather-font">
            <p style={{ fontWeight: "bold" }} className=" mb-1  ">
              Email
            </p>
            <p className=" mb-3">{user.email}</p>

            <p style={{ fontWeight: "bold" }} className=" mb-1">
              User Id
            </p>
            <p className="">{user.id}</p>
          </div>

          <Link
            className="inter-font LoginBtn"
            as="button"
            onClick={handleLogout}
            to="/"
            style={{ width: "100%", textDecoration: "none", fontSize: "15px" }}
          >
            Log Out
          </Link>
        </div>

        {/* right side */}
        <Container className="p-4">
          {/* heading and category dropdown */}
          <div className="d-flex justify-content-between">
            {/* heading */}
            <p
              className="inter-font"
              style={{ fontWeight: "bold", fontSize: "27px" }}
            >
              My Blogs
            </p>

            {/* Dropdown categories */}
            <div className="mb-3 inter-font category-filter">
              <label style={{ fontWeight: "bold", color: "#494949ff" }}>
                Filter by Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginLeft: "5px",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <IoIosArrowDown
                style={{
                  position: "absolute",
                  right: "30px",
                  pointerEvents: "none", // icon click হলে select না block করে
                  // color: "#2b2b2bff",
                  fontSize: "18px",
                }}
              />
            </div>
          </div>

          {/* the Blogs are showing bellow */}
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
                {[...blogs]
                  .reverse()
                  .filter(
                    (blog) =>
                      selectedCategory
                        ? blog.category.category_name === selectedCategory
                        : true //if nothing is selected then all the datas will be shown
                  )
                  .map((blog) => (
                    <Col key={blog.id}>
                      <ProfileBlogCard
                        title={blog.title}
                        description={blog.content}
                        imageUrl={blog.image}
                        slug={blog.slug}
                        date={new Date(blog.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                        category={blog.category.category_name}
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
