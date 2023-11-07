import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoadingSpinner = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParamValue = queryParams.get("code");
    // console.log("para",queryParamValue)

    loginApi(queryParamValue);
  }, [location]);

  const loginApi = async (queryParamValue) => {
    const url =
      "http://localhost:5000/auth/" + location.pathname.includes("google")
        ? "google"
        : "facebook";

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        code: queryParamValue,
      }),
    };

    const res = await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log("response",data)
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="progressbar"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--bg-color-type1)",
      }}
    >
      <div style={{ fontSize: "24px", color: "var(--text-color1)" }}>
        .....Loading
      </div>
    </div>
  );
};

export default LoadingSpinner;
