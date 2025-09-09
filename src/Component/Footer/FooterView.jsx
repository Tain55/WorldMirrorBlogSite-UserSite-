import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/Images/worldMirror_logo_colorful.png";

const FooterView = () => {
  return (
    <footer
      style={{
        backgroundColor: "#F6EEE3",
        padding: "40px 0 20px 0",
        marginTop: "40px",
      }}
    >
      <Container>
        <Row className="mb-4">
          {/* Logo and About */}
          <Col md={4} sm={12} className="mb-4">
            <img
              style={{ maxHeight: "80px", marginBottom: "15px" }}
              src={logo}
              alt="Logo"
            />
            <p style={{ color: "#333", fontSize: "14px" }}>
              World Mirror is your trusted blog platform where you can read,
              share, and explore trending stories across various categories.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} sm={6} className="mb-4">
            <h5 style={{ marginBottom: "15px", fontWeight: "600" }}>
              Quick Links
            </h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/" style={{ color: "#333", textDecoration: "none" }}>
                Home
              </Link>
              <Link
                to="/about"
                style={{ color: "#333", textDecoration: "none" }}
              >
                About
              </Link>
              <Link
                to="/categories"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Categories
              </Link>
              <Link
                to="/contact"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Contact
              </Link>
            </div>
          </Col>

          {/* Social Media */}
          <Col md={4} sm={6} className="mb-4">
            <h5 style={{ marginBottom: "15px", fontWeight: "600" }}>
              Follow Us
            </h5>
            <div className="d-flex gap-3 fs-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook color="#4267B2" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter color="#1DA1F2" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram color="#E1306C" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin color="#0077B5" />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <p style={{ fontSize: "13px", color: "#555" }}>
              © {new Date().getFullYear()} World Mirror. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterView;
