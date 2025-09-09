/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

const QuoteCard = ({ name, quote, position, image }) => {
  return (
    <div className="d-flex justify-content-between align-items-center gap-3 w-100">
      {/* Quote (left side) */}
      <div
        className="d-flex gap-3 p-2 align-items-center"
        style={{
          width: "100%",
          border: "1px solid #5d5d5d5d",
          borderRadius: "8px",
          minHeight: "60px",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={image}
        />
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <p
            className="merriweather-font"
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0,
            }}
            title={quote}
          >
            "{quote}"
          </p>
          <div
            className="d-flex gap-2"
            style={{ fontSize: "12px", color: "#565656ff", lineHeight: "1" }}
          >
            <p
              className="poppins-semibold"
              style={{ fontWeight: "bold", margin: 0, marginLeft: "2px" }}
            >
              - {name}
            </p>
            <p className="inter-font" style={{ margin: 0 }}>
              {position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
