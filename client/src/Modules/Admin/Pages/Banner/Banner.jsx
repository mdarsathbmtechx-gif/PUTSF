import React, { useState, useEffect } from "react";
import axios from "axios";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banner/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const res = await axios.get(API_URL);
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Upload new banner
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Please provide a title and select an image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", file);

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setSubtitle("");
      setFile(null);
      fetchBanners();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const getImageUrl = (imgPath) =>
    imgPath.startsWith("http") ? imgPath : `${MEDIA_URL}${imgPath}`;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-6 flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Banner List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded overflow-hidden relative">
            <img
              src={getImageUrl(banner.image)}
              alt={banner.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <h2 className="font-semibold">{banner.title}</h2>
              {banner.subtitle && <p className="text-sm">{banner.subtitle}</p>}
              <button
                onClick={() => handleDelete(banner.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;
