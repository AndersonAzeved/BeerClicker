import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { auth } from '../../util/firebase';
import { Image } from 'react-bootstrap';
import styles from '../../styles/offCanvas.module.css'
import { uploadFoto } from '../../api/gerenciaFoto';
import { getUserMelhorias, updateCervejaFav } from '../../api/userMelhoriasApi';


export default function OffCanvas(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [estado, setEstado] = useState({})
    getUserMelhorias(auth.currentUser?.displayName)
    .then(estado => {
      setEstado(estado)
    })
    .catch(error => {});

    const nomeUser = auth.currentUser?.displayName === null ? 'Jogador' : auth.currentUser?.displayName
    const foto = auth.currentUser?.photoURL === null ? '/profile.png' : auth.currentUser?.photoURL
    //const foto = estado.foto === null || estado.foto === '' ? '/profile.png' : estado.foto
    const urlCervFav = estado?.cervFav
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
              <Image src={urlCervFav} className={styles.cervejaFav} alt='cervaja favorita'/>
            </div>
            <details className={styles.details}>
              <summary className={styles.summary}>Ceveja favorita</summary>
              <CervejaFav/>
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




export function CervejaFav(){
  const [favorita, setFav] = useState('')
  const favs = [
    {nome: 'Amstel',  caminho:'/cervejas/favs/amstel.png'},
    {nome: 'Antarctica', caminho: '/cervejas/favs/antarctica.png'}	,
    {nome: 'Bavaria', caminho: '/cervejas/favs/bavaria.png'}	,
    {nome: 'Becks', caminho: '/cervejas/favs/becks.png'},
    {nome: 'Bohemia', caminho: '/cervejas/favs/bohemia.png'}	,
    {nome: 'Brahma', caminho: '/cervejas/favs/brahma.png'}	,
    {nome: 'Corona', caminho: '/cervejas/favs/corona.png'}	,
    {nome: 'Crystal', caminho: '/cervejas/favs/crystal.png'}	,
    {nome: 'Eisenbahn', caminho: '/cervejas/favs/eisenbahn.png'}	,
    {nome: 'Heineken', caminho: '/cervejas/favs/heineken.png'}	,
    {nome: 'Itaipava', caminho: '/cervejas/favs/itaipava.png'}	,
    {nome: 'Kaiser', caminho: '/cervejas/favs/kaiser.png'	},
    {nome: 'Schin', caminho: '/cervejas/favs/schin.png'}	,
    {nome: 'Skol', caminho: '/cervejas/favs/skol.png'}	,
    {nome: 'Stella', caminho: '/cervejas/favs/stella.png'}	,
    {nome: 'Tiger', caminho: '/cervejas/favs/tiger.png'	}
  ]

  

  const favoritar = (e) => {
    e.preventDefault()
    var select = document.getElementById('floatingSelectGrid')
    select.addEventListener('change', () => {
      setFav(select.value)
    })
    updateCervejaFav(auth.currentUser?.displayName, {cervFav: favorita}).then(()=>{return true}).catch((e)=>{return false})
  }

  
  
  return(
    <form className={styles.form} onSubmit={favoritar}>
      <select className="form-select" id="floatingSelectGrid">
        {favs.map((fav) => <option value={fav.caminho} key={fav.caminho}>{fav.nome}</option>)}
      </select>
      <button className="btn btn-outline-warning btn-sm" type='submit'>Favoritar</button>
    </form>
  )
}