/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const CategoryBlogCard = ({ title, content, image, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="d-flex gap-3 border rounded shadow-sm bg-white p-1"
      style={{ flexWrap: "nowrap", minHeight: "150px", cursor: "pointer" }}
    >
      {/* Image */}
      <div style={{ width: "150px", height: "150px", flexShrink: 0 }}>
        <img
          src={image}
          alt={title}
          className="img-fluid rounded"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      {/* Text content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <div
          className="roboto-font mb-2 "
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {title}
        </div>
        <p
          className="text-muted open-sans-font mb-0"
          style={{ fontWeight: "400" }}
        >
          {content.slice(0, 110)}...
        </p>
        {/* <div className="d-flex gap-2 align-items-center">
          <img
            src="https://img.freepik.com/free-photo/smart-looking-teacher_53876-23045.jpg?semt=ais_hybrid&w=740&q=80"
            style={{
              height: "50px",
              width: "50px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div className="fw-bold" style={{ fontSize: "15px" }}>
            {name}
            Tauhidul Islam
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CategoryBlogCard;
