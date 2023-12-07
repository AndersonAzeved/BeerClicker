import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/cadastro.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { autenticar, auth } from '../../util/firebase';


export default function Cadastrar(){
    const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState(' ')
    const [nick, setNick] = useState(' ')

    if(autenticar()){
        return(
            <div>Você já está logado</div> // Enviar para página principal
        )
    }else{     
        const cadastrar = (e) => { // Falta verificar o link
            e.preventDefault()

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
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
            });
        }

        return(
            <div>   
                <title>BeerClicker | Cadastro</title>
                <FormCadastrar cadastrar={cadastrar} setEmail={setEmail} setPassword={setPassword} setNick={setNick}/>
            </div>
        )
    }

}


export function FormCadastrar({cadastrar, setEmail, setPassword, setNick}){
    return (
        <Form className={styles.form} onSubmit={cadastrar} id='formCadastro'>
            <h4>Cadastrar</h4>

            <Form.Group controlId="formBasicNick">
                <Form.Label>Nickname</Form.Label>
                <Form.Control type="text" placeholder="nickname" onChange={(e) => setNick(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className={styles.avisos} id="avisos">
                <Form.Label></Form.Label>
            </Form.Group>
            
            <Form.Group className={styles.cadastro}>
                <a href='./login'><Form.Label>Possui cadastro?</Form.Label></a>
                <a href='./recuperar-senha'><Form.Label>Esqueceu a senha?</Form.Label></a>
            </Form.Group>

            <Button variant="primary" type="submit">Cadastrar</Button>
        </Form>
    )
}