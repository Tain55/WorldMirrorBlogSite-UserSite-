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
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ maxHeight: "150px", objectFit: "cover" }}
        src={imageUrl ? imageUrl : defaultImage}
      />
      <Card.Body>
        <Card.Title className="text-truncate-2">{title}</Card.Title>
        <Card.Text className="text-truncate-3">{description}</Card.Text>
        <Row className="mt-2">
          <Button
            style={{
              background: "linear-gradient(to right, #7d9722,  #cbd394)",
              border: "none",
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
