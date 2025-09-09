import { useState, useEffect } from "react";
import BlogService from "./../BlogService/BlogService";
import "../TabBarBlogs/TabBarBLogs.css";
import CategoryBlogCard from "../BlogCard/CategoryBlogCard/CategoryBlogCard";

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
      <div className="d-flex gap-0 ">
        <button
          className={`btn ${
            activeCategory === "All" ? "activeButton" : "inActiveButton"
          }`}
          onClick={() => setActiveCategory("All")}
        >
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`btn ${
              activeCategory === cat ? "activeButton" : "inActiveButton"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-100 bg-primary mb-2" style={{ height: ".5px" }}></div>

      {/* Blogs list */}
      <div className="row g-3">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-muted">
            No blogs found in this category
          </p>
        ) : (
          [...filteredBlogs].reverse().map((blog) => (
            <div key={blog.id} className="col-12 col-md-6">
              <CategoryBlogCard
                title={blog.title}
                content={blog.content}
                image={blog.image}
                slug={blog.slug}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabBarBlogs;
