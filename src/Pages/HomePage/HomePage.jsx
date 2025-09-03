import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from "../../Component/BlogCard/BlogCard";
import { useEffect, useState } from "react";
import BlogList from "./../../Component/BlogService/BlogList";

const HomePage = () => {
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(
  //       "https://newsapi.org/v2/everything?q=tesla&from=2025-08-03&sortBy=publishedAt&apiKey=c7b7d2ff7a2e4fb4a206420287afe06e"
  //     );
  //     const data = await res.json();
  //     setArticles(data.articles);
  //   };
  //   fetchData();
  // }, []);

  return (
    <Container className="mt-5">
      <BlogList />
    </Container>
  );
};

export default HomePage;
