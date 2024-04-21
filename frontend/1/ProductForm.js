import moment from "moment"; // Import Moment.js
import { TextField, Grid, FormControl, Select } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import "./ProductForm.css";
import axios from "../../api/axios";
import BASE_URL from "../../config";

// const BASE_URL = "http://192.168.177.25:8000/v1/";
const PRODUCT_URL = BASE_URL + "products/add/";
const LIST_PRODUCTS_URL = BASE_URL + "products/view/";

// const useStyle = makeStyles((theme) => ({
//   root: {
//     "& .MuiFormControl-root": {
//       width: "80%",
//       margin: theme.spacing(1),
//     },
//   },
// }));

const ProductForm = () => {
  const initialFormState = {
    // id: 0,
    Product_name: "",
    Product_price: 0.0,
    Quantity: 0,
    Units: "",
    Expiry_Date: "",
    Category: "",
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inpval, setInpval] = useState(initialFormState);
  const [errors, setErrors] = useState("");
  const [products, setProducts] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target || {};

    // const formattedValue =
    //   name === "Expiry_Date" ? moment(value).format("YYYY-MM-DD") : value;

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
    //onSubmit(inpval);
    // Format the date
    //const formattedDate = moment(inpval.Expiry_Date).format("YYYY-MM-DD");
    // Update inpval with the formatted date

    // setInpval(initialFormState);
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

  useEffect(() => {
    console.log(LIST_PRODUCTS_URL);
    // Fetch cashier data from backend when component mounts
    // fetchProducts();
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

  // function to reset the form
  const resetForm = () => {
    setInpval(initialFormState);
  };

  //   const handleClose = () => {
  //     setInpval(initialFormState);
  //     onclose(); // Close the popup
  //   };

  return (
    <div className="popup-form">
      <form className="form-container">
        <Grid container className="form-grid">
          <Grid item xs={6}>
            <label htmlFor="Product_name">Product Name:</label>
            <TextField
              variant="filled"
              // label="Product Name"
              id="Product_name"
              name="Product_name"
              value={inpval.Product_name}
              onChange={getData}
            />
            <label htmlFor="Product_price">Product Price:</label>
            <TextField
              variant="filled"
              // label="Product Price"
              id="Product_price"
              name="Product_price"
              value={inpval.Product_price}
              onChange={getData}
            />
            <label htmlFor="Quantity">Quantity:</label>
            <TextField
              variant="filled"
              // label="Quantity"
              id="Quantity"
              name="Quantity"
              value={inpval.Quantity}
              onChange={getData}
            />
          </Grid>
          <Grid item xs={6}>
            {/* <Box sx={{ m: 1, minWidth: 70 }}> */}
            <FormControl
              className="form-control"
              // sx={{ m: 1, minWidth: 90 }}
              // size="small"
            >
              {/* <InputLabel id="units-label" className="select-label">
                Units
              </InputLabel> */}
              <label htmlFor="Units">Units:</label>
              <Select
                labelId="units-label"
                id="Units"
                value={inpval.Units}
                // label="Units"
                name="Units"
                variant="filled"
                onChange={getData}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="gm">gm</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="litre">litre</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="packets">packets</MenuItem>
              </Select>
            </FormControl>
            {/* </Box> */}

            <label htmlFor="Expiry_Date">Expiry Date:</label>
            <TextField
              className="Expiry_Date"
              variant="filled"
              // label="Product Name"
              id="Expiry_Date"
              name="Expiry_Date"
              value={inpval.Expiry_Date}
              onChange={getData}
            />

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={["DatePicker"]}> */}
            {/* <label htmlFor="Expiry_Date">Expiry Date:</label>
            <DateField
              className="datefield-container"
              inputClassName="datefield-input"
              labelClassName="datefield-label"
              variant="filled"
              id="Expiry_Date"
              // label="Expiry Date"
              name="Expiry_Date"
              format="YYYY-MM-DD"
              value={inpval.Expiry_Date}
              onChange={getData}
            /> */}
            {/* </DemoContainer> 
            </LocalizationProvider> */}

            {/* <div> */}
            <FormControl className="category-container">
              {/* sx={{ m: 1, minWidth: 70 }}> */}
              {/* <InputLabel id="category-label" className="category-label">
                Category
              </InputLabel> */}
              <label htmlFor="Category">Category:</label>
              <Select
                // className="category-container"
                // labelClassName="categoryfield-label"
                labelId="category-label"
                id="Category"
                variant="filled"
                name="Category"
                value={inpval.Category}
                onChange={getData}
                autoWidth
                // label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Vegetables">Vegetables</MenuItem>
                <MenuItem value="Dairy Products">Dairy products</MenuItem>
                <MenuItem value="Beverages & Cold Drinks">
                  Beverages & Cold Drinks
                </MenuItem>
                <MenuItem value="Bakery products">Bakery products</MenuItem>
                <MenuItem value="Snacks">Snacks</MenuItem>
                <MenuItem value="Medicines">Medicines</MenuItem>
              </Select>
            </FormControl>
            {/* </div> */}
          </Grid>
          <div className="button-container">
            <MuiButton
              className="btn"
              variant="contained"
              color="primary"
              size="large"
              // text="Submit"
              type="submit"
              onClick={addData}
            >
              Submit
            </MuiButton>
            <MuiButton
              className="btn"
              variant="contained"
              color="primary"
              size="large"
              // text="Submit"
              type="button"
              onClick={resetForm}
            >
              Reset
            </MuiButton>
          </div>
          <div className="close-button-container">
            <MuiButton
              className="closebtn"
              variant="contained"
              color="primary"
              size="large"
              // text="Submit"
              type="submit"
              onClick={() => {
                // setEditingIndex(null);
                setOpenPopup(false);
              }}
            >
              Close
              {/* {editingIndex !== null ? "Cancel" : "Close"} */}
            </MuiButton>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default ProductForm;
