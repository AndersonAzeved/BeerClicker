import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './login.module.css'
import { initializeApp } from "firebase/app";
import { autenticar, sair } from '../../../funcoes/autenticar';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { use, useState } from 'react';


export default function Login(props){
  const app = initializeApp(props)
  const auth = getAuth(app)
  const autenticado = autenticar(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //sair(auth)

  if(autenticado){
    return(
      <div>Você já está logado</div> // Enviar para página principal
    )
  }else{
    const login = (e) => {
      e.preventDefault()

      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        document.getElementById('formLogin').innerHTML = '<h3>Log in com sucesso</h3>'
        console.log('logado')

      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("errorCode: ", errorCode)
        console.log("errorMessage: ", errorMessage)
        if(errorCode == 'auth/missing-password'){
          document.getElementById('avisos').innerHTML = '*Informe uma senha'
        }else if(errorCode == 'auth/invalid-credential'){
            document.getElementById('avisos').innerHTML = '*Credenciais inválidos'
        }else{
            document.getElementById('avisos').innerHTML = '*Verifique as informações'
        }
      })
    }

    return (
      <div>
        <title>BeerClicker | Log in</title>
        <FormLogin login={login} setEmail={setEmail} setPassword={setPassword}/>
      </div>
    )
  }
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


export function FormLogin({login, setEmail, setPassword}){
  return(
    <Form className={styles.form} onSubmit={login} id='formLogin'>
      <h4>Log in</h4>
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
      
      <Form.Group className={styles.login}>
          <a href='../cadastro/cadastro'><Form.Label>Fazer cadastrado?</Form.Label></a>
          <a href='../recuperarSenha/recuperarSenha'><Form.Label>Esqueceu a senha?</Form.Label></a>
      </Form.Group>

      <Button variant="primary" type="submit">Log in</Button>
  </Form>
  )
}