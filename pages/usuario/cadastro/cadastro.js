import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './cadastro.module.css'

export default function Cadastrar(){
  return (
    <Form className={styles.form}>
        <title>BeerClicker | Cadastro</title>
        <h4>Cadastrar</h4>

        <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control type="text" placeholder="nickname" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="senha" />
        </Form.Group>
        
        <Form.Group className={styles.cadastro}>
            <a href='../login/login'><Form.Label>Possui cadastro?</Form.Label></a>
            <a href='../recuperarSenha/recuperarSenha'><Form.Label>Esqueceu a senha?</Form.Label></a>
        </Form.Group>

        <Button variant="primary" type="submit">Cadastrar</Button>
    </Form>
  );
}