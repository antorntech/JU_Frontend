import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div class="loader">
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__ball"></div>
    </div>
  );
};

export default Loader;
