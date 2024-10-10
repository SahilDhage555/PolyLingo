import React from "react";
import Navbar from "./Navbar";
import TranslatorMain from "./TranslatorMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Translator.css";

function Translator() {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <TranslatorMain />
      
    </div>
  );
}

export default Translator;
