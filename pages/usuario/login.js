import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/login.module.css'
import { signInWithEmailAndPassword} from "firebase/auth";
import { useState } from 'react';
import { autenticar, auth, sair } from '../../util/firebase';
import { useRouter } from 'next/router';
import { getUserByEmail } from '../../api/userMelhoriasApi';


export default function Login(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  if(!autenticar()){
    const login = (e) => {
      e.preventDefault()

      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        document.getElementById('formLogin').innerHTML = '<h3>Log in com sucesso</h3>'
        getUserByEmail(email).then((usuario) => {
          const nick = usuario.nick
          router.push({
            pathname: '/jogo/[nick]',
            query: {nick: nick}
          })
        }).catch((error)=>{console.log("algo deu errado",error)})

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
          <a href='./cadastro'><Form.Label>Fazer cadastrado?</Form.Label></a>
          <a href='./recuperar-senha'><Form.Label>Esqueceu a senha?</Form.Label></a>
      </Form.Group>

      <Button variant="primary" type="submit">Log in</Button>
  </Form>
  )
}