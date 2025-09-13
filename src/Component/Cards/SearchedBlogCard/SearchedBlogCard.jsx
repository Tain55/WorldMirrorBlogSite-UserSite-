/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const SearchedBlogCard = ({ img, name, title, content, slug }) => {
  const navigate = useNavigate();
  const handleOpenBlog = () => {
    navigate(`/blog/${slug}`);
  };
  return (
    <div
      onClick={handleOpenBlog}
      className="d-flex flex-column flex-md-row"
      style={{ cursor: "pointer" }}
    >
      <img
        className="img-fluid d-block d-md-none w-100 rounded-3" // xs (mobile) এ fullscreen
        src={img}
        style={{ objectFit: "cover" }}
      />
      <img
        className="d-none d-md-block rounded-3"
        src={img}
        style={{ width: "200px", height: "auto", objectFit: "cover" }}
      />

      <div className="p-3 d-flex flex-column justify-content-between">
        <div>
          <div className="fw-bold fs-4 roboto-font">{title}</div>
          <div className="open-sans-font">{content.substring(0, 300)}...</div>
        </div>
        <div className="d-flex gap-2 align-items-center pt-3">
          <img
            src="https://img.freepik.com/free-photo/smart-looking-teacher_53876-23045.jpg?semt=ais_hybrid&w=740&q=80"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div
            className="inter-font"
            style={{ fontSize: "14px", fontWeight: "550" }}
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedBlogCard;
