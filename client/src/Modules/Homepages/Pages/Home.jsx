// src/Modules/Homepages/Pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);
        setImages(res.data.slice(0, 4)); // only 4 images for preview
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-12 space-y-16">
        
        {/* About Us */}
        <section>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">About Us</h3>
          <p className="text-lg md:text-xl leading-relaxed">
            Our main motto is to raise voice for students' rights and fulfill their basic requirements. We are purely independent, not politically dependent.
          </p>
        </section>

        {/* Services */}
        <section className="bg-gray-100 p-8 rounded-lg shadow-sm">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Services</h3>
          <ul className="list-disc ml-6 space-y-2 text-lg">
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        </section>

        {/* Gallery Preview */}
        <section>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Gallery Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition"
                onClick={() => setSelectedImage(img.image_url)}
              >
                <img
                  src={img.image_url || "/placeholder.png"}
                  alt={img.title}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
          <Link
            to="/gallery"
            className="inline-block text-blue-600 font-semibold hover:underline"
          >
            See Full Gallery
          </Link>
        </section>

        {/* Blogs */}
        <section>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Blogs</h3>
          <p className="text-lg md:text-xl text-gray-600">Blog section coming soon...</p>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] rounded-lg shadow-lg animate-scaleIn"
            />
          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        `}
      </style>
    </main>
  );
};

export default Home;
