import language from "./languages.json";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import Footer from "./Footer";

function MainTranslator() {
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("mr");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data && data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setTranslatedText("Translation not available");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error occurred while translating.");
    }
    setLoading(false);
  };

  const copyContent = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } else {
      alert("Nothing to copy");
    }
  };

  const handleIcons = (target, id) => {
    if (target.classList.contains("copy")) {
      if (id === "fromCopied") {
        copyContent(text);
      } else {
        copyContent(translatedText);
      }
    }
  };

  return (
    <div
      className={"main"}
      style={{ marginTop: `${translatedText ? "280px" : "40px"}` }}
    >
      <div className="text">
        <div className="choose-from" style={{ marginTop: `${translatedText ? "50px" : "100px"}` }}>
          <p>From:</p>
          <select
            name="lang1"
            id="from"
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
          >
            <option value="">Choose Lang</option>
            {Object.entries(language).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="text"
          id="text"
          rows="10"
          cols="45"
          placeholder="Type or Paste your text here ⤵️"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="icon">
          <MdContentCopy
            className="copy"
            id="fromCopied"
            onClick={(e) => handleIcons(e.target, "fromCopied")}
          />
          <div className="choose-to">
            <p>To:</p>
            <select
              name="lang2"
              id="to"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value="">Choose Lang</option>
              {Object.entries(language).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        className="btn translate-btn"
        onClick={handleTranslate}
        style={{ marginBottom: `${translatedText ? "10px" : "130px"}` }}
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translatedText && (
        <div className="translated-result">
          <h3>Translated Text:</h3>
          <textarea
            name="translatedText"
            id="translatedText"
            rows="10"
            cols="45"
            value={translatedText}
            readOnly
          ></textarea>
          <div className="icon">
            <MdContentCopy
              className="copy"
              id="toCopied"
              style={{ margin: `${translatedText ? "10px auto 100px" : ""}` }}
              onClick={(e) => handleIcons(e.target, "toCopied")}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MainTranslator;
