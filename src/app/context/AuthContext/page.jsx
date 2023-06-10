"use client"
import { createContext,useContext,useState ,useEffect} from "react";
import {auth,db} from '../../Firebase/page'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'



const UserContext = createContext()

export const AuthContextProvider = ({children})  => {

    const [user,serUser] = useState({})

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth,email,password)
        return setDoc(doc(db,'users' ,email), {
            watchList : []
        })
    }
    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = () => {
        return signOut(auth)
    } 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            serUser(currentUser)
        })
        return  ( ) => {
            unsubscribe()
        }
    },[])
return (
    <UserContext.Provider   value={{signUp,signIn,logout,user}} >
           
            {children}
</UserContext.Provider >
)


} 

export const UserAuth = ( ) => {
    return useContext(UserContext)
}





