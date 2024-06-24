"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from "react-bootstrap";

export default (props) => {
  const ver = "0.1.0"
//  const ver = process.env.npm_package_version;
  return (
    <Navbar  bg="success" expand="md">
      <Container>
        <Navbar.Brand href="/"> Menroll {ver} </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/list"> RobotSites </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://ucl.nuee.nagoya-u.ac.jp">
              {" "}
              UCLab HP{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
