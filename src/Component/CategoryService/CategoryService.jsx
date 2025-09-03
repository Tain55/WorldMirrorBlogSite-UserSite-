import axios from "axios";

export default function CategoryService() {
  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getCategories = () => http.get("categories");

  return { getCategories };
}
