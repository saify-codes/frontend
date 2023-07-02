"use client"
import context from "@/context/context";
import "@/styles/Signin.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const page = () => {
  const [state, setState] = useState({ name: "", email: "", phone: "", password: "",signupseller:false });
  const [showpass, setshowpass] = useState(false)

  const onchangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  function togglePasswordVisibility() {
    setshowpass(!showpass)
  }
  const a = useContext(context);
  const signup = a.signup;
  const isloggedIn=a.isloggedin
  const loggedIn=a.loggedIn

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    signup(state);
  };
 
  useEffect(() => {
    if(loggedIn==="yes"){
        window.location.href="/"
    }
  })

  return (
    <div className="signin container-fluid">
      <div className="row">
        <div className="signup-left   col-md-6">
          {/* <h2 className="text">Bridging the gap in the black community</h2> */}
        </div>
        <div className="signin-right  col-md-6">
          <form onSubmit={onsubmitHandler} className="sign-form">
            <h2 className="login-head text-center my-4">Create Account</h2>
            <div className="text-muted mb-2">Let’s get started for free</div>
            <div className="form-group my-2">
            <label htmlFor="email">Name <span className="red">*</span></label>
              <input
                onChange={onchangeHandler}
                name="name"
                className="form-control"
                type="text"
                required
              />
            </div> 
            <div className="form-group my-2">
              <label htmlFor="email">Email <span className="red">*</span></label>
              <input
                onChange={onchangeHandler}
                name="email"
                className="form-control"
                type="email"
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="password">Password <span className="red">*</span></label>
              <div className="input-group pass-group">
                <input
                  onChange={onchangeHandler}
                  name="password"
                  className="form-control"
                  minLength="8"
                  id="passwordField"
                  type={!showpass ? "password" : "text"
                  }
                  style={{ border: "none" }}
                  required
                />
                <div className="cursor-pointer icon-pass" id="toggleButton"> <img id="eyeIcon" onClick={() => togglePasswordVisibility()} src={!showpass ? "../password-icon.svg" : "../password-icon2.svg"
                } alt="" /> </div>
                </div>
              <div className="input-info text-muted">Must be at least 8 characters</div>
            </div>
            <button type="submit" className="login-btn button btn mt-3">
              Sign up
            </button>
            <div className="google-logo-parent mx-auto">
              <img className="google-logo-icon" alt="" src="../google-logo@2x.png" />
              <div className="login-google mx-2">Sign up with Google</div>
            </div>
            <div className="forget-your-password-parent">
              <Link href={"/seller/signup"} className="forget-your-password">
                Join as a seller?
              </Link>
              <Link href={"/buyer/signin"} className="signup-for-new">Sign in to your account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
