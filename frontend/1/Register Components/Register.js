import React, { useRef, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./register.css";
import { NavLink } from "react-router-dom";
import Logo from "./logo.png";
import axios from "../api/axios";
import BASE_URL from "../config";

// import Swal from 'sweetalert2'

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = BASE_URL + "signup/";
const LIST_CASHIER_URL = BASE_URL + "listcashiers/";

const Register = ({ cashiers, setCashiers }) => {
  // const userRef =useRef();
  const errRef = useRef();
  // const [cashiers, setCashiers] = useState([]);

  // const [user, setUser] = useState('');
  // const [validName , setValidName] = useState(false);
  // const [userFocus , setUserFocus] = useState(false);

  // const [pwd, setPwd] = useState('');
  // const [validPwd, setValidPwd] =useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd,setMatchPwd] = useState('');
  // const [validMatch, setValidMatch] =useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  // const [successful, setSuccessful] = useState(false);

  // const [offscreen,setOffscreen] = useState('');

  //  useEffect(() => {
  //   errRef.current.focus();
  // }, [])

  // useEffect(() => {
  //   const result = USER_REGEX.test(user);
  //   console.log(result);
  //   console.log(user);
  //   setValidName(result);
  // }, [user])

  // useEffect(() => {
  //   const result = PWD_REGEX.test(pwd)
  //   console.log(result);
  //   console.log(pwd);
  //   setValidPwd(result);
  //   const match = pwd === matchPwd;
  //   setValidMatch(match);
  // },[pwd , matchPwd])

  //  useEffect(() => {
  //     //reset error message when username changes
  //     setErrMsg('');
  //   }, [user, pwd, matchPwd])

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const v1 = USER_REGEX.test(user);
  //     const v2 = PWD_REGEX.test(pwd);
  //     if(!v1 || !v2) {
  //       setErrMsg("Invalid Entry");
  //       return;
  //     }
  //     // JSX will show success msg when registration is successful
  //     console.log(user , pwd);
  //     setSuccessful(true);
  //   }
  // const [cashiers, setCashiers] = useState([]);
  const [inpval, setInpval] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "c2h1YmhhZGFrdW5kZThAZ21haWwuY29t",
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

    const { username, password, confirm_password, email } = inpval;

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

    if (inpval.confirm_password !== inpval.password) {
      validationErrors.confirm_password = "Password not matched!";
    }
    //else {
    // console.log("data added successfully")
    //   localStorage.setItem("user-register" , JSON.stringify([...data,inpval]));      //to store values in local storage we pass a key to function and in which form we wnt to store the values.....here we are storing values in the form of JSON
    //}

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          REGISTER_URL,
          // JSON.stringify([...data, inpval]),
          JSON.stringify({
            username,
            password,
            confirm_password,
            email,
          }),
          {
            headers: { "Content-Type": "application/json" },
            // withCredentials: true,
          }
        );
        // .then((response) => {
        //   console.log(response.data);
        if (response.status === 200) {
          const cashierResponse = await axios.get(LIST_CASHIER_URL);
          setCashiers(cashierResponse.data);
          alert("Account created successfully!");
        }
      } catch (errors) {
        // console.log(response.data);
        // console.log(response.accessToken);
        // console.log(JSON.stringify(response?.data));
        // console.log("Form submitted successfully!");
        // alert("Account created successfully!");
        if (!errors?.response) {
          setErrors("No server response");
        } else if (errors.response?.status === 409) {
          setErrors("username taken");
        } else {
          setErrors("Registration failed!");
        }
        // errRef.current.focus();
        console.log("Form submitted successfully!");
        // alert("Account created successfully!");
      }
    }
  };

  // const handleSuccessClick = () => {
  // Swal.fire('Success!','Account created successfully!','success')
  // }

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
              <h3>Sign Up</h3>

              {/*<form onSubmit={handleSubmit}> */}
              <div className="username">
                <label className="form_label" htmlFor="username">
                  Username:
                  {/* <span className = {validName ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} />
            </span>
           <span className = {validName || !user ? "hide" : "invalid"}></span> */}
                </label>
                <input
                  className="form_input"
                  type="text"
                  id="username"
                  placeholder="username"
                  // ref={userRef}
                  autoComplete="off" //we dont want previous existing values when new user register
                  onChange={getData}
                  name="username"
                  required
                  autoFocus
                  // aria-invalid={validName ? false : true}
                  // aria-describedby="uidnote"
                  // onFocus={() => setUserFocus(true)}
                  // onBlur={() => setUserFocus(false)}
                />
                {errors.username && (
                  <span style={{ color: "red" }}>
                    <br></br>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {errors.username}
                  </span>
                )}
              </div>

              {/* <p 
            id= "uidnote" className={(userFocus || (user && 
            !validName)) ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            5 to 24 characters.<br/>
            must begin with a letter.<br/>
            Letters, numbers, underscores, hyphens allowed.
          </p> */}
              <div className="create-password">
                <label className="form_label" htmlFor="password">
                  Create Password:
                  {/* <span className = {validPwd ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} />
            </span>
           <span className = {validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
           </span> */}
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
                  // aria-invalid={validPwd ? "false" : "true"}
                  // aria-describedby="pwdnote"
                  // onFocus={() => setPwdFocus(true)}
                  // onBlur={() => setPwdFocus(false)}
                />

                {errors.password && (
                  <span style={{ color: "red" }}>
                    <br></br>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {errors.password}
                  </span>
                )}
              </div>
              {/* <p 
            id= "pwdnote" className={(pwdFocus ||  (!validPwd && pwd)) ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            8 to 24 characters.<br/>
            Must include uppercase and lowecase letters,<br/> a number and a special character.<br/>
            Allowed special character:<span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p> */}

              <div className="confirm-password">
                <label className="form_label" htmlFor="confirm_pwd">
                  Confirm Password:
                </label>

                <input
                  className="form_input"
                  type="password"
                  id="confirm_pwd"
                  placeholder="********"
                  onChange={getData}
                  name="confirm_password"
                  required
                  autoFocus
                  // aria-invalid={validMatch ? "false" : "true"}
                  // aria-describedby="confirmnote"
                  // onFocus={() => setMatchFocus(true)}
                  // onBlur={() => setMatchFocus(false)}
                />
                {errors.confirm_password && (
                  <span style={{ color: "red" }}>
                    <br></br>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {errors.confirm_password}{" "}
                  </span>
                )}
              </div>

              <div className="button" button onClick={addData} type="submit">
                Sign Up
              </div>
            </div>

            {/* </form>  */}

            <div className="login_signup">
              Already have an account ?{/* put react router link here */}
              <span>
                <NavLink to="/">Sign In</NavLink>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
