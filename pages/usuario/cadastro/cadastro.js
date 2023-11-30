import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './cadastro.module.css'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {firebaseConfig} from '../../../firebaseConfig'
import { initializeApp } from "firebase/app";
import React, { useState } from "react";


export default function Cadastrar(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const cadastrar = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            document.getElementById('formCadastro').innerHTML = '<h3>Cadstrado realizado<h3>'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/missing-password'){
                document.getElementById('avisos').innerHTML = '*Informe uma senha'
            }else if(errorCode == 'auth/weak-password'){
                document.getElementById('avisos').innerHTML = '*A senha deve ter mais de seis caracteres'
            }else if(errorCode == 'auth/email-already-in-use'){
                document.getElementById('avisos').innerHTML = '*Email já cadastrado'
            }else{
                document.getElementById('avisos').innerHTML = '*Verifique as informações'
            }
            
            console.log('errorMessage: ', errorMessage)
            console.log('errorCode: ', errorCode)
        });
    }
    
    /*
        <Form.Group controlId="formBasicNick">
            <Form.Label>Nickname</Form.Label>
            <Form.Control type="text" placeholder="nickname"/>
        </Form.Group>
    */

    return (
        <Form className={styles.form} onSubmit={cadastrar} id='formCadastro'>
            <title>BeerClicker | Cadastro</title>
            <h4>Cadastrar</h4>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className={styles.avisos} id="avisos">
                <Form.Label></Form.Label>
            </Form.Group>
            
            <Form.Group className={styles.cadastro}>
                <a href='../login/login'><Form.Label>Possui cadastro?</Form.Label></a>
                <a href='../recuperarSenha/recuperarSenha'><Form.Label>Esqueceu a senha?</Form.Label></a>
            </Form.Group>

            <Button variant="primary" type="submit">Cadastrar</Button>
        </Form>
    );

    /*
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            console.log("foi cadastrado")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Cadastrar</button>
        </form>
    );*/
    

}