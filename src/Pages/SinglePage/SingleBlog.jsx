import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../../Component/BlogService/BlogService";

const SingleBlog = () => {
  const { slug } = useParams();
  const { getBlog } = BlogService();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(slug);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container col-12 mt-3 mb-3 open-sans-font">
      {/* the image */}
      <img
        className="col-12"
        style={{ maxHeight: "450px", objectFit: "cover" }}
        src={blog.image}
        alt=""
      />
      {/* Heading of the blog */}
      <h1 className="mt-2 merriweather-font mt-3">{blog.title}</h1>

      {/* writer name */}
      <div
        className="col-12 d-flex justify-content-between inter-font"
        style={{ color: "#074543ff" }}
      >
        <div className="d-flex gap-1 ">
          <p>By </p>
          <p style={{ fontWeight: "bold" }}> {blog.user.name}</p>
        </div>

        {/* Publishing Date */}
        <div className="d-flex gap-1">
          Published in{" "}
          <p style={{ fontWeight: "bold" }}>
            {new Date(blog.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="mb-3 inter-font" style={{ color: "#074543ff" }}>
        {/* Category Tag */}
        <div
          className="d-inline-flex align-items-center"
          style={{
            backgroundColor: "black",
            borderRadius: "6px",
            padding: "4px 10px",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              color: "white",
              margin: 0,
              fontSize: "14px",
            }}
          >
            {blog.category.category_name}
          </p>
        </div>
      </div>

      {/* the blog */}
      <div style={{ fontSize: "18px" }}>{blog.content}</div>
    </div>
  );
};

export default SingleBlog;
