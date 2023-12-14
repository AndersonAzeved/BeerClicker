import { getFirestore, doc, collection, query, where, getDocs, setDoc, getDoc} from 'firebase/firestore';
import { bd, app } from '../util/firebase';
import { getMelhorias } from './melhoriasApi';

// export async function getAllUsers() {
//     const firestore = getFirestore(app);
//     const usersCollection = collection(firestore, 'melhorias');
//     const usersQuery = query(usersCollection, where('nick', '!=', null));
//     const querySnapshot = await getDocs(usersQuery);
//     const users = querySnapshot.docs.map(doc => {
    
//         return{ params: { nick: doc.data().nick}}
    
//     });

//    return users;
// }


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

export async function updateUserMelhorias(id_nick, doc_data){
    const docRef = doc(bd, "user_melhorias", id_nick);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await setDoc(docRef, doc_data)
    } else {
        await createUserMelhorias(id_nick)
    }
}