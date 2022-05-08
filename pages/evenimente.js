import { useState } from "react"
import { useEventAdder } from "../firebase/events"

import { db } from "../firebase/clientApp"
import { collection } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"

import { Button, Modal, Container, Form, FloatingLabel, Alert } from "react-bootstrap"
import NavBar from "../components/NavBar"

function EventAdder({show, hide}) {
    const [title, setTitle] = useState("")
    const [addEvent, loading, error] = useEventAdder()

    return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Adauga un eveniment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Titlu"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="titlu" onChange={
                                    (event) => setTitle(event.target.value)
                                }/>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {addEvent(title); hide()}}>Adauga</Button>
                    <Button variant="secondary" onClick={hide}>Inchide</Button>
                </Modal.Footer>
            </Modal>
    )
}

//the right menu that gives control over events
function ControlMenu() {
    const [showEventModal, setShowEventModal] = useState(false)
    const handleEventModalShow = () => setShowEventModal(true)
    const handleEventModalHide = () => setShowEventModal(false)

    return (
        <>
            <Form className="border p-2 px-5">
                <EventAdder show={showEventModal} hide={handleEventModalHide} />
                <Button onClick={handleEventModalShow}>Adauga eveniment</Button>
            </Form>
        </>
    )
}

function Event({ children }) {
    return <p>{children}</p>
}

function EventsList() {
    const [value, loading, error] = useCollection(collection(db, "events"))

    //handling loading time or errors
    if (loading)
        return (
            <Container fluid>
                <h2 className="text-center mt-3">
                    Se incarca evenimentele...
                </h2>
            </Container>
        )
    if (error)
        return (
            <Alert variant="danger">
                Evenimentele nu au putut fi incarcate: {error.message}
            </Alert>
        )

    //finally showing each event
    return (
        <Container className="border ms-3" fluid>
            {value.docs.map((doc) => <Event key={doc.id}>{doc.data().title}</Event>)}
        </Container>
    )
}

export default function Eventimente() {
    return (
        <>
            <NavBar />
            <Container fluid>
                <h2>Evenimente</h2>
                <div className="d-flex">
                    <ControlMenu />
                    <EventsList />
                </div>
            </Container>
        </>
    )
}