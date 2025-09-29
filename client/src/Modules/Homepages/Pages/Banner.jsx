// src/Modules/Homepages/Pages/Banner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banner/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

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

  const getImageUrl = (imgPath) =>
    imgPath.startsWith("http") ? imgPath : `${MEDIA_URL}${imgPath}`;

  return (
    <div className="homepage-banner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {banners.length > 0 ? (
        banners.map((banner) => (
          <div key={banner.id} className="relative">
            <img
              src={getImageUrl(banner.image)}
              alt={banner.title}
              className="w-full h-48 object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 text-white">
              <h2 className="font-bold">{banner.title}</h2>
              {banner.subtitle && <p className="text-sm">{banner.subtitle}</p>}
            </div>
          </div>
        ))
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

export default Banner;
