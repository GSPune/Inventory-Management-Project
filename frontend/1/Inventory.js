import React, { useState, useEffect } from "react";
import { Select } from "@mui/material";
import "./inventory.css";
import Navbar from "../Navbar";
import Popup from "../Inventory-components/Popup";
import { NavLink, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import UpdateProduct from "./UpdateProduct";
import { TablePagination } from "@mui/material";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Home from "../Home";
import axios from "../../api/axios";
import BASE_URL from "../../config";
// import Select from "react-select";
import Swal from "sweetalert2";

// const PRODUCT_URL = "http://192.168.177.25:8000/v1/addproduct/";
// const LIST_PRODUCTS_URL = "http://192.177.129.25:8000/v1/products/view/";

// const BASE_URL = "http://192.168.177.25:8000/v1/";
const PRODUCT_URL = BASE_URL + "products/add/";
const LIST_PRODUCTS_URL = BASE_URL + "products/view/";
const DELETE_PRODUCTS_URL = BASE_URL + "products/delete/";
const UPDATE_PRODUCT_URL = BASE_URL + "updateprodcuts/";

const Inventory = () => {
  const initialFormState = {
    // id: 0,
    Product_name: "",
    Product_price: 0.0,
    Quantity: 0,
    Units: "",
    Expiry_Date: "",
    Category: "",
  };

  // const history = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inpval, setInpval] = useState(initialFormState);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getData = (e) => {
    const { value, name } = e.target || {};

    setInpval((prevState) => {
      return {
        // ...inpval,
        ...prevState,
        [name]: value, // Parse quantity to integer
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    setInpval((prevState) => ({
      ...prevState,
      // Expiry_Date: formattedDate,
    }));

    const {
      id,
      Product_name,
      Product_price,
      Quantity,
      Units,
      Expiry_Date,
      Category,
    } = inpval;

    const validationErrors = {};
    if (!inpval.Product_name.trim()) {
      validationErrors.Product_name = "Field is required";
    } else if (!inpval.Product_price.trim()) {
      validationErrors.Product_price = "Field is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .post(
            PRODUCT_URL,
            JSON.stringify({
              // id,
              Product_name,
              Product_price,
              Quantity,
              Units,
              Expiry_Date,
              Category,
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              alert("Success...!!!");
              setOpenPopup(false);
            }
          });
      } catch (errors) {
        if (!errors?.response) {
          setErrors("No server response");
        } else {
          setErrors("Failed");
        }
      }
    }
  };

  // const handleClosePopup = () => {
  //   setOpenPopup(false);
  // };

  // const [errors, setErrors] = useState("");

  useEffect(() => {
    console.log(LIST_PRODUCTS_URL);
    const response = axios.get(LIST_PRODUCTS_URL);
    console.log(response);
    fetchProducts();
    // setProducts(response.data);
    // Fetch product data from backend
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(LIST_PRODUCTS_URL);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProductsByCategory = (Category) => {
    setSelectedCategory(Category);
  };

  const deleteProduct = async (id) => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(DELETE_PRODUCTS_URL, { data: { id } });
          await fetchProducts();
          Swal.fire(
            "Deleted!",
            "Product has been deleted successfully.",
            "success!"
          );
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = (index) => {
    // Set the newCustomer state to the customer being edited
    setInpval(products[index]);
    setEditingIndex(index);
    setOpenPopup(true);
  };

  const handleUpdate = async (index) => {
    const updatedCashier = [...products];
    updatedCashier[editingIndex] = inpval;
    setProducts(updatedCashier);
    setEditingIndex(null);
    setOpenPopup(false);

    const {
      id,
      Product_name,
      Product_price,
      Quantity,
      Units,
      Expiry_Date,
      Category,
    } = inpval;

    const validationErrors = {};
    if (!inpval.trim(Product_name)) {
      validationErrors.Product_name = "Field is required";
    } else if (!inpval.trim(Product_price)) {
      validationErrors.Product_price = "Field is required";
    }
    setErrors(validationErrors);

    const PAYLOAD = JSON.stringify({
      id: inpval.id,
      Product_name: inpval.Product_name,
      Product_price: inpval.Product_price,
      Quantity: inpval.Quantity,
      Units: inpval.Units,
      Expiry_Date: inpval.Expiry_Date,
      Category: inpval.Category,
    });

    console.log(PAYLOAD);
    if (Object.keys(validationErrors).length === 0) {
      // if(cashier.id == ''){
      try {
        const response = axios.put(UPDATE_PRODUCT_URL, PAYLOAD, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        if (response.status === 200) {
          alert("Product updated successfully...!!!");
          setOpenPopup(false);
        }
      } catch (errors) {
        if (!errors?.response) {
          setErrors("No server response");
        } else {
          setErrors("Failed");
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <Home />
      <div>
        <div className="body">
          {/* <div className="add_product_btn"> */}
          {/* <h1>Inventory</h1> */}

          <div className="addbtn">
            <button
              onClick={() => setOpenPopup(true)}
              className="add-product-btn"
            >
              Add Product
            </button>
            {/* </div>
          <div> */}

            <Select
              className="category"
              label="Select Category"
              value={selectedCategory}
              onChange={(e) => filterProductsByCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Vegetables and Fruits">
                Vegetables and Fruits
              </MenuItem>
              <MenuItem value="Dairy Products">Dairy Products</MenuItem>
              <MenuItem value="Beverages & Cold Drinks">
                Beverages & Cold Drinks
              </MenuItem>
              <MenuItem value="Bakery products">Bakery products</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Medicines">Medicines</MenuItem>
            </Select>
          </div>

          <div className="border-box">
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Product id</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                  <th>Units</th>
                  <th>Expiry Date</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter(
                    (product) =>
                      selectedCategory === "" ||
                      product.Category === selectedCategory
                  )
                  .map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.Product_name}</td>
                      <td>{product.Product_price}</td>
                      <td>{product.Quantity}</td>
                      <td>{product.Units}</td>
                      <td>{product.Expiry_Date}</td>
                      <td>{product.Category}</td>
                      <td>
                        <button
                          className="update"
                          onClick={() => {
                            handleUpdateProduct(index);
                            setOpenPopup(true);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="delete"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Popup
        title={<h2 className="title">Add New Product</h2>}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        // handleClose={handleClosePopup}
      >
        {/* <ProductForm /> */}

        <ProductForm
          setProducts={setProducts} // Pass down callback to update product list
          setOpenPopup={setOpenPopup} // Pass down callback to close the popup
        />
      </Popup>
    </>
  );
};

export default Inventory;
