import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const userData = JSON.parse(userString);
    return userData;
  };

  //declearing functions after creating them
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate("/");
  };

  // const logout = () => {
  //   if (!token) return; // token না থাকলে কিছু হবে না

  //   http
  //     .post(
  //       "/logout",
  //       {}, // empty body
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("You are logged out.");

  //       // clear session and state
  //       sessionStorage.clear();
  //       setToken(null);
  //       setUser(null);

  //       // redirect
  //       navigate("/login");
  //     })
  //     .catch((err) => {
  //       console.error("Logout error:", err.response?.data || err.message);
  //       alert("Logout failed!");
  //     });
  // };

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    setToken: saveToken, //ekhane setToken er moddhe saveToken er sob information rakha holo
    token,
    user,
    getToken,
    http,
    // logout,
  };
}
