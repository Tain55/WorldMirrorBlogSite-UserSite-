import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import NavBar from "./Component/NavBar/NavBar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RegisterPage from "./Pages/RegistrationPage/RegisterPage";
import WriteBlog from "./Pages/WriteBlog/WriteBlog";
import SingleBlog from "./Pages/SinglePage/SingleBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/writing-blog" element={<WriteBlog />} />
          <Route path="/blog/:slug" element={<SingleBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
