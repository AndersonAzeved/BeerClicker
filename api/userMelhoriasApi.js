import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, bd } from '../util/firebase';
import { getMelhorias } from './melhoriasApi';

export async function getUserMelhorias() {
    const nick = auth.currentUser.displayName
    const docRef = doc(bd, "user_melhorias", nick);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const status = docSnap.data()

        return status;
    } else{
        createUserMelhorias(nick, '')
    }
    
}

export async function createUserMelhorias(id_nick, foto){
    const melhorias = await getMelhorias()

    await setDoc(doc(bd, "user_melhorias", id_nick), {
        foto: foto,
        melhorias: melhorias.map(()=>0),
        click: 1,
        total: 0
    });
}

export async function updateUserMelhorias(id_nick, doc_data){
    const docRef = doc(bd, "user_melhorias", id_nick);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await setDoc(docRef, doc_data)
    } else {
        await createUserMelhorias(id_nick)
    }
}