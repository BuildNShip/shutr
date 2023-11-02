import React from "react";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import exifr from "exifr";

const Home = () => {
  const [file, setFile] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
    try {
      const exif = await exifr.parse(selectedFile);
      setExifData(exif);
      console.log("EXIF Data:", exif);
    } catch (err) {
      setError("Error reading EXIF: " + err.message);
      console.error("Error reading EXIF:", err);
    }
  };
  return (
    <div className={styles.mainContainer}>
      {/* First Column */}
      <div className={styles.firstColumn}>
        <div className={styles.fcSection1}>
          <div className={styles.fcs1}>
            <div className={styles.box11}></div>
            <div className={styles.box12}></div>
          </div>
          <div className={styles.box13}></div>
        </div>
        <div className={styles.fcSection2}>
          <div className={styles.fcs2}>
            <div className={styles.box14}></div>
            <div className={styles.box15}></div>
          </div>
          <div className={styles.box16}></div>
        </div>
      </div>
      {/* Second Column */}
      <div className={styles.secondColumn}>
        <div className={styles.scSection1}>
          <div className={styles.box21}></div>
          <div className={styles.box22}>
            {" "}
            <input type="file" id="upload" onChange={handleFileChange} />
            {exifData && <pre>{JSON.stringify(exifData, null, 2)}</pre>}
          </div>
        </div>
        <div className={styles.scSection2}>
          <div className={styles.box23}></div>
          <div className={styles.box24}></div>
        </div>
      </div>
      {/* Third Column */}
      <div className={styles.thirdColumn}>
        <div className={styles.tcSection1}>
          <div className={styles.box31}></div>
          <div className={styles.box32}></div>
        </div>
        <div className={styles.tcSection2}>
          <div className={styles.box33}></div>
          <div className={styles.tcs1}>
            <div className={styles.box34}></div>
            <div className={styles.box35}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
