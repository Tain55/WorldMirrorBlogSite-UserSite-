/* eslint-disable react/prop-types */
const QuoteBlockEditor = ({
  text,
  author,
  onTextChange,
  onAuthorChange,
  onSave,
}) => (
  <div>
    <textarea
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Write quote..."
      style={{ width: "100%", height: "80px" }}
    />
    <input
      type="text"
      value={author}
      onChange={(e) => onAuthorChange(e.target.value)}
      placeholder="Author"
      style={{ marginTop: "10px", width: "100%" }}
    />
    <button onClick={onSave} style={{ marginTop: "10px", padding: "6px 12px" }}>
      Save Quote
    </button>
  </div>
);

export default QuoteBlockEditor;
