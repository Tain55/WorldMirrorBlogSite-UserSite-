/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AuthUser from "./../../Component/Auth/AuthUser";

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
      <h1 className="mb-3">Registration Form</h1>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>

        <button type="button" className="btn btn-primary" onClick={submitForm}>
          Submit
        </button>
      </form>
    </Container>
  );
};

export default RegisterPage;
