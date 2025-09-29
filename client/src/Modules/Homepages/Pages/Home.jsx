// src/Modules/Homepages/Pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [images, setImages] = useState([]);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  // Helper to get full image URL
  const getImageUrl = (imgPath) => {
    if (!imgPath) return "/placeholder.png"; // placeholder for empty slots
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return imgPath;
    return `${MEDIA_URL.replace(/\/$/, "")}${imgPath.startsWith("/") ? imgPath : "/" + imgPath}`;
  };

  // Fetch images for preview
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      let gallery = res.data;

      // Ensure at least 4 images (fill with placeholders if needed)
      while (gallery.length < 4) {
        gallery.push({ id: `placeholder-${gallery.length}`, title: "Coming Soon", image: null });
      }

      setImages(gallery.slice(0, 4)); // show exactly 4
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {/* About Us */}
      <section className="container mx-auto p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">About Us</h3>
        <p>We are a professional team providing quality services and beautiful experiences.</p>
      </section>

      {/* Services */}
      <section className="bg-gray-100 p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">Services</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Service 1</li>
          <li>Service 2</li>
          <li>Service 3</li>
        </ul>
      </section>

      {/* Gallery Preview */}
      <section className="container mx-auto p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">Gallery Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {images.map((img) => (
            <img
              key={img.id}
              src={getImageUrl(img.image)}
              alt={img.title}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>
        <Link
          to="/gallery"
          className="text-blue-600 font-semibold hover:underline"
        >
          See Full Gallery
        </Link>
      </section>

      {/* Blogs */}
      <section className="container mx-auto p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">Blogs</h3>
        <p>Blog section coming soon...</p>
      </section>
    </div>
  );
};

export default Home;
