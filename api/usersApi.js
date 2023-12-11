import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../util/firebase';

export async function getUsers() {
    const firestore = getFirestore(db)
    const userCollection = collection(firestore, 'user')
    const querySnapshot = await getDocs(userCollection)
    const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data:doc.data(),
      }))
    return users
}