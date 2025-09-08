/* eslint-disable react/no-unescaped-entities */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row"; // সরাসরি react-bootstrap থেকে import করলাম
import "../BlogCard/BlogCard.css";

// eslint-disable-next-line react/prop-types
function BlogCard({ title, description, imageUrl, url }) {
  const defaultImage =
    "https://www.thewall360.com/uploadImages/ExtImages/images1/def-638240706028967470.jpg";

  return (
    <Card
      style={{
        width: "18rem",
        boxShadow: " 0px 5px 12px rgba(90, 90, 90, 0.31)",
      }}
    >
      <Card.Img
        style={{ maxHeight: "140px", objectFit: "cover" }}
        src={imageUrl ? imageUrl : defaultImage}
      />
      <Card.Body>
        <Card.Title className="text-truncate-2 roboto-font">{title}</Card.Title>
        <Card.Text
          style={{ fontWeight: "350" }}
          className="text-truncate-3 inter-font"
        >
          {description}
        </Card.Text>
        <Row className="mt-2 inter-font">
          <Button
            style={{
              background: "linear-gradient(to right, #48C3EB, #718EDD)",
              border: "none",
              fontWeight: "500",
            }}
            onClick={() => window.open(url, "_blank")}
          >
            Read More
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
