import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app, auth } from "../util/firebase"
import { useState } from "react"
import { createUserMelhorias } from "./userMelhoriasApi"
import { updateProfile } from "firebase/auth";

export async function uploadFoto(nick, foto){
    const storage = getStorage(app, 'gs://beerclickerr.appspot.com')
    const storageRef = ref(storage, `profiles/${nick}`)
    const uploadTask = uploadBytesResumable(storageRef, foto)

    getDownloadURL(storageRef).then((url) => {
        createUserMelhorias(nick, url)
        updateProfile(auth.currentUser, {
            photoURL: url
        }).then(()=>{}).catch((error)=>{})
    }).catch((e)=>{})
}

export async function downloadFoto(){
    const nick = auth.currentUser.displayName
    const [url, setUrl] = useState('')
    const storage = getStorage(app, 'gs://beerclickerr.appspot.com')
    const storageRef = ref(storage, `profiles/${nick}`)
    
    // getDownloadURL(storageRef).then((url) => {
    //     setUrl(url)
    // }
    // ).catch((e)=>{return false})
    // return url
    return storageRef
}