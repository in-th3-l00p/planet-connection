import { useRouter } from "next/router"
import { useState } from "react"

import { auth } from "../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import useCreateUser from "../firebase/registration"

import NavBar from "../components/NavBar"
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap"
import Loading from "../components/Loading"

function RegisterButton({create, credentials}) {
    const btnOnClick = () => create(credentials)
    let valid = (
        credentials.firstName && credentials.name && credentials.email &&
        credentials.password && credentials.password == credentials.confirmPassowrd
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
    const router = useRouter()

    //for authentification
    const [createUser, user, loading, error] = useCreateUser()
    const [authUser, authLoading, authError] = useAuthState(auth)
    if (authUser || user)
        router.push("/")
 
    //fields
    const [fname, setFName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    if (authUser || authLoading || user || loading)
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
                        create={createUser}
                        credentials={{
                            firstName: fname,
                            name: name,
                            email: email,
                            password: password,
                            confirmPassowrd: cpassword
                        }} 
                    />
                </Container>
            </Form>
        </>
    )
}