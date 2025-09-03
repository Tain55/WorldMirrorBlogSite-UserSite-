import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../../Component/BlogService/BlogService";

const SingleBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await BlogService().getBlog(slug);
        setBlog(res.data);
      } catch (err) {
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
    <div className="container col-12 mt-3 mb-3">
      <img
        className="col-12"
        style={{ maxHeight: "450px", objectFit: "cover" }}
        src={blog.image}
        alt=""
      />
      <h1 className="mt-2">{blog.title}</h1>
      <div className="col-12 d-flex justify-content-between">
        <div className="d-flex gap-1 ">
          <p>By </p>
          <p style={{ fontWeight: "bold" }}> {blog.user.name}</p>
        </div>
        <div className="d-flex gap-1">
          In the category
          <p style={{ fontWeight: "bold" }}> {blog.category.category_name}</p>
        </div>
      </div>
      <div className="d-flex gap-1 mb-3" style={{ lineHeight: "0px" }}>
        Published in:{" "}
        <p style={{ fontWeight: "bold" }}>
          {new Date(blog.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div>{blog.content}</div>
    </div>
  );
};

export default SingleBlog;
