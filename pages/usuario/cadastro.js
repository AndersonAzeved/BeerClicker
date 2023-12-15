import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/cadastro.module.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { autenticar, auth, sair, bd } from '../../util/firebase';
import { useRouter } from 'next/router';
import { getUsers } from '../../api/usersApi';
import { doc, setDoc } from 'firebase/firestore';
import { createUserMelhorias } from '../../api/userMelhoriasApi';


export default function Cadastrar({users}){
    const router = useRouter()
    const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState(' ')
    const [nick, setNick] = useState('')
    const [nickCad, setNickCad] = useState(false)
    const [emailCad, setEmailCad] = useState(false)

    if(autenticar()){
        sair()
        router.push('/usuario/login')
    }else{     
        const cadastrar = (e) => { // Falta verificar o link
            e.preventDefault()
            
            users.map((user) => {
                if(user.id === nick){
                    setNickCad(true)
                }
            })

            users.map((user) => {
                if(user.data.email === email){
                    console.log(user.data.email)
                    setEmailCad(true)
                }
            })

            if(nickCad == false && emailCad == false){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    createUserMelhorias(nick, email).then(()=>{
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: nick}).then(() => {}).catch((error) => {});
                        submitUser(bd, nick, email)
                        document.getElementById('formCadastro').innerHTML = '<h3>Cadstrado realizado<h3>'
                    }).catch((error)=>{})
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
                })
                
            }else{
                document.getElementById('avisos').innerHTML = 'Nickname já cadastrado'
                setNickCad(false)
                setEmailCad(false)
            }
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

export async function getStaticProps(){
    
    try{
        const users = await getUsers()
  
        return { props: {users} }
    }catch(e){
        return { props: {}}
    }
}

export async function submitUser(db, nickname, email){
    try {
        const docRef = await setDoc(doc(db, "user", nickname), {
            email: email,
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    /*
        await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
        });
    */
}