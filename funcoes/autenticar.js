import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore";


//// Autenticação através do firebase
//// Verifica se o usuário está cadastrado (true) ou não (false)
//// Usar nas funções para validar
export const autenticar = (auth) => { // ou só auth.currentUser
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


// Realiza o signOut do usuário
// realizou (true) ou não (false)
export const sair = (auth) => {
    signOut(auth).then(() => {
    }).catch((error) => {
    })
}


export const consultaChave = async (bd, colecao, chave) => {
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