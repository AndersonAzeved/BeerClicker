import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './recuperarSenha.module.css'


export default function RecuperarSenha(){
  
  return (
    <Form className={styles.form}>
      <title>BeerClicker | Recuperar Senha</title>
        <h4>Recuperar senha</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" />
        </Form.Group>
        
        <Form.Group className={styles.cadastro}>
          <a href='../login/login'><Form.Label>Log in</Form.Label></a>
            <a href='../cadastro/cadastro'><Form.Label>Realizar cadastrado</Form.Label></a>
        </Form.Group>

        <Button variant="primary" type="submit">Enviar</Button>
    </Form>
  );
}