import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { auth } from '../util/firebase';

export default function OffCanvas(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(auth.currentUser.displayName)
  
    return (
      <>
        <img src='/profile.png' width={40} height={40} onClick={handleShow}/>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            {auth.currentUser.displayName === null ? <Offcanvas.Title>Bem-vindo Jogador</Offcanvas.Title> : <Offcanvas.Title>Bem-vindo {auth.currentUser.displayName}</Offcanvas.Title>}
            
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>.....</p>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}