import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  // Helper to safely build image URLs
  const getImageUrl = (imgPath) => {
    if (!imgPath) return "";
    // If imgPath is already a full URL, return it
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return imgPath;
    // Otherwise, prepend MEDIA_URL safely
    return `${MEDIA_URL.replace(/\/$/, "")}${imgPath.startsWith("/") ? imgPath : "/" + imgPath}`;
  };

  // Fetch images
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="border rounded overflow-hidden">
            <img
              src={getImageUrl(img.image)} // Safe URL
              alt={img.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <h2 className="font-semibold text-center">{img.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
