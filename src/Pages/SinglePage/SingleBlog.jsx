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
    <div>
      <h1>{blog.title}</h1>
      <p>
        By {blog.user.name} in {blog.category.name}
      </p>
      <div>{blog.content}</div>
    </div>
  );
};

export default SingleBlog;
