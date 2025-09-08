/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AuthUser from "./../../Component/Auth/AuthUser";
import "../LoginPage/LoginPage.css";

const RegisterPage = () => {
  const { http } = AuthUser();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  const submitForm = (e) => {
    e.preventDefault(); //page reload hobe na
    http
      .post("auth/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      })
      .then((res) => {
        console.log(res.data);
        alert("Sucessfully registered");
      })
      .catch((err) => {
        console.log(
          "Registration error data:",
          JSON.stringify(err.response?.data, null, 2)
        );
        alert("Registration Faield.");
      });
  };

  return (
    <Container className="mt-3">
      <form className="formField mt-5 mb-5 pb-5 ms-auto me-auto">
        <h1 className="mt-3 mb- loginHeading poppins-semibold">Sign Up</h1>
        <div className="form-group">
          <label className="poppins-regular" style={{}}>
            Your Name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="poppins-regular">Email address</label>
          <input
            type="email"
            className="form-control custom-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label className="poppins-regular">Password</label>
          <input
            type="password"
            className="form-control custom-input"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="poppins-regular">Confirm Password</label>
          <input
            type="password"
            className="form-control custom-input"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="LoginBtn poppins-semibold "
          onClick={submitForm}
        >
          Sign Up
        </button>
      </form>
    </Container>
  );
};

export default RegisterPage;
