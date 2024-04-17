import React, { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import axios from "../../api/axios";
// import AuthContext from "../context/AuthProvider";
import "./cashier.css";
import Navbar from "../Navbar";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import Home from "../Home";

const CASHIER_URL = "http://192.168.129.25:8000/v1/addcashier/";
const LIST_CASHIER_URL = "http://192.168.129.25:8000/v1/listcashiers/";

const Cashier = () => {
  // const { setAuth } = useContext(AuthContext);
  const history = useNavigate();

  // const [newCashier, setNewCashier] = useState({

  //   name: "",
  //   mobileNumber: "",
  //   email: "",
  // });
  const [cashiers, setCashiers] = useState([]);
  const [inpval, setInpval] = useState({
    username: "",
    // mobileNumber: "",
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

  const addData = async (e) => {
    e.preventDefault();
    const { email } = inpval;

    // const validationErrors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
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
              // Send email
              // sendEmail(email);
              // history("/cashier");
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
    // Fetch cashier data from backend when component mounts
    fetchCashiers();
  }, []);

  const fetchCashiers = async () => {
    try {
      const response = await axios.get(LIST_CASHIER_URL); // Replace with your backend API endpoint
      setCashiers(response.data);
    } catch (error) {
      console.error("Error fetching cashiers:", error);
    }
  };

  // const addCashier = async () => {
  //   try {
  //     // Send email to backend
  //     await axios.post("/api/send-email", newCashier); // Replace "/api/send-email" with your backend API endpoint for sending emails
  //     // Once email is sent, add cashier as usual
  //     await axios.post("/cashiers", newCashier); // Replace with your backend API endpoint for adding cashiers
  //     await fetchCashiers();
  //     setNewCashier({ name: "", mobileNumber: "", email: "" });
  //     setShowPopup(false);
  //     Swal.fire("Success!", "Cashier added and email sent.", "success");
  //   } catch (error) {
  //     console.error("Error adding cashier or sending email:", error);
  //     Swal.fire("Error!", "An error occurred.", "error");
  //   }
  // };

  // const deleteCashier = async (id) => {
  //   try {
  //     await axios.delete(`/cashiers/${id}`); // Replace with your backend API endpoint
  //     await fetchCashiers();
  //     Swal.fire(
  //       "Deleted!",
  //       "Cashier data has been deleted successfully.",
  //       "success"
  //     );
  //   } catch (error) {
  //     console.error("Error deleting cashier:", error);
  //   }
  // };

  // const updateCashier = async (id) => {
  //   try {
  //     await axios.put(`/cashiers/${id}`, newCashier); // Replace with your backend API endpoint
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

  // useEffect(() => {
  //   fetchCashiers();
  // }, []);

  // const fetchCashiers = async () => {
  //   try {
  //     const response = await axios.get(LIST_CASHIER_URL);
  //     setCashiers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching cashiers:", error);
  //   }
  // };

  return (
    <>
      <Navbar />
      <Home />
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
              <h2 className="addmailtext">
                Add Email
                {/* {editingIndex !== null ? "Update Cashier" : "Add Cashier"} */}
              </h2>
              {/* <input
                type="text"
                name="name"
                value={newCashier.name}
                onChange={handleInputChange}
                placeholder="Cashier Name"
              />
              <input
                type="tel"
                name="mobileNumber"
                value={newCashier.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile Number"
              /> */}
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

              <div className="btncontainer">
                <MuiButton
                  className="send-email-btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={addData}
                  type="submit"
                >
                  {/* // editingIndex !== null
                    //   ? () => updateCashier(cashiers[editingIndex].id)
                    //   : addCashier */}
                  Send Email
                  {/* {editingIndex !== null ? "Update" : "Send Email"} */}
                </MuiButton>
                {/* </div>
              <div className="clsbtn-container"> */}
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
                {/* <th>Mobile no</th> */}
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cashiers.map((cashier, index) => (
                <tr key={cashier.id}>
                  <td>{index + 1}</td>
                  <td>{cashier.username}</td>
                  {/* <td>{cashier.mobileNumber}</td> */}
                  <td>{cashier.email}</td>
                  {/* <td>
                    <button
                      onClick={() => {
                        setInpval(cashier);
                        setEditingIndex(index);
                        setShowPopup(true);
                      }}
                    >
                      Update
                    </button>
                    <button onClick={() => deleteCashier(cashier.id)}>
                      Delete
                    </button>
                  </td> */}
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
