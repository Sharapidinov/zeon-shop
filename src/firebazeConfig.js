import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
// import { doc, onSnapshot } from "firebase/firestore";

const firebaseConfig = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const auth = getAuth(firebaseConfig)
export const firestore = getFirestore(firebaseConfig)

export function useAuth() {
    const [currentUser, setCurrentUser] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if(user) {
                console.log(user)
                setCurrentUser(user)
                dispatch({type: "SIGN_UP", user: {email:user.email, id:user.uid, token: user.accessToken},})

            }
            else {
                console.log("no user")

            }
        })
        return unsub
    },[])
    return currentUser
}





// console.log(firestore);