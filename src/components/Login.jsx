import React from "react";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [noti, setNoti] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    mobileNo: "",
  });

  const submitDetailsHandler = async (e) => {
    e.preventDefault();
    let resp = await axios.post(`http://localhost:8080/users`, signUpDetails);
    console.log(resp);
    if (resp.status == 200) {
      setNoti(resp.data.message);
    } else {
      setNoti("Error");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let resp = await axios.post(`http://localhost:8080/login`, credentials);

    console.log(resp)

    if (resp.data.success == true) {
      let data = resp.data;
      auth.setToken(data.accessToken);
      auth.setRole(data.role);
      auth.setUserInfo(data.products)
      setNoti(data.message);
      if (data.role === "Admin") {
        navigate(`/app/users`);
      } else {
        navigate("/app/products");
      }
    } else {
      setNoti(resp.data.message);
    }
  };

  return (
    <>
      {noti ? <h2 style={{textAlign:"center"}}>{noti}</h2> : null}

      <div className="signIn">
        <div className="login">
          <form className="form">
            <h1 style={{textAlign:"center",fontFamily:"Roboto"}}>Log In</h1>
            <input
              type="text"
              name="username"
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Enter username"
            />
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Enter password"
            />
            <button
              type="submit"
              style={{
                width: "80px",
                height: "40px",
                border: "1px solid rgba(0,0,0,0.5)",
                marginLeft: "15px",
              }}
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="signUp">
          <form className="form">
            <h1 style={{textAlign:"center",fontFamily:"Roboto"}}>Sign Up</h1>
            <input
              type="text"
              name="firstName"
              onChange={(e) => {
                setSignUpDetails({
                  ...signUpDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              onChange={(e) => {
                setSignUpDetails({
                  ...signUpDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="username"
              onChange={(e) => {
                setSignUpDetails({
                  ...signUpDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setSignUpDetails({
                  ...signUpDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Password"
            />
            <input
              type="number"
              name="mobileNo"
              onChange={(e) => {
                setSignUpDetails({
                  ...signUpDetails,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Mobile No."
            />
            <small style={{fontWeight:"bold"}}>Already have an account? Try Logging In</small>
            <button
              type="submit"
              style={{
                width: "80px",
                height: "40px",
                border: "1px solid rgba(0,0,0,0.5)",
                marginLeft: "15px",
                marginTop:"10px"
              }}
              onClick={(e) => submitDetailsHandler(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
