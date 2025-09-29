import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

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
              src={img.image_url || "/placeholder.png"}
              alt={img.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-center">
              <h2 className="font-semibold">{img.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeGallery;
