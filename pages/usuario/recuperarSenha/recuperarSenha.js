import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './recuperarSenha.module.css'
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";


export default function RecuperarSenha(props){
  const [email, setEmail] = useState('')

  const app = initializeApp(props)
  const auth = getAuth(app)

  const recuperar = () =>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
      document.getElementById("formRecuperar").innerHTML = '<h1>Se você possui cadastro, um email foi enviado<h1>'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("formRecuperar").innerHTML = '<h1>Erro ao enviar email<h1>'
    });
  }

  return (
    <FormRecup recuperar={recuperar} setEmail={setEmail}/>
  );
}

export function FormRecup({recuperar, setEmail}){
  return(
    <Form className={styles.form} onSubmit={recuperar} id='formRecuperar'>
      <title>BeerClicker | Recuperar Senha</title>
        <h4>Recuperar senha</h4>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>
        
        <Form.Group className={styles.cadastro}>
          <a href='../login/login'><Form.Label>Log in</Form.Label></a>
          <a href='../cadastro/cadastro'><Form.Label>Realizar cadastrado</Form.Label></a>
        </Form.Group>

        <Button variant="primary" type="submit">Enviar</Button>
    </Form>
  )
}

export async function getStaticProps(){
  return{
      props: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASUREMENT_ID
      }
  }
}