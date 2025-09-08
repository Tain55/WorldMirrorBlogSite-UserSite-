/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row"; // সরাসরি react-bootstrap থেকে import করলাম
import "../BlogCard/BlogCard.css";
import BlogService from "./../BlogService/BlogService";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin4Line } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
function ProfileBlogCard({
  category,
  title,
  description,
  imageUrl,
  slug,
  date,
}) {
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

  const handleRead = () => {
    window.open(`/blog/${slug}`);
  };
  return (
    <Card
      style={{
        width: "100%",
        cursor: "pointer",
        boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
        border: "0px",
      }}
      className="d-flex flex-row align-items-stretch mt-1"
      onClick={handleRead}
    >
      <Card.Img
        style={{ maxWidth: "200px", objectFit: "cover" }}
        src={imageUrl ? imageUrl : defaultImage}
      />

      <Card.Body className="d-flex flex-column justify-content-center text-start px-3">
        <Card.Title
          style={{ color: "#414141ff" }}
          className="text-truncate-2 roboto-font"
        >
          {title}
        </Card.Title>
        <Card.Text
          style={{ color: "#5c5c5cff" }}
          className="text-truncate-3 open-sans-font"
        >
          {description}
        </Card.Text>
        <div className="d-flex gap-2">
          <Card.Text style={{ color: "#5c5c5cff" }}>
            Published in <span style={{ fontWeight: "500" }}>{date}</span>
          </Card.Text>
          <Card.Text>
            <span
              style={{
                background: "#414141ff",
                color: "white",
                padding: "5px",
                borderRadius: "8px",
              }}
            >
              {category}
            </span>
          </Card.Text>
        </div>
      </Card.Body>

      <div className="d-flex flex-column justify-content-end gap-3 p-3">
        <RiEdit2Line
          style={{ fontSize: "18px", color: "#6fc4f9ff" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <RiDeleteBin4Line
          style={{ color: "#fc7c8fff" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete;
          }}
        />
      </div>
    </Card>
  );
}

export default ProfileBlogCard;
