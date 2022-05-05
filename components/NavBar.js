import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signOut } from "firebase/auth"
import app from "../firebase/clientApp"
import Link from "next/link"
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap"

const LoggedForm = ({user}) => (
    <Form className="d-flex">
        <Form.Text className="me-3">{user.email}</Form.Text>
        <Button onClick={() => signOut(getAuth(app))}>
            Log off
        </Button>
    </Form>
)

const LoginRegisterNav = () => (
    <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
)

export default function NavBar() {
    const [user, loading, error] = useAuthState(getAuth(app))

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
                </Navbar.Collapse>
                {!!user ? <LoggedForm user={user} /> : <LoginRegisterNav />}
            </Container> 
        </Navbar>
    )
}