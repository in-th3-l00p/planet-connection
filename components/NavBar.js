import Link from "next/link"
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
                        <Link href="/acasa" passHref><Nav.Link>Acasa</Nav.Link></Link>
                        <Link href="/evenimente" passHref><Nav.Link>Evenimente</Nav.Link></Link>
                        <Link href="/fonduri" passHref><Nav.Link>Strangeri de fonduri</Nav.Link></Link>
                        <Link href="/contact" passHref><Nav.Link>Contact</Nav.Link></Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container> 
        </Navbar>
    )
}