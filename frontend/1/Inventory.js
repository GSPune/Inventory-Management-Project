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

const Inventory = () => {
  // const history = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  // const options = [
  //   { value: "all", label: "All" },
  //   { value: "vegetables", label: "Vegetables" },
  //   { value: "dairy_products", label: "Dairy Products" },
  //   { value: "beverages", label: "Beverages & Cold Drinks" },
  //   { value: "bakery", label: "Bakery products" },
  //   { value: "snacks", label: "Snacks" },
  //   { value: "medicines", label: "Medicines" },
  // ];

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
            {/* <Select
              className="selectcat"
              value={selectedCategory}
              onChange={(selectedOption) => {
                console.log("Selected option:", selectedOption);
                filterProductsByCategory(selectedOption);
              }}
              options={options}
            /> */}

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
