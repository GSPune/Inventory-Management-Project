import React, { useState } from "react";
import Navbar from "../Dashboard-components/Navbar";
import Home from "../Dashboard-components/Home";
import styles from "./salesbill.module.css";
import Invoice from "./Invoice";
import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { TextField } from "@mui/material";
import TableForm from "./TableForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { MdDateRange } from "react-icons/md";

const SalesBill = () => {
  const [previewInvoice, setPreviewInvoice] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState("");
  const [cashierName, setCashierName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);
  // const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

  const handlePreviewInvoice = () => {
    setPreviewInvoice(true);
  };

  const togglePreview = () => {
    setPreviewInvoice(false);
  };

  return (
    <>
      <main>
        {previewInvoice ? (
          <Invoice
            togglePreview={togglePreview}
            cashierName={cashierName}
            phoneNo={phoneNo}
            customerName={customerName}
            billNo={billNo}
            date={date}
            description={description}
            setDescription={setDescription}
            quantity={quantity}
            price={price}
            amount={amount}
            list={list}
            setList={setList}
            total={total}
            setTotal={setTotal}
            // selectedProductId={selectedProductId}
            // setSelectedProductId={setSelectedProductId}
            selectedProductPrice={selectedProductPrice}
            // setSelectedProductPrice={setSelectedProductPrice}
            products={products}
            // setProducts={setProducts}
            // selectedProduct={selectedProduct}
            // setSelectedProduct={setSelectedProduct}
          />
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
                <div className={`${styles.grid} ${styles["grid-cols-2"]}`}>
                  <div className={styles.flexcol}>
                    <label htmlFor="Cashier_name">Enter Cashier Name</label>
                    <TextField
                      className={styles.textcashier}
                      variant="filled"
                      label="Enter Cashier Name"
                      id="Cashier_name"
                      name="Cashier_name"
                      autoComplete="off"
                      value={cashierName}
                      onChange={(e) => setCashierName(e.target.value)}
                    />
                  </div>

                  <div className={styles.flexcol}>
                    <label htmlFor="Customer_name">Enter Customer Name</label>
                    <TextField
                      // className={styles.textcashier}
                      variant="filled"
                      label="Enter Customer Name"
                      id="Customer_name"
                      name="Customer_name"
                      autoComplete="off"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={`${styles.grid} ${styles["grid-cols-3"]}`}>
                  <div className={styles.flexcol2}>
                    <label htmlFor="BillNo">Invoice Number</label>
                    <TextField
                      // className={styles.textcashier}
                      variant="filled"
                      label="Invoice Number"
                      id="BillNo"
                      name="BillNo"
                      autoComplete="off"
                      value={billNo}
                      onChange={(e) => setBillNo(e.target.value)}
                    />
                  </div>

                  <div className={styles.flexcol2}>
                    <label htmlFor="Phone_No">Enter Phone No</label>
                    <TextField
                      // className={styles.textcashier}
                      variant="filled"
                      label="Enter Phone No"
                      id="Phone_No"
                      name="Phone_No"
                      autoComplete="off"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>

                  <div className={styles.flexcol2}>
                    <label htmlFor="InvoiceDate">Date</label>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                    ></div>
                    <TextField
                      variant="filled"
                      label="Date"
                      id="InvoiceDate"
                      name="InvoiceDate"
                      autoComplete="off"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />

                    {/* <MdDateRange
                      style={{ marginLeft: "5px", cursor: "pointer" }}
                      onClick={handleCalendarClick}
                    /> */}
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar />
                    </LocalizationProvider> */}
                  </div>

                  {/* {isCalendarOpen && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={date}
                        onChange={(newDate) => {
                          setDate(newDate);
                          setIsCalendarOpen(false); // Close calendar after selecting date
                        }}
                      />
                    </LocalizationProvider>
                  )} */}
                </div>

                {/* This is my Table */}
                <article>
                  <TableForm
                    description={description}
                    setDescription={setDescription}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    setPrice={setPrice}
                    amount={amount}
                    setAmount={setAmount}
                    list={list}
                    setList={setList}
                    total={total}
                    setTotal={setTotal}
                    products={products}
                    setProducts={setProducts}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                </article>

                <MuiButton
                  sx={{ width: "200px", height: "50px" }}
                  className="mt-3"
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
