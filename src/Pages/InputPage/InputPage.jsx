import { useState } from "react";
import BlockEditor from "./BlockEditor";
import BlockDisplay from "./BLockDisplay";

const InputPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("text");

  const handleSave = (newBlock) => {
    const updatedBlocks = [...blocks];
    if (editIndex !== null) {
      updatedBlocks[editIndex] = newBlock;
      setEditIndex(null);
    } else updatedBlocks.push(newBlock);
    setBlocks(updatedBlocks);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="p-5">
      {blocks.map((block, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          {editIndex === idx ? (
            <div>
              <BlockEditor
                type={block.type}
                blockData={block}
                onSave={handleSave}
              />
              <button
                onClick={() => setEditIndex(null)}
                style={{ marginTop: 10 }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <BlockDisplay
              block={block}
              onEdit={() => setEditIndex(idx)}
              onCopy={handleCopy}
            />
          )}
        </div>
      ))}

      {editIndex === null && (
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["text", "image", "list", "quote", "code"].map((type) => (
              <button key={type} onClick={() => setSelectedType(type)}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <BlockEditor
              type={selectedType}
              blockData={null}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPage;
