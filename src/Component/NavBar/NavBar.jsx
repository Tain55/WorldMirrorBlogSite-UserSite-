import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../NavBar/NavBar.css";
import AuthUser from "./../Auth/AuthUser";
import { Link } from "react-router-dom";

function NavBar() {
  const { getToken, setToken } = AuthUser();

  const handleLogout = () => {
    setToken(null, null);
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">World Mirror</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT SIDE */}
          <Nav className="ms-auto ">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link
              className="bg-secondary rounded border texttt"
              href="/writing-blog"
            >
              Write a blog
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* RIGHT SIDE */}
          <Nav className="ms-auto">
            {getToken() ? (
              <Nav.Link
                className="border rounded bg-danger"
                as="button"
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                className="border rounded bg-info"
                as={Link}
                to="/login"
              >
                Login
              </Nav.Link>
            )}

            {getToken() && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}

            {!getToken() && (
              <Nav.Link as={Link} to="/registration">
                Registration
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
