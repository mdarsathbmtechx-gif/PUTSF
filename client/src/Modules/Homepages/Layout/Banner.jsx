// src/Modules/Homepages/Layout/Banner.jsx
import React from "react";

const Banner = ({ title = "Welcome to Putsf", subtitle = "", bgImage = "" }) => {
  const style = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: "#BFDBFE" }; // fallback blue-200

  return (
    <section
      className="h-64 flex flex-col items-center justify-center text-white mb-8"
      style={style}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-lg">{subtitle}</p>}
    </section>
  );
};

export default Banner;
