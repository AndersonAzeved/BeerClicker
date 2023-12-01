import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from "react";


//// Autenticação através do firebase
//// Verifica se o usuário está cadastrado (true) ou não (false)
//// Usar nas funções para validar

export const Autenticar = (auth) => {
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
export const Sair = (auth) => {
    const [saida, setSaida] = useState('')

    useEffect(() => {
        signOut(auth).then(() => {
            setSaida(true)
        }).catch((error) => {
            setSaida(false)
        })
    }, [auth])

    return saida
}