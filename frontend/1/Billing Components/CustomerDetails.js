import React from "react";
import styles from "./invoice.module.css";

const CustomerDetails = ({ customerName }) => {
  return (
    <>
      <section className={styles.customername}>
        <h3 className={styles.customername}>Customer Name: {customerName}</h3>
      </section>
    </>
  );
};

export default CustomerDetails;
