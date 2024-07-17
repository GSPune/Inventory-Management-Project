import React from "react";
import styles from "./invoice.module.css";
import Home from "../Dashboard-components/Home";
import { Button as MuiButton } from "@mui/material";
import { TextField } from "@mui/material";
import Table from "./Table";
import Footer from "./Footer";

const Invoice = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <main className="lg:max-w-xl lg:mx-auto bg-white">
        <div className={styles.container}>
          {/* header */}
          <header>
            {/* <div className={styles.body}> */}
            {/* <Home /> */}
            {/* <div className={styles.container}> */}
            <div className={styles.h2}>
              <h2 className={styles.heading}>Invoice</h2>
            </div>
            {/* </div> */}

            {/* <div className={styles.listbtn}> */}

            {/* <ul
                className={styles.ulbtn}
                // style={{ display: "flex", justifyContent: "space-between" }}
              >
                <li>
                  <MuiButton
                    className={styles.printbtn}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handlePrint}
                  >
                    Print
                  </MuiButton>
                </li>
                <li> */}
            {/* <footer className={styles.footer}>
              <div className={styles.footerContent}>
                <MuiButton
                  className={styles.downloadbtn}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Download
                </MuiButton>
              </div>
            </footer> */}

            {/* </li>
              </ul> */}

            {/* </div> */}

            {/* </div> */}
          </header>
          {/* end of header */}

          {/* your details */}
          <section className={styles.section1}>
            <h3 className={styles.cashiername}>Cashier Name</h3>
            <span className={styles.phno}>Phone No:</span>
          </section>
          {/* end of your details */}

          {/* customer details */}
          <section className={styles.customername}>
            <h3 className={styles.customername}>Customer Name</h3>
          </section>
          {/* end of customer details */}

          {/* date */}
          <article>
            <ul className={styles.ul2btn}>
              <li>Bill No:</li>
              <li>Date:</li>
            </ul>
          </article>
          {/* end of date */}

          <Table />

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Invoice;
