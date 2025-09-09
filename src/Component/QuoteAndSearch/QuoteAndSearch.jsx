import { Container, Row, Col } from "react-bootstrap";
import QuoteCard from "./QuoteCard/QuoteCard";
import { useState, useEffect } from "react";
import QuoteService from "../QuoteService/QuoteService";
import "./QuoteAndSearch.css"; // fade-in/out CSS
import { FiSearch } from "react-icons/fi";

const QuoteAndSearch = () => {
  const { getQuotes } = QuoteService();
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // current quote
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuotes()
      .then((response) => {
        const data = Array.isArray(response)
          ? response
          : response.data
          ? response.data
          : [];

        setQuotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quotes:", err);
        setLoading(false);
      });
  }, []);

  // cycle through quotes every 5s
  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  if (loading) return <p>Loading quotes...</p>;
  if (quotes.length === 0) return <p>No quotes available.</p>;

  const currentQuote = quotes[currentIndex];

  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        {/* Quote section */}
        <Col md={8} order={{ xs: 1, md: 0 }}>
          <div className="fade-in-out">
            <QuoteCard
              name={currentQuote.author}
              quote={currentQuote.quote}
              position={currentQuote.position}
              image={currentQuote.image}
            />
          </div>
        </Col>

        {/* Search section */}
        <Col
          md={4}
          order={{ xs: 2, md: 1 }}
          className="d-flex flex-column justify-content-between mt-3 mt-md-0"
          style={{ height: "100%" }}
        >
          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "25px",
              padding: "5px 10px",
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: "350px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "14px",
                padding: "5px",
              }}
            />
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#4979eb",
                fontSize: "18px",
              }}
            >
              <FiSearch />
            </button>
          </div>

          {/* Tagline at bottom */}
          <p
            className="d-none d-md-block"
            style={{
              fontSize: "14px",
              color: "#555",
              textAlign: "start",
              marginLeft: "10px",
              fontStyle: "italic",
              lineHeight: "1.5",
              marginBottom: "0",
            }}
          >
            {/* Inspiration awaits… */}
            Discover words that matter...
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default QuoteAndSearch;
