import axios from "axios";
import AuthUser from "./../Auth/AuthUser";

export default function BlogService() {
  const { getToken } = AuthUser();
  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      "Content-Type": "application/json",
      // Authorization header direct sessionStorage theke
      Authorization: `Bearer ${getToken()}`,
      // ekhane authenticaion hobe na, eta jokhon post kora hocche useEffect e gie hobe
    },
  });

  const getBlogs = () => http.get("allblogs");
  const getBlog = (slug) => http.get(`blogs/${slug}`);
  const createBlog = (data) => http.post("blogs", data);
  const updateBlog = (id, data) => http.put(`blogs/${id}`, data);
  const deleteblog = (slug) => http.delete(`deleteblog/${slug}`);
  //get personal blogs
  const getYourBlog = (id) => http.get(`yourblog/${id}`);

  return {
    getBlog,
    getBlogs,
    createBlog,
    updateBlog,
    deleteblog,
    getYourBlog,
  };
}
