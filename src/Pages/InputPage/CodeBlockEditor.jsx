/* eslint-disable react/prop-types */
const CodeBlockEditor = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onSave,
}) => (
  <div>
    <select
      value={language}
      onChange={(e) => onLanguageChange(e.target.value)}
      style={{ marginBottom: "10px" }}
    >
      <option value="javascript">JavaScript</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
      <option value="cpp">C++</option>
    </select>
    <textarea
      value={code}
      onChange={(e) => onCodeChange(e.target.value)}
      placeholder="Write your code..."
      style={{ width: "100%", height: "150px", fontFamily: "monospace" }}
    />
    <button onClick={onSave} style={{ marginTop: "10px", padding: "6px 12px" }}>
      Save Code
    </button>
  </div>
);

export default CodeBlockEditor;
