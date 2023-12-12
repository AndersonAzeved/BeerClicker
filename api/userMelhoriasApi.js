import { getFirestore, collection, getDocs, setDoc } from 'firebase/firestore';
import { bd } from '../util/firebase';
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

export async function createUserMelhorias(id_nick){
    const melhorias = await getMelhorias()

    await setDoc(doc(bd, "user_melhorias", id_nick), {
        email: {},
        melhorias: melhorias.map(()=>0),
        click: 1,
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