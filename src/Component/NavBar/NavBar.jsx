import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthUser from "./../Auth/AuthUser";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { LuUserRoundPen } from "react-icons/lu";
import ColorFulLogo from "../../assets/Images/worldMirror_logo_colorful.png";
import "../NavBar/NavBar.css";
// import ColorFulLogo2 from "../../assets/Images/worldMirror_shortLogo_teal.png";
// import { RiUser4Line } from "react-icons/ri";

function NavBar() {
  const { getToken } = AuthUser();

  // const handleLogout = () => {
  //   setToken(null, null);
  // };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <img src={ColorFulLogo} style={{ height: "40px" }} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT SIDE */}
          <Nav className="ms-auto d-flex gap-2">
            <Nav.Link className="inter-font" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="inter-font" href="#link">
              Explore
            </Nav.Link>
            {/* Categories dropdown */}
            <NavDropdown
              className="inter-font"
              title={
                <>
                  Categories{" "}
                  <span style={{ fontSize: "15px" }}>
                    <IoIosArrowDown />
                  </span>
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Explore</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Categories</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            <Nav.Link className="inter-font" href="#link">
              About
            </Nav.Link>
            <Nav.Link className="inter-font" href="#link">
              Contact
            </Nav.Link>
          </Nav>

          {/* RIGHT SIDE */}
          <Nav className="ms-auto d-flex gap-3">
            <Nav.Link
              className="writeBlogButton inter-font"
              href="/writing-blog"
            >
              Write a blog
            </Nav.Link>
            {/* {getToken() ? (
              <Nav.Link
                className="border rounded bg-danger inter-font"
                as="button"
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="loginButton " as={Link} to="/login">
                Login
              </Nav.Link>
            )} */}

            {getToken() && (
              <Nav.Link
                as={Link}
                to="/profile"
                className="inter-font loginButton"
              >
                <LuUserRoundPen /> My Profile
              </Nav.Link>
            )}

            {!getToken() && (
              <Nav.Link
                as={Link}
                to="/login"
                className="inter-font loginButton"
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
