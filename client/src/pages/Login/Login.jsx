import React, { useState } from "react";
import "./Login.css";
import SignUp from "../SignUp/SignUp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginApi } from "../../context/api";
import { LoginValidation } from "../../utils/UserValidation";

const Login = () => {
  const [isLogin, SetIsLogin] = useState(true);
  const [loginCred, SetLoginCred] = useState({
    email: "",
    password: "",
  });
  const [loginError, SetLoginError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    SetLoginCred({ ...loginCred, [name]: value });
  };

  // const {loading, error, refetch } = useFetch(LoginApi,"POST",loginCred);

  const handleSubmit = async () => {
    // console.log(loginCred)
    const errors = LoginValidation(loginCred);
    // console.log(errors)
    if (Object.keys(errors).length === 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(loginCred),
      };

      try {
        const res = await fetch(LoginApi, options)
          .then((res) => res.json())
          .then((data) => data);
        if (res.token) {
          localStorage.setItem("token", res.token);
          navigate("/");
        } else {
          console.log("error", res);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      SetLoginError(errors);
    }
  };

  const googleLogin = () => {
    const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;

    const redirectUri = import.meta.env.VITE_REACT_APP_REDIRECT_URI;
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
      scopes.join(" ")
    )}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_id=${encodeURIComponent(
      clientId
    )}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  const facebookLogin = () => {
    const clientId = import.meta.env.VITE_REACT_APP_FACEBOOK_CLIENT_ID;

    const redirectUri = import.meta.env.VITE_REACT_APP_FACEBOOK_REDIRECT_URI;
    const scopes = ["email", "public_profile"];
    const authUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code`;
    window.location.href = authUrl;
  };

  const loaction = useLocation();

  return (
    <div className="login-wrapper">
      <div className="login">
        <div className="login-signUp-nav">
          <Link
            to="/login"
            className={
              loaction.pathname === "/login"
                ? "link-signUp-style active-sec"
                : "link-signUp-style"
            }
            onClick={() => SetIsLogin(true)}
          >
            Login
          </Link>
          <Link
            to="/signUp"
            className={
              loaction.pathname === "/signUp"
                ? "link-signUp-style active-sec"
                : "link-signUp-style"
            }
            onClick={() => SetIsLogin(false)}
          >
            SignUp
          </Link>
        </div>
        <div className="login-body">
          {isLogin && location.pathname === "/login" ? (
            <>
              <div className="login-ep">
                <input
                  type="text"
                  placeholder="Enter Email Id"
                  className="login-field"
                  name="email"
                  value={loginCred.email}
                  onChange={handleInput}
                />
                {loginError.email && (
                  <span className="loginError">{loginError.email}</span>
                )}

                <input
                  type="text"
                  placeholder="Enter Password"
                  className="login-field"
                  name="password"
                  value={loginCred.password}
                  onChange={handleInput}
                />
                {loginError.password && (
                  <span className="loginError">{loginError.password}</span>
                )}
                <button className="login-btn" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <div className="signUp-link">
                Don't have an account?
                <Link
                  to="/signUp"
                  className="signUp-link-1"
                  onClick={() => SetIsLogin(false)}
                >
                  {" "}
                  SignUp
                </Link>
              </div>
            </>
          ) : (
            <>
              <SignUp />
            </>
          )}
          <p style={{ textAlign: "center", color: "var(--text-color1)" }}>
            ---------- or ----------
          </p>
          <button onClick={googleLogin} className="google-fb-btn">
            {" "}
            <img
              className="fb-icon"
              src="https://image.similarpng.com/very-thumbnail/2020/12/Illustration-of-Google-icon-on-transparent-background-PNG.png"
              alt=""
            />{" "}
            Login with Google
          </button>
          <button onClick={facebookLogin} className="google-fb-btn fb-btn-clr">
            {" "}
            <img
              className="fb-icon"
              src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
              alt=""
            />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
