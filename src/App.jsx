import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import NavBar from "./Component/NavBar/NavBar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RegisterPage from "./Pages/RegistrationPage/RegisterPage";
import WriteBlog from "./Pages/WriteBlog/WriteBlog";
import SingleBlog from "./Pages/SinglePage/SingleBlog";
import FooterView from "./Component/Footer/FooterView";
import SearchPage from "./Pages/SearchPage/SearchPage";
import InputPage from "./Pages/InputPage/InputPage";
import InputPageOld from "./Pages/InputPage/InputPageComplete";

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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/input-old" element={<InputPageOld />} />
        </Routes>
        <FooterView />
      </BrowserRouter>
    </>
  );
}

export default App;
