import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchService } from "../../Component/SearchService/SearchService";
import { FiSearch } from "react-icons/fi";
import "../SearchPage/SearchPage.css";
import SearchedBlogCard from "../../Component/Cards/SearchedBlogCard/SearchedBlogCard";
import ProfileCard from "./../../Component/Cards/ProfileCard/ProfileCard";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryFromURL = new URLSearchParams(location.search).get("q") || "";

  const [query, setQuery] = useState(queryFromURL);
  const [results, setResults] = useState({
    titleBlogs: [],
    contentBlogs: [],
    user: [],
  });
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(false);

  const fetchData = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const data = await searchService(searchQuery);
      setResults(data);
      navigate(`/search?q=${searchQuery}`, { replace: true }); // URL update
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (queryFromURL) fetchData(queryFromURL);
  }, [queryFromURL]);

  return (
    <Container style={{ marginTop: "20px" }}>
      {/* Internal Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "25px",
          padding: "5px 10px",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "550px",
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchData(query)}
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            fontSize: "14px",
            padding: "5px",
          }}
        />
        <button
          onClick={() => fetchData(query)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#4979eb",
            fontSize: "18px",
            lineHeight: "0px",
          }}
        >
          <FiSearch />
        </button>
      </div>

      {/* Tabs and bar bellow */}
      <div className="d-flex gap-0 ">
        <div
          style={{ cursor: "pointer" }}
          className={
            activeTab === "blogs" ? "BAactiveButton" : "BAinActiveButton"
          }
          onClick={() => setActiveTab("blogs")}
        >
          Blogs
        </div>

        <div
          style={{ cursor: "pointer" }}
          className={
            activeTab === "authors" ? "BAactiveButton" : "BAinActiveButton"
          }
          onClick={() => setActiveTab("authors")}
        >
          Author
        </div>
      </div>
      <div style={{ height: "1px", background: "#676767ff" }}></div>

      {/* Tab Content */}
      {loading && <p>Loading...</p>}

      {!loading && activeTab === "blogs" && (
        <>
          {/* {results.titleBlogs?.length > 0 &&
            results.titleBlogs.map((tblog) => (
              <div
                key={tblog.id}
                style={{ padding: "10px", borderBottom: "1px solid #eee" }}
              >
                <h5>{tblog.title}</h5>
                <p>{tblog.content.substring(0, 100)}...</p>
                <small>By {tblog.user?.name}</small>
              </div>
            ))} */}

          {results.contentBlogs?.length > 0 &&
            results.contentBlogs.map((cblog) => (
              <div
                key={cblog.id}
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <SearchedBlogCard
                  img={cblog.image}
                  name={cblog.user?.name}
                  title={cblog.title}
                  content={cblog.content}
                  slug={cblog.slug}
                />
              </div>
            ))}

          {results.titleBlogs?.length === 0 &&
            results.contentBlogs?.length === 0 && <p>No blogs found</p>}
        </>
      )}

      {!loading && activeTab === "authors" && (
        <div className="pt-2 d-flex flex-column gap-3 ">
          {results.user?.length > 0 ? (
            results.user.map((author) => (
              <div key={author.id} style={{ padding: "10px" }}>
                <ProfileCard
                  img={author.image} // <-- image field check করো
                  name={author.name}
                  engaged={author.engaged}
                  quote={author.quote}
                />
              </div>
            ))
          ) : (
            <p>No authors found</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
