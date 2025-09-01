/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AuthUser from "./../../Component/Auth/AuthUser";

const LoginPage = () => {
  const { http } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = () => {
    http.post("/login", { email: email, password: password }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Container className="mt-3">
      <h1 className="mb-3">Login Form</h1>
      <form>
        <div className="form-group">
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

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Submit
        </button>
      </form>
    </Container>
  );
};

export default LoginPage;
