/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AuthUser from "../../Component/Auth/AuthUser";
import CategoryService from "../../Component/CategoryService/CategoryService";

const WriteBlog = () => {
  // ekhane const gulo thakbe, return er moddhe na
  const { http, getToken } = AuthUser();
  const { getCategories } = CategoryService();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("draft");

  //Load Categories for dropdown
  useEffect(() => {
    getCategories()
      .then((res) => {
        // যদি response object এর ভিতরে array থাকে, ধরো res.data.data
        const cats = Array.isArray(res.data) ? res.data : res.data.data;
        setCategories(cats || []);
        // if (res.data.length > 0) setcategoryId(res.data[0].id); //auto select first category
      })
      .catch((err) => console.error("Error fetching categories: ", err));
  }, []);

  const submitForm = (e) => {
    e.preventDefault(); // page reload hobe na
    if (!title || !content || !categoryId) {
      alert("please fill all required fields!");
      return;
    }

    const payload = {
      title,
      content,
      category_id: categoryId,
      image,
      is_published: status === "published",
    };

    http
      .post("blogs", payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }) //payload is all tha datas
      .then((res) => {
        console.log(res.data);
        alert("Your blog has been uploaded successfully!");
        setTitle("");
        setContent("");
        setImage("");
        setStatus("draft");
      })
      .catch((err) => {
        console.error(
          "Blog uploading error:",
          err.response?.data || err.message
        );
        alert("Your blog has not been uploated");
      });
  };
  const handleSubmit = () => {
    console.log(getToken());
  };

  return (
    <Container className="mt-4 mb-5">
      <h1 className="mb-4 text-success">Write a Blog</h1>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            placeholder="Write your blog here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryId || ""}
            onChange={(e) => setcategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success" onClick={handleSubmit}>
          Submit Blog
        </Button>
      </Form>
    </Container>
  );
};

export default WriteBlog;
