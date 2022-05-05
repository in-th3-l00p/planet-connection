import { auth } from "../firebase/clientApp"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import NavBar from "../components/NavBar"
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap"
import Loading from "../components/Loading"

function RegisterButton({create, credentials}) {
    const btnOnClick = () => create(credentials.email, credentials.password)    
    let valid = (
        credentials.fname && credentials.name && credentials.email &&
        credentials.password && credentials.password == credentials.cpassword
    )

    if (valid)
        return (
            <Button onClick={() => {btnOnClick()}}>
                Inregistreaza-te
            </Button>
        )
    return (
        <Button disabled>
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
    ] = useCreateUserWithEmailAndPassword(auth);
    const [stateUser, stateLoading, stateError] = useAuthState(auth)

    //fields
    const [fname, setFName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    //other states
    const router = useRouter()

    if (user || !!stateUser)
        router.push("/login")
    if (loading)
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