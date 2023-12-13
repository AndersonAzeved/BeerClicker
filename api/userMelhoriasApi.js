import { getFirestore, collection, getDocs, setDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { app, auth, bd } from '../util/firebase';
import { getMelhorias } from './melhoriasApi';

export async function getUserMelhorias(nick) {

    const usersCollection = collection(bd, 'user_melhorias');
    const userQuery = query(usersCollection, where('nick', '==', nick));
    const userSnapshot = await getDocs(userQuery);

    const userData = userSnapshot.docs.map(doc => doc.data());
    return userData[0]; 
    
}

export async function createUserMelhorias(id_nick, foto){
    const melhorias = await getMelhorias()

    await setDoc(doc(bd, "user_melhorias", id_nick), {
        foto: foto,
        melhorias: melhorias.map(()=>0),
        click: 1,
        total: 0,
        nick: id_nick
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