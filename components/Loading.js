import { Spinner } from "react-bootstrap"

export default function Loading() {
    return (
        <div className="my-5 text-center">
            <h2>Loading</h2> 
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}