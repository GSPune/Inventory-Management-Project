import React, { useState } from "react";
import Navbar from "../Dashboard-components/Navbar";
import Home from "../Dashboard-components/Home";
import styles from "./salesbill.module.css";
import Invoice from "./Invoice";
import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { TextField } from "@mui/material";

const SalesBill = () => {
  const [previewInvoice, setPreviewInvoice] = useState(false);

  const handlePreviewInvoice = () => {
    setPreviewInvoice(true);
  };

  return (
    <>
      <main>
        {previewInvoice ? (
          <Invoice />
        ) : (
          <header>
            <div className={styles.container}>
              <div className={styles.h1}>
                <h1 className={styles.heading}>Create Bill</h1>
              </div>

              <Home />

              {/* <button onClick={handlePreviewInvoice}>Preview Invoice</button>
            {previewInvoice && <Invoice />} */}

              <div className={styles.field}>
                <TextField
                  className={styles.textcashier}
                  variant="filled"
                  label="Enter Cashier Name"
                  id="Cashier_name"
                  name="Cashier_name"
                  autoComplete="off"
                />

                {/* link to navigate to the invoice page */}
                {/* <div className={styles.buttonContainer}> */}
                {/* <Link to="/invoice"> */}
                <MuiButton
                  sx={{ width: "200px", height: "50px" }}
                  className="preview-invoice-btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handlePreviewInvoice}
                >
                  Preview Invoice
                </MuiButton>

                {/* </Link> */}
                {/* </div> */}
              </div>
            </div>
          </header>
        )}
      </main>
    </>
  );
};

export default SalesBill;
