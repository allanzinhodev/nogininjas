import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">NO-GI Ninjas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/fights">Lutas</Nav.Link>
                        <Nav.Link href="/fighters">Lutadores</Nav.Link>
                        <Nav.Link href="/about">Sobre</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
