import React, { useState, useEffect } from "react";
import BlogService from "./../BlogService/BlogService";

const TabBarBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const { getBlogs } = BlogService();

  useEffect(() => {
    getBlogs()
      .then((res) => {
        setBlogs(res.data);

        // Unique category list তৈরি
        const uniqueCategories = [
          ...new Set(res.data.map((blog) => blog.category?.category_name)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Error fetching blog", err);
        alert("Failed to fetch blog");
      });
  }, []);

  // ফিল্টার করা ব্লগ
  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category?.category_name === activeCategory);

  return (
    <div className="container mt-4">
      {/* Category Tab Bar */}
      <div className="d-flex gap-3 mb-4">
        <button
          className={`btn ${
            activeCategory === "All" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveCategory("All")}
        >
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`btn ${
              activeCategory === cat ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs list */}
      <div className="d-flex flex-column gap-3">
        {filteredBlogs.length === 0 ? (
          <p>No blogs found in this category</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-3 border rounded shadow-sm"
              style={{ background: "#fff" }}
            >
              <h5>{blog.title}</h5>
              <p>{blog.content.slice(0, 120)}...</p>
              <small style={{ color: "gray" }}>
                Category: {blog.category?.category_name}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabBarBlogs;
