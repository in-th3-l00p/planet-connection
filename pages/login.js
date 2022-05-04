import { useRouter } from "next/router"
import NavBar from "../components/NavBar"
import { Container, Form, Button } from "react-bootstrap"

export default function Login() {
    const router = useRouter()
    return (
        <>
            <NavBar />
            <Form className="my-5">
                <Container>
                    <h2 className="text-center text-decoration-underline">Logare</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="voluntariat@exemplu.ro" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Parola:</Form.Label>
                        <Form.Control type="password" />
                        <Form.Text className="text-muted">Nu-ti impartasi parola cu nimeni!</Form.Text>
                    </Form.Group>

                    <div>
                        <Button className="mx-2">Logheaza-te</Button>
                        <Button onClick={() => router.push("/register")}>Inregistreaza-te</Button>
                    </div>
                </Container>
            </Form>
        </>
    )
}