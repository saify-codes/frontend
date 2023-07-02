"use client"
import context from "@/context/context";
import "@/styles/Signin.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const page = () => {
  const [state, setState] = useState({ name: "", email: "", phone: "", password: "" });
  const [showpass, setshowpass] = useState(false)

  const onchangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const a = useContext(context);
  const login = a.login;
  const loggedIn = a.loggedIn;

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    login(state);
  };
  useEffect(() => {
    if (loggedIn === "yes") {
      window.location.href = "/"
    }
  })
  function togglePasswordVisibility() {
    setshowpass(!showpass)
  }

  return (
    <div className="signin container-fluid">
      <div className="row">
        <div className="signin-left col-md-6">
          {/* <h2 className="text">Bridging the gap in the black community</h2> */}
        </div>
        <div className="signin-right col-md-6">
          <form onSubmit={onsubmitHandler} className="sign-form">
            <h2 className="login-head text-center my-4">Login</h2>
            <div className="form-group my-2">
              <label htmlFor="email">Email</label>
              <input
                onChange={onchangeHandler}
                name="email"
                className="form-control"
                type="email"
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="password">Password</label>
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
              Sign in
            </button>
            <div className="google-logo-parent mx-auto">
              <img className="google-logo-icon" alt="" src="../google-logo@2x.png" />
              <div className="login-google mx-2">Sign in with Google</div>
            </div>
            <div className="forget-your-password-parent">
              <Link href={"/seller/signup"} className="forget-your-password">
                Join as a seller?
              </Link>
              <Link href={"/buyer/signup"} className="signup-for-new">Sign up to your account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
