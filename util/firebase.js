import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signOut } from 'firebase/auth'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


export const firebaseConfig = {
  apiKey: "AIzaSyAQ0ufq90NYvrg0UnxFBIgyvC_UjFXb-W0",
  authDomain: "beerclickerr.firebaseapp.com",
  databaseURL: "https://beerclickerr-default-rtdb.firebaseio.com",
  projectId: "beerclickerr",
  storageBucket: "beerclickerr.appspot.com",
  messagingSenderId: "343160384164",
  appId: "1:343160384164:web:4c58c75e4a6a686ede1431",
  measurementId: "G-7LEGWC6VMY"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const bd = getFirestore()
//export const analytics = getAnalytics(app)

// verificar se está autenticado
// auth.currentUser


export const consultaChave = async (colecao, chave) => {
    const chaveRef = collection(bd, colecao)
    let valor = false
    const querySnapshot = await getDocs(chaveRef)
    querySnapshot.forEach((doc) => {
        if(doc.id === chave){
            valor = true
        }
    })
    return valor
}

export const sair = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    })
}

export const autenticar = () => { // ou só auth.currentUser
    const [valor, setValor] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setValor(true)
            }else{
                setValor(false)
            }
        }, [auth])
    })

    return valor
}