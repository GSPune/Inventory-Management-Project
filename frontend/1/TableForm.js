import React, { useState, useEffect } from "react";
import { TextField, Select } from "@mui/material";
import styles from "./salesbill.module.css";
import { Button as MuiButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "../api/axios";
import BASE_URL from "../config";

const SELECT_PRODUCTS_URL = BASE_URL + "products/";

export default function TableForm({
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
  products,
  setProducts,
  selectedProductId,
  setSelectedProductId,
  selectedProductPrice,
  setSelectedProductPrice,
  // selectedProducts,
  // setSelectedProducts,
}) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(SELECT_PRODUCTS_URL);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Fetch product price when product selection changes
  useEffect(() => {
    if (selectedProductId) {
      fetchProductPrice(selectedProductId);
    } else {
      // Reset the selected product price if no product is selected
      // setSelectedProductPrice(0);
    }
  }, [selectedProductId]);

  // Function to fetch product price
  const fetchProductPrice = async (productId) => {
    try {
      const response = await axios.get(`products/{productId}`);
      setSelectedProductPrice(response.data.price);
    } catch (error) {
      console.error("Error fetching product price:", error);
      // Reset the selected product price in case of an error
      setSelectedProductPrice(0);
    }
  };

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductId) return;

    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    );

    if (!selectedProduct || selectedProduct.quantity < quantity) {
      // Show error message
      alert("Sorry, Product is not available in sufficient quantity.");
      return;
    }

    if (selectedProduct) {
      const newItems = {
        id: uuidv4(),
        description: selectedProduct.name,
        quantity,
        price: selectedProduct.price,
        amount: quantity * selectedProduct.price,
      };
      // setDescription("");
      // setQuantity("");
      // setPrice("");
      // setAmount("");
      setList([...list, newItems]);
      setTotal(total + newItems.amount);
      // setIsEditing(false);
      // console.log(list);
    }

    // Reset form fields
    setSelectedProductId("");
    setQuantity("");
    setAmount("");
    setSelectedProductPrice(0);
  };

  // const fetchProductPrice = async (productId) => {
  //   try {
  //     const response = await axios.get(`products/${productId}`);
  //     if (response.data.price) {
  //       setSelectedProductPrice(response.data.price);
  //     }
  //   } catch (error) {
  //     console.error("Error in fetching product price:", error);
  //   }
  // };

  // const handleProductChange = (e) => {
  //   setSelectedProductId(e.target.value);
  //   fetchProductPrice(e.target.value);
  // };

  // Calculate items amount function

  // useEffect(() => {
  //   const calculateAmount = (amount) => {
  //     setAmount(quantity * price);
  //   };

  //   calculateAmount(amount);
  // }, [amount, price, quantity, setAmount]);

  // Calculate total amount of products
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
        setTotal(sum);
      }
    }
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  // Delete function
  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
    const deletedItem = list.find((row) => row.id === id);
    setTotal(total - deletedItem.amount);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.grid} ${styles["grid-cols-2"]}`}>
          <div className={styles.tableval}>
            <label htmlFor="product">Product Name</label>
            <Select
              variant="filled"
              label="Select Product"
              // id="description"
              // name="description"
              autoComplete="off"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              // onChange={(e) => setDescription(e.target.value)}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className={styles.tableval}>
            <label htmlFor="quantity">Quantity</label>
            <TextField
              variant="filled"
              label="Quantity"
              id="quantity"
              name="quantity"
              autoComplete="off"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className={`${styles.grid} ${styles["grid-cols-2"]}`}>
          <div className={styles.tableval}>
            <label htmlFor="price">Price</label>
            <TextField
              variant="filled"
              label="Price"
              id="price"
              name="price"
              autoComplete="off"
              value={selectedProductPrice}
              disabled
              // onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className={styles.tableval}>
            <label htmlFor="amount">Amount</label>
            <p className={styles.amt}>{amount}</p>
          </div>
        </div>

        <MuiButton
          sx={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginRight: "800px",
          }}
          className={styles.additembtn}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          {isEditing ? "Editing Row Item" : "Add Item"}
        </MuiButton>
      </form>

      <div class="table-container">
        <table className={styles.marginbtm}>
          <thead>
            <tr className={styles.trcolor}>
              <td className={styles.bold}>Product Name</td>
              <td className={styles.bold}>Quantity</td>
              <td className={styles.bold}>Price</td>
              <td className={styles.bold}>Amount</td>
            </tr>
          </thead>
          {list.map(({ id, description, quantity, price, amount }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr>
                  <td>{description}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                  <td className="amount">{amount}</td>

                  <div>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteRow(id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => editRow(id)}
                      >
                        <AiOutlineEdit />
                      </button>
                    </td>
                  </div>
                </tr>
              </tbody>
            </React.Fragment>
          ))}
        </table>
      </div>

      <div>
        <h6>Total: {total.toLocaleString()}</h6>
      </div>
    </>
  );
}
