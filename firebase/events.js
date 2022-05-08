import { db } from "./clientApp"
import { addDoc, collection } from "firebase/firestore"
import { auth } from "./clientApp"
import { useState } from "react"

export function useEventAdder() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    const addEvent = async (title) => {
        if (!auth.currentUser) {
            setError("not logged in")
            return
        }

        setLoading(true)
        setError(undefined)
        try {
            await addDoc(collection(db, "events"), {title})
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return [addEvent, loading, error]
}