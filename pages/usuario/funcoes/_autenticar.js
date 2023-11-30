import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {firebaseConfig} from '../../../firebaseConfig'
import React, { useState } from "react";


//// Autenticação através do firebase
//// Verifica se o usuário está cadastrado (true) ou não (false)
//// Usar nas funções para validar
export function autenticar(){ 
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const [valor, setValor] = useState(false)
    
    onAuthStateChanged(auth, (user) => {
        if(user){
            setValor(true)
        }else{
            setValor(false)
        }
    })

    return valor
}