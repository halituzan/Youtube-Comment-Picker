import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import LanguageSelect from "./LanguageSelect";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" expand="sm" className="position-sticky nav-menu mb-3 w-100 text-white">
        <Container>
          <Navbar.Brand href="/" className="logo">
            <img src="../assets/logo.png" alt="logo" />
            Socials Comments Picker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbarLabel-expand-sm" />
          <Navbar.Offcanvas
            id="offcanvasNavbarLabel-expand-sm"
            aria-labelledby="offcanvasNavbarLabel-expand-sm"
            placement="end"
          >
            <Offcanvas.Header closeButton className="m-auto">
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                Socials Comments Picker
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                <Nav.Link href="/youtube" className="socials">Youtube</Nav.Link>
                {/* <Nav.Link href="/instagram" className="socials">Instagram</Nav.Link> */}
                <LanguageSelect />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
     
    </>
  );
};

export default Header;
