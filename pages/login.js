import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../firebase/clientApp"
import NavBar from "../components/NavBar"
import { Container, Form, Button, Alert } from "react-bootstrap"
import Loading from "../components/Loading"

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signIn, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [stateUser, stateLoading, stateError] = useAuthState(auth)

    if (user || stateUser)
        router.push("/")
    if (loading || stateLoading)
        return (
            <>
                <NavBar />
                <Loading />
            </>
        )
    return (
        <>
            <NavBar />
            <Form className="my-5">
                <Container>
                    <h2 className="text-center text-decoration-underline">Logare</h2>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" placeholder="voluntariat@exemplu.ro" 
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Parola:</Form.Label>
                        <Form.Control 
                            type="password" onChange={(event) => setPassword(event.target.value)}
                        />
                        <Form.Text className="text-muted">Nu-ti impartasi parola cu nimeni!</Form.Text>
                    </Form.Group>

                    <div>
                        <Button className="mx-2" onClick={() => {
                            signIn(email, password) 
                        }}>
                            Logheaza-te
                        </Button>
                        <Button onClick={() => router.push("/register")}>Inregistreaza-te</Button>
                    </div>
                </Container>
            </Form>
        </>
    )
}