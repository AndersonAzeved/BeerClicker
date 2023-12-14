import { getFirestore, doc, collection, query, where, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { bd, app } from '../util/firebase';
import { getMelhorias } from './melhoriasApi';

//export async function getMelhorias() {
//    const firestore = getFirestore(db);
//    const melhoriasCollection = collection(firestore, 'melhorias');
//    const querySnapshot = await getDocs(melhoriasCollection);
//    const desordenado = querySnapshot.docs.map(doc => doc.data());
//
//    const melhorias = desordenado.sort((a,b)=> a.preco - b.preco)
//
//    return melhorias;
//}


export async function getUserMelhorias(nick){
    const firestore = getFirestore(app);
    const statusCollection = collection(firestore, 'user_melhorias');
    const statusQuery = query(statusCollection, where('nick', '==', nick));
    const statusSnapshot = await getDocs(statusQuery);

    const statusData = statusSnapshot.docs.map(doc => doc.data());
    return statusData[0]; 
}

export async function getUserByEmail(email) {

    const firestore = getFirestore(app);
    const usersCollection = collection(firestore, 'user_melhorias');
    const userQuery = query(usersCollection, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);

    const userData = userSnapshot.docs.map(doc => doc.data());
    return userData[0]; 
}

export async function createUserMelhorias(id_nick, email){
    const melhorias = await getMelhorias()

    await setDoc(doc(bd, "user_melhorias", id_nick), {
        email: email,
        foto: "",
        melhorias: melhorias.map(()=>0),
        click: 1,
        total: 0,
        nick: id_nick
    });
}

export async function atualizeUserMelhorias(id_nick, doc_data){
    const docRef = doc(bd, "user_melhorias", id_nick);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await setDoc(docRef, doc_data)
    } else {
        await createUserMelhorias(id_nick)
    }
}