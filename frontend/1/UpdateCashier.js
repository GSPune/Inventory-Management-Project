import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import BASE_URL from "../../config";
import "./cashier.css";

// const BASE_URL = "http://192.168.177.25:8000/v1/";
const UPDATE_CASHIER_URL = BASE_URL + "cashier/update/";

const UpdateCashier = (cashier) => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [cashiers, setCashiers] = useState([]);
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  const [inpval, setInpval] = useState({
    username: "",
    email: "",
  });

  // var currentCashierID = "";

  const [errors, setErrors] = useState({});

  const getData = (e) => {
    const { value, name } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const handleUpdate = async (e) => {
    // const handleUpdate = async (cashier) => {
    e.preventDefault(); //to prevent the form from reloading the page.
    const { username, email } = inpval;

    //   currentCashierID = cashier.id;
    //  console.log(cashier.id);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return; // exit if there are validation errors
    } else {
      setErrors({});
    }

    if (Object.keys(errors).length === 0) {
      // if(cashier.id == ''){
      try {
        const response = axios.put(
          UPDATE_CASHIER_URL,
          JSON.stringify({ username, email })
        );
        console.log(response.data);
        if (response.status === 200) {
          alert("Cashier updated successfully...!!!");
          setShowPopup(false);
        }
      } catch (errors) {
        if (!errors?.response) {
          setErrors("No server response");
        } else {
          setErrors("Failed");
        }
      }
    }
    //}
    return (
      <>
        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2 className="updatecashiertext">Update Cashier</h2>

              <TextField
                className="name-field"
                variant="filled"
                // type="text"
                name="username"
                required
                autoFocus
                value={inpval.username}
                onChange={getData}
                label="Name"
              />

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
              {errors.email && (
                <span style={{ color: "red" }}>
                  <br></br>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {errors.email}{" "}
                </span>
              )}

              <div className="btncontainer">
                <MuiButton
                  className="update-btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleUpdate}
                  // onClick={handleUpdate(cashier)}
                  type="submit"
                >
                  Update
                </MuiButton>

                <MuiButton
                  className="close"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    setEditingIndex(null);
                    setShowPopup(false);
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
                      // onClick={() => deleteCashier(cashier.id)}
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
      </>
    );
  };
};

export default UpdateCashier;
