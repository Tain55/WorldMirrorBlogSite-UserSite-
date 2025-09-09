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
        <h5 className="mb-2">{title}</h5>
        <p className="text-muted mb-0">{content.slice(0, 110)}...</p>
      </div>
    </div>
  );
};

export default CategoryBlogCard;
