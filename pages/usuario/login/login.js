import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './login.module.css'

export default function Login(){
  return (
    <Form className={styles.form}>
        <title>BeerClicker | Log in</title>
        <h4>Log in</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="senha" />
        </Form.Group>
        
        <Form.Group className={styles.cadastro}>
            <a href='../cadastro/cadastro'><Form.Label>Fazer cadastrado?</Form.Label></a>
            <a href='../recuperarSenha/recuperarSenha'><Form.Label>Esqueceu a senha?</Form.Label></a>
        </Form.Group>

        <Button variant="primary" type="submit">Log in</Button>
    </Form>
  );
}