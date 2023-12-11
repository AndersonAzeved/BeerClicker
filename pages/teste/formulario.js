import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {app} from '../../util/firebase'
import { useState } from "react";

export default function Formulario(){
    

    const [foto, setFoto] = useState()
    const name = 'foi5'
    const enviar = (e) => {
        e.preventDefault()
        const storage = getStorage(app, 'gs://beerclickerr.appspot.com');
        const storageRef = ref(storage, `teste/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, foto);
        console.log('Esta', uploadTask.state)
    }
    
    console.log(foto)

    return(
        <form onSubmit={enviar}>
            <input type="file" onChange={(e) => setFoto(e.target.files[0])} name={name} accept="image/*"/>
            <button type="submit">enviar</button>
        </form>
    )
}