import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/recuperar-senha.module.css'
import { useState } from 'react';
import { sendPasswordResetEmail} from "firebase/auth";
import { auth } from '../../util/firebase';


export default function RecuperarSenha(){
  const [email, setEmail] = useState('')
  
  const recuperar = () =>{
    sendPasswordResetEmail(auth, email).then(() => {
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
          <a href='./login'><Form.Label>Log in</Form.Label></a>
          <a href='./cadastro'><Form.Label>Realizar cadastrado</Form.Label></a>
        </Form.Group>

        <Button variant="primary" type="submit">Enviar</Button>
    </Form>
  )
}