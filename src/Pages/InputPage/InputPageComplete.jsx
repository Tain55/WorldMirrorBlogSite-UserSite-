import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy } from "react-icons/fi";

const InputPageOld = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedType, setSelectedType] = useState("text");
  const [text, setText] = useState("");
  const [tempImage, setTempImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [listItems, setListItems] = useState([""]);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [editIndex, setEditIndex] = useState(null);

  // Handle image preview
  useEffect(() => {
    if (tempImage) {
      const url =
        typeof tempImage === "string"
          ? tempImage
          : URL.createObjectURL(tempImage);
      setPreview(url);
      return () => {
        if (typeof tempImage !== "string") URL.revokeObjectURL(url);
      };
    } else {
      setPreview(null);
    }
  }, [tempImage]);

  const resetInputs = () => {
    setText("");
    setTempImage(null);
    setCaption("");
    setListItems([""]);
    setQuoteText("");
    setQuoteAuthor("");
    setCode("");
    setLanguage("javascript");
    setSelectedType("text");
  };

  const handleAddOrUpdate = () => {
    let newBlock;

    if (selectedType === "text") {
      if (!text.trim()) return;
      newBlock = { type: "text", content: text };
    } else if (selectedType === "image") {
      if (!tempImage) return;
      newBlock = { type: "image", url: preview, caption };
    } else if (selectedType === "list") {
      const filteredItems = listItems.filter((i) => i.trim() !== "");
      if (filteredItems.length === 0) return;
      newBlock = { type: "list", items: filteredItems };
    } else if (selectedType === "quote") {
      if (!quoteText.trim()) return;
      newBlock = { type: "quote", text: quoteText, author: quoteAuthor };
    } else if (selectedType === "code") {
      if (!code.trim()) return;
      newBlock = { type: "code", content: code, language };
    }

    const newBlocks = [...blocks];
    if (editIndex !== null) {
      newBlocks[editIndex] = newBlock;
      setEditIndex(null);
    } else {
      newBlocks.push(newBlock);
    }
    setBlocks(newBlocks);
    resetInputs();
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    const block = blocks[idx];
    setSelectedType(block.type);

    if (block.type === "text") setText(block.content);
    if (block.type === "image") {
      setTempImage(block.url); // existing URL for preview
      setCaption(block.caption || "");
    }
    if (block.type === "list") setListItems(block.items);
    if (block.type === "quote") {
      setQuoteText(block.text);
      setQuoteAuthor(block.author);
    }
    if (block.type === "code") {
      setCode(block.content);
      setLanguage(block.language || "javascript");
    }
  };

  const handleCancelEdit = () => {
    resetInputs();
    setEditIndex(null);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="p-5">
      {/* Render blocks */}
      {blocks.map((block, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          {editIndex === idx ? (
            <>
              {/* Edit Form */}
              {selectedType === "text" && (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "100%", height: "100px" }}
                    autoFocus
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={handleAddOrUpdate}
                      style={{ padding: "6px 12px", marginRight: "10px" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{ padding: "6px 12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {selectedType === "image" && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTempImage(e.target.files[0])}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        marginTop: "10px",
                        opacity: 0.6,
                      }}
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={handleAddOrUpdate}
                      style={{ padding: "6px 12px", marginRight: "10px" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{ padding: "6px 12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {selectedType === "list" && (
                <>
                  {listItems.map((item, i) => (
                    <input
                      key={i}
                      value={item}
                      onChange={(e) => {
                        const newList = [...listItems];
                        newList[i] = e.target.value;
                        setListItems(newList);
                      }}
                      placeholder={`List item ${i + 1}`}
                      style={{
                        display: "block",
                        width: "100%",
                        marginBottom: "5px",
                      }}
                      autoFocus={i === listItems.length - 1}
                    />
                  ))}
                  <button onClick={() => setListItems([...listItems, ""])}>
                    Add Another Item
                  </button>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={handleAddOrUpdate}
                      style={{ padding: "6px 12px", marginRight: "10px" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{ padding: "6px 12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {selectedType === "quote" && (
                <>
                  <textarea
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="Write quote..."
                    style={{ width: "100%", height: "80px" }}
                  />
                  <input
                    type="text"
                    value={quoteAuthor}
                    onChange={(e) => setQuoteAuthor(e.target.value)}
                    placeholder="Author"
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={handleAddOrUpdate}
                      style={{ padding: "6px 12px", marginRight: "10px" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{ padding: "6px 12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {selectedType === "code" && (
                <>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                  </select>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your code..."
                    style={{
                      width: "100%",
                      height: "150px",
                      fontFamily: "monospace",
                    }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={handleAddOrUpdate}
                      style={{ padding: "6px 12px", marginRight: "10px" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{ padding: "6px 12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div onClick={() => handleEdit(idx)} style={{ cursor: "pointer" }}>
              {/* Display blocks */}
              {block.type === "text" && (
                <p style={{ whiteSpace: "pre-wrap" }}>{block.content}</p>
              )}

              {block.type === "image" && (
                <div>
                  <img
                    src={block.url}
                    alt="Blog"
                    style={{ maxWidth: "100%" }}
                  />
                  {block.caption && (
                    <p style={{ fontStyle: "italic" }}>{block.caption}</p>
                  )}
                </div>
              )}

              {block.type === "list" && (
                <ol>
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              )}

              {block.type === "quote" && (
                <blockquote
                  style={{ borderLeft: "3px solid #ccc", paddingLeft: "10px" }}
                >
                  <p style={{ fontStyle: "italic" }}>{block.text}</p>
                  {block.author && <footer>- {block.author}</footer>}
                </blockquote>
              )}

              {block.type === "code" && (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(block.content);
                    }}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "10px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "18px",
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
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add new block */}
      {editIndex === null && (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button onClick={() => setSelectedType("text")}>Text</button>
            <button onClick={() => setSelectedType("image")}>Image</button>
            <button onClick={() => setSelectedType("list")}>List</button>
            <button onClick={() => setSelectedType("quote")}>Quote</button>
            <button onClick={() => setSelectedType("code")}>Code</button>
          </div>

          <div style={{ flex: 1 }}>
            {selectedType === "text" && (
              <>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write text..."
                  style={{ width: "100%", height: "100px" }}
                />
                <button
                  onClick={handleAddOrUpdate}
                  style={{ marginTop: "10px", padding: "6px 12px" }}
                >
                  Add Text
                </button>
              </>
            )}

            {selectedType === "image" && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTempImage(e.target.files[0])}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      marginTop: "10px",
                      opacity: 0.6,
                    }}
                  />
                )}
                <input
                  type="text"
                  placeholder="Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={{ marginTop: "10px", width: "100%" }}
                />
                <button
                  onClick={handleAddOrUpdate}
                  style={{ marginTop: "10px", padding: "6px 12px" }}
                >
                  Add Image
                </button>
              </>
            )}

            {selectedType === "list" && (
              <>
                {listItems.map((item, i) => (
                  <input
                    key={i}
                    value={item}
                    onChange={(e) => {
                      const newList = [...listItems];
                      newList[i] = e.target.value;
                      setListItems(newList);
                    }}
                    placeholder={`List item ${i + 1}`}
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  />
                ))}
                <button onClick={() => setListItems([...listItems, ""])}>
                  Add Another Item
                </button>
                <button
                  onClick={handleAddOrUpdate}
                  style={{ marginTop: "10px", padding: "6px 12px" }}
                >
                  Add List
                </button>
              </>
            )}

            {selectedType === "quote" && (
              <>
                <textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="Write quote..."
                  style={{ width: "100%", height: "80px" }}
                />
                <input
                  type="text"
                  value={quoteAuthor}
                  onChange={(e) => setQuoteAuthor(e.target.value)}
                  placeholder="Author"
                  style={{ marginTop: "10px", width: "100%" }}
                />
                <button
                  onClick={handleAddOrUpdate}
                  style={{ marginTop: "10px", padding: "6px 12px" }}
                >
                  Add Quote
                </button>
              </>
            )}

            {selectedType === "code" && (
              <>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ marginBottom: "10px" }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="php">PHP</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                </select>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code..."
                  style={{
                    width: "100%",
                    height: "150px",
                    fontFamily: "monospace",
                  }}
                />
                <button
                  onClick={handleAddOrUpdate}
                  style={{ marginTop: "10px", padding: "6px 12px" }}
                >
                  Add Code
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPageOld;
