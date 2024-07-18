import axios from "../api/axios";
import React, { useState, useEffect, useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import { useCookies } from "react-cookie";
import "./login.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo.png";
import BASE_URL from "../config";

// const LOGIN_URL = "http://192.168.129.25:8000/v1/login/";
const LOGIN_URL = BASE_URL + "login/";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);

  const history = useNavigate(); //to redirect after login ....whenever we want to do routing and want to go on any page

  const [inpval, setInpval] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState([]);

  console.log(inpval);

  const [errors, setErrors] = useState("");

  const getData = (e) => {
    // console.log(e.target.value);
    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval, //spread operator we goes on add data and it will continue to add ....
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();
    console.log(inpval);

    // const getuserArr = localStorage.getItem("user-register");
    // console.log(getuserArr);

    const { username, password } = inpval;

    const validationErrors = {};

    if (!inpval.username.trim()) {
      validationErrors.username = "username is required";
    } else if (inpval.username.length < 5) {
      validationErrors.username = "Username should be atleast 5 characters.";
    }

    if (!inpval.password.trim()) {
      validationErrors.password = "password is required";
    } else if (inpval.password.length < 8) {
      validationErrors.password =
        "Password should be atleast 8 to 24 characters.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios
          .post(LOGIN_URL, JSON.stringify({ username, password }), {
            headers: { "Content-Type": "application/json" },
            // withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) alert("Login sucess...!!!");

            history("/dashboard");
          });

        // console.log(JSON.stringify(response?.data));
        // // console.log(JSON.stringify(response));
        // const accessToken = response?.data?.accessToken;
        // const roles = response?.data?.roles;
        // setAuth({ username, password, roles, accessToken });
        // setInpval({ username: "", password: "" });
        // history.push("/home");
      } catch (errors) {
        if (!errors?.response) {
          setErrors("No server response");
        } else if (errors.response?.status === 401) {
          setErrors("Unauthorized");
        } else {
          setErrors("Login Failed");
        }
      }
    }

    // console.log("Before redirection");
    // history("/home");
    // console.log("After redirection");
  };

  //    else {
  //   if (getuserArr && getuserArr.length) {
  //     const userdata = JSON.parse(getuserArr);
  //     const userlogin = userdata.filter((el, k) => {
  //       return el.username === username && el.create_password === password;
  //     });

  // if (userlogin.length === 0) {
  //   alert("Invalid details");
  // } else {
  //   console.log("user login successful!");
  //   history("/home"); // redirecting to home page after user login
  // }

  //   if(Object.keys(validationErrors).length === 0){
  //     alert("Account created successfully!")
  //   }

  const handleReset = async () => {};

  return (
    <>
      <section className="home">
        <div className="logo">
          <img src={Logo} alt="" />
          <span>INvento</span>
        </div>
        <div className="container">
          <div className="form">
            <div className="form-body">
              <h3>Sign In</h3>
              <div className="username">
                <label className="form_label" htmlFor="username">
                  Username:
                </label>
                <input
                  className="form_input"
                  type="text"
                  id="username"
                  placeholder="username"
                  autoComplete="off" //we dont want previous existing values when new user register
                  onChange={getData}
                  name="username"
                  required
                  autoFocus
                />
                {errors.username && (
                  <span style={{ color: "red" }}>
                    <br></br>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {errors.username}{" "}
                  </span>
                )}
              </div>
              <div className="password">
                <label className="form_label" htmlFor="password">
                  Password:
                </label>
                <input
                  className="form_input"
                  type="password"
                  id="password"
                  placeholder="********"
                  onChange={getData}
                  name="password"
                  required
                  autoFocus
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    <br></br>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {errors.password}{" "}
                  </span>
                )}

                <div className="button" button onClick={addData} type="submit">
                  Sign In
                </div>
                <br></br>
                <div>
                  <span>
                    <NavLink to="/forgotpassword">Forgot Password?</NavLink>
                  </span>
                </div>
              </div>
              {/* <div className="footer" button onClick={addData} type="submit" class="btn">
            Sign Up
        </div>   */}
            </div>

            {/* </form>  */}

            <div className="login_signup">
              Don't have an account ?{/* put react router link here */}
              <span>
                <NavLink to="/register">Sign Up</NavLink>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
