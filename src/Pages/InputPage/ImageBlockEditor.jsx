/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const ImageBlockEditor = ({
  image,
  caption,
  onImageChange,
  onCaptionChange,
  onSave,
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image) setPreview(URL.createObjectURL(image));
  }, [image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageChange(e.target.files[0])}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: "100%", marginTop: "10px", opacity: 0.6 }}
        />
      )}
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        style={{ marginTop: "10px", width: "100%" }}
      />
      <button
        onClick={onSave}
        style={{ marginTop: "10px", padding: "6px 12px" }}
      >
        Save Image
      </button>
    </div>
  );
};

export default ImageBlockEditor;
