import React, { useState } from "react";
import axios from "axios";

const BlogAdmin = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [imageFile, setImageFile] = useState(null);

  // Get API base URL from environment variable
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      formData.append("status", status);
      formData.append("image", imageFile);

      const res = await axios.post(`${API_URL}/blog/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${userToken}`,
        },
      });

      console.log("Blog created:", res.data);
      alert("Blog created successfully!");
    } catch (error) {
      console.error("Failed to create blog:", error.response?.data || error);
      alert("Failed to create blog. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
      />
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default BlogAdmin;
