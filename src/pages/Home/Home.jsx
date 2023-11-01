import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
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
    </div>
  );
};

export default Home;
