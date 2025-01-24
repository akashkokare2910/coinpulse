import React from "react";
import "./Loader.css"; // Custom CSS for styling the loader

const Loader = () => {
  return (
    <div className="loader-container flex justify-center items-center">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
