import { useState } from "react"
import { auth, db } from "./clientApp"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"

function useDBUserCreate() {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    const createUser = async (credentials) => {
        setLoading(true)
        setError(undefined)
        try {
            const newUser = await addDoc(collection(db, "users"), {
                email: credentials.email,
                firstName: credentials.firstName,
                name: credentials.name,
                createdEvents: [],
                created: serverTimestamp()
            })

            setUser(newUser)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return [createUser, user, loading, error]
}

export default function useCreateUser() {
    //other costume hooks
    const [createDBUser, dbUser, dbLoading, dbError] = useDBUserCreate() 
    const [
        createUserWithEmailAndPassword,
        authUser, authLoading, authError,
    ] = useCreateUserWithEmailAndPassword(auth);

    //state hooks
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    //defining the registration logic
    const createUser = async (credentials) => {
        setLoading(true)

        //creating the user inside the firebase's auth system
        await createUserWithEmailAndPassword(credentials.email, credentials.password)
        if (dbError) {
            setError(dbError)
            setLoading(false)
            return
        }

        //storing user's information inside firestore
        await createDBUser({
            email: credentials.email,
            firstName: credentials.firstName,
            name: credentials.name
        })
        if (dbError) {
            setError(dbError)
            setLoading(false)
            return
        }

        setUser([authUser, dbUser])
        setLoading(false)
    }

    return [createUser, user, loading, error]
}