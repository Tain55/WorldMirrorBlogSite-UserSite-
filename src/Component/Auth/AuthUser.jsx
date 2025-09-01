import axios from "axios";

export default function AuthUser() {
  const http = axios.create({
    baseUrl: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
    },
  });

  return {
    http,
  };
}
