import React from "react";
import styles from "./invoice.module.css";
import { Button as MuiButton } from "@mui/material";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        {/* <div className={styles.footerContent}>
          <MuiButton
            className={styles.downloadbtn}
            variant="contained"
            color="primary"
            size="large"
          >
            Download
          </MuiButton>

          <MuiButton
            className={styles.editinfo}
            variant="contained"
            color="primary"
            size="large"
          >
            Edit Information
          </MuiButton>

          {/* <footer>
            <ul className={styles.ul3btn}>
              <li>Cashier Name</li>
              <li>Phone No</li>
            </ul>
          </footer> 
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
