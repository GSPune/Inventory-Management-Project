import React from "react";
import styles from "./invoice.module.css";

const CashierDetails = ({ cashierName, phoneNo }) => {
  return (
    <>
      <section className={styles.section1}>
        <h3 className={styles.cashiername}>Cashier: {cashierName}</h3>
        <span className={styles.phno}>Phone No: {phoneNo}</span>
      </section>
    </>
  );
};

export default CashierDetails;
