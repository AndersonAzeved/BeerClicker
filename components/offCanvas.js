import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { auth } from '../util/firebase';
import { Image } from 'react-bootstrap';
import styles from '../styles/offCanvas.module.css'
import { uploadFoto } from '../api/gerenciaFoto';

export default function OffCanvas(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nomeUser = auth.currentUser.displayName === null ? 'Jogador' : auth.currentUser.displayName
    const foto = auth.currentUser.photoURL

    
    return (
      <>
        <Image src={foto} width={40} height={40} style={{}} onClick={handleShow}/>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton className={styles.header}>
            <Image src={foto} alt='profile' width={100} height={100} />
            <Offcanvas.Title>Bem-vindo, {nomeUser}</Offcanvas.Title>            
          </Offcanvas.Header>
          <hr/>
          <Offcanvas.Body className={styles.body}>
            <details>
              <summary>Atualizar foto</summary>
              <Foto nick={nomeUser} handleShow={handleShow} handleClose={handleClose}/>
            </details>
            <details>
              <summary>Ceveja favorita</summary>
              <Foto/>
            </details>
            <details>
              <summary>Seu ranking</summary>
              <Foto/>
            </details>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
}

export function Foto({nick, handleClose, handleShow}){
  const [foto, setFoto] = useState()
  const enviar = (e) =>{
    e.preventDefault()
    uploadFoto(nick, foto)
    handleShow()
    handleClose()
    
  }

  return(
      <div className={styles.enviarFoto}>
          <form onSubmit={enviar} className={styles.form}>
              <label  className="form-label">Escolha uma imagem pro perfil</label>
              <input className="form-control" type="file" onChange={(e) => setFoto(e.target.files[0])} name={nick} accept="image/*"/>
              <Button className={styles.Button} type='submit'>Enviar</Button>
          </form>
      </div>
  )
}