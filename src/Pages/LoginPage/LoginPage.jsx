/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AuthUser from "./../../Component/Auth/AuthUser";
import "../LoginPage/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = (e) => {
    e.preventDefault(); //page reload hobe na
    http
      .post("auth/login", { email, password })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.user, res.data.access_token);
        alert("You are logged in.");
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err.message);
        alert("Login Failed!");
      });
  };

  return (
    <Container className="mt-3 ">
      <form className="formField mt-5 ms-auto me-auto">
        <h1 className="mt-3 mb-2 loginHeading poppins-semibold">Login</h1>
        <div className="form-group ">
          <input
            type="email"
            className="form-control custom-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control custom-input"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="LoginBtn poppins-semibold "
          onClick={submitForm}
        >
          Login
        </button>
        <p style={{ textAlign: "center " }} className="inter-font">
          Don't have an accout?{" "}
          <Link
            to="/registration"
            style={{ textDecoration: "none", color: "#4979eb" }}
          >
            <span style={{ fontWeight: "bold" }}>Sign up</span>
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default LoginPage;
