/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const BlockEditor = ({ type, blockData, onSave }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [listItems, setListItems] = useState([""]);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (!blockData) return;
    if (type === "text") setText(blockData.content || "");
    if (type === "image") {
      setImage(null);
      setCaption(blockData.caption || "");
    }
    if (type === "list") setListItems(blockData.items || [""]);
    if (type === "quote") {
      setQuoteText(blockData.text || "");
      setQuoteAuthor(blockData.author || "");
    }
    if (type === "code") {
      setCode(blockData.content || "");
      setLanguage(blockData.language || "javascript");
    }
  }, [blockData, type]);

  const handleSave = () => {
    if (type === "text") onSave({ type, content: text });
    if (type === "image")
      onSave({
        type,
        url: image ? URL.createObjectURL(image) : blockData.url,
        caption,
      });
    if (type === "list")
      onSave({ type, items: listItems.filter((i) => i.trim() !== "") });
    if (type === "quote")
      onSave({ type, text: quoteText, author: quoteAuthor });
    if (type === "code") onSave({ type, content: code, language });
  };

  switch (type) {
    case "text":
      return (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", height: "100px" }}
          autoFocus
        />
      );
    case "image":
      return (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: "100%", marginTop: 10, opacity: 0.6 }}
            />
          )}
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ width: "100%", marginTop: 10 }}
          />
        </div>
      );
    case "list":
      return (
        <div>
          {listItems.map((item, i) => (
            <input
              key={i}
              value={item}
              onChange={(e) => {
                const newList = [...listItems];
                newList[i] = e.target.value;
                setListItems(newList);
              }}
              style={{ display: "block", width: "100%", marginBottom: 5 }}
            />
          ))}
          <button onClick={() => setListItems([...listItems, ""])}>
            Add Item
          </button>
        </div>
      );
    case "quote":
      return (
        <div>
          <textarea
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            placeholder="Quote"
            style={{ width: "100%", height: 80 }}
          />
          <input
            type="text"
            value={quoteAuthor}
            onChange={(e) => setQuoteAuthor(e.target.value)}
            placeholder="Author"
            style={{ width: "100%", marginTop: 10 }}
          />
        </div>
      );
    case "code":
      return (
        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginBottom: 10 }}
          >
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code..."
            style={{ width: "100%", height: 150, fontFamily: "monospace" }}
          />
        </div>
      );
    default:
      return null;
  }
};

export default BlockEditor;
