import app from "../firebase/clientApp"
import { useRouter } from "next/router"
import { getAuth } from "firebase/auth"
import { useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import NavBar from "../components/NavBar"
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap"

function RegisterButton({create, credentials}) {
    const btnOnClick = () => create(credentials.email, credentials.password)    
    let valid = (
        credentials.fname && credentials.name && credentials.email &&
        credentials.password && credentials.password == credentials.cpassword
    )

    if (valid)
        return (
            <Button onClick={btnOnClick}>
                Inregistreaza-te
            </Button>
        )
    return (
        <Button onClick={btnOnClick} disabled>
            Inregistreaza-te
        </Button>
    )
}

export default function Register() {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(getAuth(app));

    //fields
    const [fname, setFName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    //other states
    const [valid, setValid] = useState(false)
    const router = useRouter()

    if (user)
        router.push("/login")
    if (loading)
        return (
            <>
                <NavBar />
                <div className="my-5 text-center">
                    <h2>Loading</h2> 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
        )
    return (
        <>
            <NavBar />
            <Form className="my-5">
                <Container>
                    <h2 className="text-center text-decoration-underline">Inregistrare</h2>
                    {error && (<Alert variant="danger">{error.message}</Alert>)}
                    <Form.Group className="mb-3">
                        <Form.Label>Informatii generale:</Form.Label>
                        <Form.Control 
                            type="text" className="mb-2" placeholder="Prenume" 
                            onChange={(event) => setFName(event.target.value)}
                        />
                        <Form.Control 
                            type="text" placeholder="Nume"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" placeholder="voluntariat@exemplu.ro" 
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Parola:</Form.Label>

                        {
                            !(password == cpassword) && 
                            <Alert variant="danger">Parolele nu se potrivesc</Alert>
                        }

                        <Form.Control 
                            type="password" className="mb-2" 
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Form.Control 
                            type="password" placeholder="Confirma parola" 
                            onChange={(event) => setCPassword(event.target.value)}
                        />
                        <Form.Text className="text-muted">Nu-ti impartasi parola cu nimeni!</Form.Text>
                    </Form.Group>

                    <RegisterButton
                        create={createUserWithEmailAndPassword} 
                        credentials={{fname, name, email, password, cpassword}} 
                    />
                </Container>
            </Form>
        </>
    )
}