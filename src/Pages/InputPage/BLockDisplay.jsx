/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy } from "react-icons/fi";

const BlockDisplay = ({ block, onEdit, onCopy }) => {
  const handleCopyClick = (e) => {
    e.stopPropagation();
    onCopy(block.content || "");
  };
  switch (block.type) {
    case "text":
      return (
        <p
          onClick={onEdit}
          style={{ cursor: "pointer", whiteSpace: "pre-wrap" }}
        >
          {block.content}
        </p>
      );
    case "image":
      return (
        <div onClick={onEdit} style={{ cursor: "pointer" }}>
          <img src={block.url} alt="Blog" style={{ maxWidth: "100%" }} />
          {block.caption && (
            <p style={{ fontStyle: "italic" }}>{block.caption}</p>
          )}
        </div>
      );
    case "list":
      return (
        <ul onClick={onEdit} style={{ cursor: "pointer" }}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          onClick={onEdit}
          style={{
            borderLeft: "3px solid #ccc",
            paddingLeft: "10px",
            cursor: "pointer",
          }}
        >
          <p style={{ fontStyle: "italic" }}>{block.text}</p>
          {block.author && <footer>- {block.author}</footer>}
        </blockquote>
      );
    case "code":
      return (
        <div style={{ position: "relative" }}>
          <button
            onClick={handleCopyClick}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <FiCopy />
          </button>
          <SyntaxHighlighter
            language={block.language || "javascript"}
            style={oneDark}
          >
            {block.content}
          </SyntaxHighlighter>
        </div>
      );
    default:
      return null;
  }
};

export default BlockDisplay;
