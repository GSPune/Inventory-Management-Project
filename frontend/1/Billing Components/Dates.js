import React from "react";
import styles from "./invoice.module.css";

const Dates = ({ billNo, date }) => {
  return (
    <>
      <article>
        <section className={styles.section}>
          {/* <ul className={styles.ul2btn}>
            <li className={styles.billno}> */}
          <span className={styles["font-bold"]}>Bill No: {billNo}</span>

          {/* </li>
            <li className="bg-gray-100"> */}
          <span className={styles["font-bold"]}>Date: {date}</span>

          {/* </li>
          </ul> */}
        </section>
      </article>
    </>
  );
};

export default Dates;
