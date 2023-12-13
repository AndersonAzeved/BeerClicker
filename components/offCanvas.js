import { useState } from 'react';
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
    const foto = auth.currentUser.photoURL === null ? '/profile.png' : auth.currentUser.photoURL
  
    return (
      <>
        <Image src={foto} alt='profile' className={styles.imgNav} onClick={handleShow}/>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton className={styles.header}>
            <Image className={styles.imgOffCanvas} src={foto} alt='profile' />
            <Offcanvas.Title>Bem-vindo, {nomeUser}</Offcanvas.Title>            
          </Offcanvas.Header>
          <hr/>

          <Offcanvas.Body className={styles.body}>
            <details className={styles.details}>
              <summary className={styles.summary}>Atualizar foto</summary>
              <Foto nick={nomeUser} handleShow={handleShow} handleClose={handleClose}/>
            </details>

            <hr/>

            <div className={styles.divCervejaFav}>
              <Image src='/beer.png' className={styles.cervejaFav}/>
            </div>
            <details className={styles.details}>
              <summary className={styles.summary}>Ceveja favorita</summary>

            </details>
            <hr/>
            <details className={styles.desDetails}>
              <summary className={styles.desSummary}>Seu ranking 1º</summary>
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
              <input className="form-control form-control-sm" type="file" onChange={(e) => setFoto(e.target.files[0])} name={nick} accept="image/*"/>
              <button className="btn btn-outline-warning btn-sm" type='submit'>Enviar</button>
          </form>
      </div>
  )
}