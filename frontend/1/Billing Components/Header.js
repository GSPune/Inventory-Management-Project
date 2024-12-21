import React from "react";
import styles from "./invoice.module.css";

const Header = () => {
  return (
    <>
      <header>
        <div className={styles.h2}>
          <h2 className={styles.heading}>Invoice</h2>
        </div>
      </header>
    </>
  );
};

export default Header;
