// src/Routes/HomepagesRoutes.jsx
import React from "react";
import Header from "../Modules/Homepages/Layout/Header";
import Home from "../Modules/Homepages/Pages/Home";
import Footer from "../Modules/Homepages/Layout/Footer";
import Banner from "../Modules/Homepages/Layout/Banner";

const HomepagesRoutes = () => {
  return (
    <>
      <Header />
      <Banner/>
      <Home />
      <Footer />
      {/* You can add page components here later, e.g., <Home />, <Gallery /> */}
    </>
  );
};

export default HomepagesRoutes;
