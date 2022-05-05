import { useState } from "react"
import { addEvent } from "../firebase/events"
import { Button, Modal, Container, Form, FloatingLabel } from "react-bootstrap"
import NavBar from "../components/NavBar"

function EventAdder({show, hide}) {
    const [title, setTitle] = useState("")
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
                    <Button>Adauga</Button>
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

function EventsList() {
    return (
        <Container fluid>
            <p>test</p>
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