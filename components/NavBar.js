import { Container, Navbar, Nav } from "react-bootstrap"

export default function NavBar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    Better Connection
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="#">Acasa</Nav.Link>
                        <Nav.Link href="#">Evenimente</Nav.Link>
                        <Nav.Link href="#">Strangeri de fonduri</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">Login</Nav.Link>
                        <Nav.Link href="#">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container> 
        </Navbar>
    )
}