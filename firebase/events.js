import { db } from "./clientApp"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"

export function useEventAdder(title) {
    const [docRef, setDocRef] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    const addEvent = async (title) => {
        setLoading(true)
        setErorr(undefined)
        try {
            const docRef = await addDoc(collection(db, "events"), {title})
            setDocRef(docRef)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return [addEvent, docRef, loading, error]
}