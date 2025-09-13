import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy } from "react-icons/fi";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import "./InputPageComplete.css";

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
  const [dragActive, setDragActive] = useState(false);
  const [blogHeading, setBlogHeading] = useState("");

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
    setBlogHeading("");
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
    } else if (selectedType === "heading") {
      if (!blogHeading.trim()) return;
      newBlock = { type: "heading", heading: blogHeading };
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

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setTempImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    const block = blocks[idx];
    setSelectedType(block.type);

    if (block.type === "heading") setBlogHeading(block.heading);
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
    <div className="p-5 pt-3">
      {/* Render blocks */}
      {blocks.map((block, idx) => (
        <div
          key={idx}
          style={{ marginBottom: "20px" }}
          className="open-sans-font"
        >
          {editIndex === idx ? (
            <>
              {/* Edit Form */}
              {selectedType === "heading" && (
                <>
                  <textarea
                    className="custom-textarea"
                    value={blogHeading}
                    onChange={(e) => setBlogHeading(e.target.value)}
                    style={{
                      width: "100%",
                      height: "100px",
                      fontSize: "30px",
                      fontWeight: "semi-bold",
                    }}
                    autoFocus
                  />
                  <div className="d-flex align-items-center gap-2 mt-3">
                    {/* Update */}
                    <button
                      onClick={handleAddOrUpdate}
                      className="btn btn-sm btn-success d-flex align-items-center"
                    >
                      <RxUpdate className="me-1" /> Update
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-sm btn-secondary d-flex align-items-center"
                    >
                      <MdOutlineCancel className="me-1" /> Cancel
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {}} // handleCancelEdit না, Delete function আলাদা রাখতে হবে
                      className="btn btn-sm btn-danger d-flex align-items-center"
                    >
                      <MdDeleteOutline className="me-1" /> Delete
                    </button>
                  </div>
                </>
              )}

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
              {block.type === "heading" && (
                <h2
                  style={{
                    whiteSpace: "pre-wrap",
                    marginBottom: "-6px",
                    lineHeight: "30px",
                    marginTop: "25px",
                  }}
                >
                  {block.heading}
                </h2>
              )}

              {block.type === "text" && (
                <p style={{ whiteSpace: "pre-wrap", marginTop: "0px" }}>
                  {block.content}
                </p>
              )}

              {block.type === "image" && (
                <div className="w-100 d-flex flex-column">
                  <img
                    src={block.url}
                    alt="Blog"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "95vh",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  {block.caption && (
                    <p
                      style={{
                        fontStyle: "italic",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {block.caption}
                    </p>
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
                      color: "#fff",
                    }}
                  >
                    <FiCopy />
                  </button>
                  <SyntaxHighlighter
                    language={block.language || "javascript"}
                    style={oneDark}
                    customStyle={{
                      borderRadius: "10px",
                      padding: "15px",
                      overflow: "auto",
                      maxHeight: "100vh",
                    }}
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
        <div
          className="m-2 pt-3 mt-5"
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            borderTop: "1px solid #96a4bc59",
            // boxShadow: "0px 0px 15px #5b5b5bff",
            // borderRadius: "8px",
          }}
        >
          <div style={{ flex: 1 }}>
            {selectedType === "heading" && (
              <>
                <textarea
                  value={blogHeading}
                  onChange={(e) => setBlogHeading(e.target.value)}
                  placeholder="Write a heading"
                  className="custom-textarea open-sans-font"
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid #b4b3b3ff",
                    borderRadius: "15px",
                    padding: "10px",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                />
                <button
                  className="addFildButton"
                  onClick={handleAddOrUpdate}
                  style={{
                    marginTop: "0px",
                    padding: "6px 12px",
                  }}
                >
                  Add Heading
                </button>
              </>
            )}

            {selectedType === "text" && (
              <>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write text..."
                  className="custom-textarea open-sans-font"
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid #b4b3b3ff",
                    borderRadius: "15px",
                    padding: "10px",
                  }}
                />
                <button
                  className="addFildButton"
                  onClick={handleAddOrUpdate}
                  style={{
                    marginTop: "0px",
                    padding: "6px 12px",
                  }}
                >
                  Add Text
                </button>
              </>
            )}

            {selectedType === "image" && (
              <div className="mb-3">
                {/* Upload box */}
                <label
                  htmlFor="imageUpload"
                  className={`form-label w-100 d-flex flex-column justify-content-center align-items-center p-5 border border-2 rounded bg-light ${
                    dragActive
                      ? "border-primary text-primary bg-white"
                      : "border-secondary text-muted"
                  }`}
                  style={{
                    borderStyle: "dashed",
                    cursor: "pointer",
                    minHeight: "150px",
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                  }}
                  onDrop={handleDrop}
                >
                  <span className="fs-5 fw-semibold">
                    📂 Click or Drag & Drop
                  </span>
                  <small className="text-secondary">Upload Image</small>
                </label>

                {/* Hidden input */}
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  className="d-none"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {/* Preview */}
                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}

                {/* Caption input */}
                <input
                  type="text"
                  placeholder="Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="form-control mt-3 custom-textarea-small open-sans-font"
                />

                {/* Add button */}
                <button className="addFildButton" onClick={handleAddOrUpdate}>
                  Add Image
                </button>
              </div>
            )}

            {selectedType === "list" && (
              <>
                {listItems.map((item, i) => (
                  <input
                    className="custom-textarea-small open-sans-font"
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
                      fontStyle: "normal",
                    }}
                  />
                ))}
                <div className="d-flex gap-2">
                  <button
                    className="addFildButton"
                    onClick={() => setListItems([...listItems, ""])}
                  >
                    + Add Another Item
                  </button>
                  <button
                    className="addFildButton"
                    onClick={handleAddOrUpdate}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                  >
                    Add List
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
                  className="custom-textarea-small"
                />
                <input
                  type="text"
                  value={quoteAuthor}
                  onChange={(e) => setQuoteAuthor(e.target.value)}
                  placeholder="Author"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    fontStyle: "normal",
                  }}
                  className="custom-textarea-small"
                />
                <button onClick={handleAddOrUpdate} className="addFildButton">
                  Add Quote
                </button>
              </>
            )}

            {selectedType === "code" && (
              <div className="inter-font">
                {/* Language select */}
                <div className="mb-3">
                  <label className="form-label fw-bolder mb-1">
                    Select a Language
                  </label>
                  <div className="row g-2">
                    <div className="col-12 col-md-6 col-lg-2">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="form-select custom-textarea-small"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="php">PHP</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Code textarea */}

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Start coding here..."
                  className="form-control custom-textarea"
                  style={{
                    height: "200px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                />

                {/* Add button */}
                <button
                  onClick={handleAddOrUpdate}
                  className="btn btn-primary px-4 addFildButton"
                >
                  Add Code
                </button>
              </div>
            )}
          </div>

          {/* Block Buttons */}
          <div className="inter-font mt-3 mb-1">
            Add elements bellow into your blog
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <button
              className="blogBlockButtons"
              onClick={() => setSelectedType("heading")}
            >
              Heading
            </button>
            <button
              className="blogBlockButtons"
              onClick={() => setSelectedType("text")}
            >
              Text
            </button>
            <button
              className="blogBlockButtons"
              onClick={() => setSelectedType("image")}
            >
              Image
            </button>
            <button
              className="blogBlockButtons"
              onClick={() => setSelectedType("list")}
            >
              List
            </button>
            <button
              className="blogBlockButtons"
              onClick={() => setSelectedType("quote")}
            >
              Quote
            </button>
            <button
              className="blogBlockButtons"
              onClick={() => setSelectedType("code")}
            >
              Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPageOld;
