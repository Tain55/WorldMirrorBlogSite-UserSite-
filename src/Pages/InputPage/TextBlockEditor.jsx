/* eslint-disable react/prop-types */
const TextBlockEditor = ({ value, onChange, onSave }) => (
  <div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write text..."
      style={{ width: "100%", height: "100px" }}
    />
    <button onClick={onSave} style={{ marginTop: "10px", padding: "6px 12px" }}>
      Save Text
    </button>
  </div>
);

export default TextBlockEditor;
