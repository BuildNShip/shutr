import React, { useRef } from "react";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import exifr from "exifr";
import logo from "./logo.png";
import toast from "react-hot-toast";

const Home = () => {
  const [file, setFile] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);
    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
    try {
      const exif = await exifr.parse(selectedFile);
      if (!exif) {
        toast.error("No EXIF data found in the image");
        return;
      }
      setExifData(exif);
      console.log("EXIF Data:", exif);
    } catch (err) {
      setError("Error reading EXIF: " + err.message);
      console.error("Error reading EXIF:", err);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    const dayOfMonth = date.getDate();
    const suffix = getSuffix(dayOfMonth);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${month} ${dayOfMonth}${suffix}, ${day} ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  function getSuffix(dayOfMonth) {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return "th";
    }
    switch (dayOfMonth % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const box22Ref = useRef(null);

  useEffect(() => {
    box22Ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={styles.mainContainer}>
      {/* First Column */}
      <div className={styles.firstColumn}>
        <div className={styles.fcSection1}>
          <div className={styles.fcs1}>
            <div className={styles.box11}>
              <p className={styles.b11T}>{exifData && exifData.Make}</p>
              <p className={styles.b11M}>{exifData && exifData.Model}</p>
            </div>
            <div className={styles.box12}>
              {exifData && exifData.Software && (
                <p className={styles.b12T}>SOFTWARE</p>
              )}

              <p className={styles.software}>{exifData && exifData.Software}</p>
            </div>
          </div>
          <div className={styles.box13}>
            <div className={styles.b131}>
              {exifData && exifData.XResolution && (
                <p className={styles.b131T}>XResolution</p>
              )}
              <p className={styles.b131C}>{exifData && exifData.XResolution}</p>
            </div>
            <div className={styles.b131}>
              {exifData && exifData.YResolution && (
                <p className={styles.b131T}>YResolution</p>
              )}
              <p className={styles.b131C}>{exifData && exifData.YResolution}</p>
            </div>
          </div>
        </div>
        <div className={styles.fcSection2}>
          <div className={styles.fcs2}>
            <div className={styles.box14}>
              {exifData && exifData.CreateDate && (
                <p className={styles.b14T}>Created Date</p>
              )}
              <p className={styles.b14C}>
                {exifData && formatDate(exifData.CreateDate)}
              </p>
            </div>
            <div className={styles.box15}>
              {exifData && exifData.CreateDate && (
                <p className={styles.b14T}>Modified Date</p>
              )}
              <p className={styles.b14C}>
                {exifData && formatDate(exifData.ModifyDate)}
              </p>
            </div>
          </div>
          <div className={styles.box16}>
            <div className={styles.socials}>
              {exifData && exifData.Orientation && (
                <p className={styles.b23T}>Orientation</p>
              )}
              <p className={styles.b23C}>{exifData && exifData.Orientation}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Second Column */}
      <div className={styles.secondColumn}>
        <div className={styles.scSection1}>
          <div className={styles.box21}>
            {!exifData && (
              <p className={styles.b211C} ref={box22Ref}>
                Kindly, click the below icon to upload an image, so as to view
                the metadata. Photos taken on DSLR cameras are recommended for
                best results
              </p>
            )}
            {exifData && exifData.LensModel && (
              <p className={styles.b21T}>Lens Model</p>
            )}
            <p className={styles.b21C}>{exifData && exifData.LensModel}</p>
          </div>
          <div className={styles.box22} >
            <label htmlFor="upload">
              <BsFillCloudUploadFill size={150} color="#6751d7" />

              <input
                type="file"
                id="upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <p className={styles.boxText}>Upload File</p>
            </label>
            {file && <p className={styles.fileName}>{file.name}</p>}
            {/* {exifData && <pre>{JSON.stringify(exifData, null, 2)}</pre>} */}
          </div>
        </div>
        <div className={styles.scSection2}>
          <a
            href="https://www.instagram.com/buildnship/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.box23}>
              <FaInstagram color="#6751D7" size={75} />
            </div>
          </a>
          <div className={styles.box24}>
            <img className={styles.box24i} src={logo} alt="" />
          </div>
        </div>
      </div>
      {/* Third Column */}
      <div className={styles.thirdColumn}>
        <div className={styles.tcSection1}>
          <div className={styles.box31}>
            {exifData && exifData.MaxApertureValue && (
              <p className={styles.b31T}>Aperture Value</p>
            )}
            <p className={styles.b31C}>
              {exifData && exifData.MaxApertureValue}
            </p>
          </div>
          <div className={styles.box32}>
            {exifData && exifData.FocalLength && (
              <p className={styles.b32T}>Focal Length</p>
            )}
            <p className={styles.b32C}>{exifData && exifData.FocalLength}</p>
          </div>
        </div>
        <div className={styles.tcSection2}>
          <div className={styles.box33}>
            <div className={styles.b331}>
              {exifData && exifData.BrightnessValue && (
                <p className={styles.b331T}>Brightness</p>
              )}
              <p className={styles.b331C}>
                {exifData && exifData.BrightnessValue}
              </p>
            </div>
            <div className={styles.b331}>
              {exifData && exifData.Contrast && (
                <p className={styles.b331T}>Contrast</p>
              )}
              <p className={styles.b331C}>{exifData && exifData.Contrast}</p>
            </div>
            <div className={styles.b331}>
              {exifData && exifData.Saturation && (
                <p className={styles.b331T}>Saturation</p>
              )}
              <p className={styles.b331C}>{exifData && exifData.Saturation}</p>
            </div>
            <div className={styles.b331}>
              {exifData && exifData.Sharpness && (
                <p className={styles.b331T}>Sharpness </p>
              )}
              <p className={styles.b331C}>{exifData && exifData.Sharpness}</p>
            </div>
          </div>
          <div className={styles.tcs1}>
            <div className={styles.box34}>
              <p className={styles.b34C}>{exifData && exifData.Flash}</p>
            </div>
            <div className={styles.box35}>
              {exifData && exifData.ISO && <p className={styles.b35T}>ISO</p>}
              <p className={styles.b35C}>{exifData && exifData.ISO}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
