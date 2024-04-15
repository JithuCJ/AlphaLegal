import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="p-3">
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <img src="/external/logo.png" alt="logo" height={"30rem"} />
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Services</Nav.Link>
            <Nav.Link href="/">Career</Nav.Link>
          </Nav>
          <Nav className="gap-3">
            <Button variant="primary">
              {" "}
              <Nav.Link href="/login" style={{ color: "white" }}>
                Login
              </Nav.Link>
            </Button>

            <Button variant="primary">
              {" "}
              <Nav.Link href="/register" style={{ color: "white" }}>
                Register
              </Nav.Link>{" "}
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
