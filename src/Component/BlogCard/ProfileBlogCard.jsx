/* eslint-disable react/no-unescaped-entities */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row"; // সরাসরি react-bootstrap থেকে import করলাম
import "../BlogCard/BlogCard.css";
import BlogService from "./../BlogService/BlogService";

// eslint-disable-next-line react/prop-types
function ProfileBlogCard({ title, description, imageUrl, slug }) {
  const { deleteblog } = BlogService();
  const defaultImage =
    "https://www.thewall360.com/uploadImages/ExtImages/images1/def-638240706028967470.jpg";

  const handleDelete = () => {
    deleteblog(slug)
      .then(() => {
        alert("Blog Deleted Successfully!");
        window.location.reload(); //j page ache seta refresh hobe;
      })
      .catch((err) => {
        console.error("Faild to delete blog: ", err);
        alert("Failed to delete blog");
      });
  };

  return (
    <Card
      style={{ width: "100%" }}
      className="d-flex flex-row align-items-stretch"
    >
      {/* বাম পাশে ইমেজ */}
      <Card.Img
        style={{ maxWidth: "200px", objectFit: "cover" }}
        src={imageUrl ? imageUrl : defaultImage}
      />

      {/* মাঝখানে টেক্সট */}
      <Card.Body className="d-flex flex-column justify-content-center text-start px-3">
        <Card.Title className="text-truncate-2">{title}</Card.Title>
        <Card.Text className="text-truncate-3">{description}</Card.Text>
      </Card.Body>

      {/* ডান পাশে বাটনগুলো */}
      <div className="d-flex flex-column justify-content-between p-3">
        <Button
          style={{
            background: "linear-gradient(to right, #7d9722, #cbd394)",
            border: "none",
            marginBottom: "10px",
          }}
          onClick={() => window.open(url, "_blank")}
        >
          Read More
        </Button>
        <Button variant="primary" className="mb-2">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default ProfileBlogCard;
