import React, { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import axios from "../../api/axios";
import "./cashier.css";
import Navbar from "../Navbar";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import Home from "../Home";
import BASE_URL from "../../config";
import UpdateCashier from "./UpdateCashier";

// const BASE_URL = "http://192.168.177.25:8000/v1/";
const CASHIER_URL = BASE_URL + "addcashier/";
const LIST_CASHIER_URL = BASE_URL + "listcashiers/";
const DELETE_CASHIER_URL = BASE_URL + "deletecashiers/";

const Cashier = () => {
  const history = useNavigate();

  // const [newCashier, setNewCashier] = useState({

  //   name: "",
  //   mobileNumber: "",
  //   email: "",
  // });
  const [cashiers, setCashiers] = useState([]);
  const [inpval, setInpval] = useState({
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState("");

  const getData = (e) => {
    const { value, name } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  const addData = async (e) => {
    e.preventDefault();
    const { email } = inpval;

    // const validationErrors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
    } else {
      setErrors("");
    }

    // setErrors(validationErrors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios
          .post(CASHIER_URL, JSON.stringify({ email: inpval.email }), {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              alert("Email sent successfully...!!!");
              setShowPopup(false);
            }
          });
      } catch (error) {
        console.error("Error adding cashier:", error);
      }
      // catch (errors) {
      //   if (!errors?.response) {
      //     setErrors("No server response");
      //   } else {
      //     setErrors("Failed");
      //   }
      // }
    }
  };

  useEffect(() => {
    // Fetch cashier data from backend
    fetchCashiers();
  }, []);

  const fetchCashiers = async () => {
    try {
      const response = await axios.get(LIST_CASHIER_URL); //
      setCashiers(response.data);
    } catch (error) {
      console.error("Error fetching cashiers:", error);
    }
  };

  const deleteCashier = async (id) => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this cashier?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(DELETE_CASHIER_URL, { data: { id } });
          await fetchCashiers();
          Swal.fire(
            "Deleted!",
            "Cashier data has been deleted successfully.",
            "success!"
          );
        }
      });
    } catch (error) {
      console.error("Error deleting cashier:", error);
    }
  };

  // const updateCashier = async (id) => {
  //   try {
  //     await axios.put(`/cashiers/${id}`, newCashier); //
  //     await fetchCashiers();
  //     setEditingIndex(null);
  //     setShowPopup(false);
  //     Swal.fire({
  //       text: "Cashier updated successfully!",
  //       icon: "success",
  //     });
  //   } catch (error) {
  //     console.error("Error updating cashier:", error);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewCashier({
  //     ...newCashier,
  //     [name]: value,
  //   });
  // };

  return (
    <>
      <Navbar />
      <Home />
      <UpdateCashier />
      <div className="body">
        <div className="addbtn">
          <button
            onClick={() => setShowPopup(true)}
            className="add-cashier-btn"
          >
            Add Cashier
          </button>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="addmailtext">Add Cashier</h2>

              <TextField
                className="email-field"
                variant="filled"
                // type="text"
                name="email"
                required
                autoFocus
                value={inpval.email}
                onChange={getData}
                label="Email"
              />
              {errors && (
                <span style={{ color: "red" }}>
                  <br></br>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {errors.email}{" "}
                </span>
              )}

              {showUsernameInput && (
                <TextField
                  className="username-field"
                  variant="filled"
                  name="username"
                  required
                  autoFocus
                  value={inpval.username}
                  onChange={getData}
                  label="Username"
                />
              )}

              <div className="btncontainer">
                <MuiButton
                  className="send-email-btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={addData}
                  type="submit"
                >
                  Submit
                </MuiButton>

                <MuiButton
                  className="close"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    setEditingIndex(null);
                    setShowPopup(false);
                    setShowUsernameInput(false);
                  }}
                >
                  {editingIndex !== null ? "Cancel" : "Close"}
                </MuiButton>
              </div>
            </div>
          </div>
        )}

        <div className="border-box">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>Sr no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cashiers.map((cashier, index) => (
                <tr key={cashier.id}>
                  <td>{index + 1}</td>
                  <td>{cashier.username}</td>
                  <td>{cashier.email}</td>
                  <td>
                    <button
                      className="update"
                      onClick={() => {
                        setShowPopup(true);
                        setShowUsernameInput(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteCashier(cashier.id)}
                    >
                      Delete
                    </button>
                    {/* <button2 onClick={handleDelete}>Delete</button2> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cashier;
