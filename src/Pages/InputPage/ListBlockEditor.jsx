/* eslint-disable react/prop-types */
const ListBlockEditor = ({ items, onItemChange, onAddItem, onSave }) => (
  <div>
    {items.map((item, i) => (
      <input
        key={i}
        value={item}
        onChange={(e) => onItemChange(i, e.target.value)}
        placeholder={`List item ${i + 1}`}
        style={{ display: "block", width: "100%", marginBottom: "5px" }}
      />
    ))}
    <button onClick={onAddItem}>Add Another Item</button>
    <button onClick={onSave} style={{ marginTop: "10px", padding: "6px 12px" }}>
      Save List
    </button>
  </div>
);

export default ListBlockEditor;
