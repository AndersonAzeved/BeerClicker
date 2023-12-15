import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../util/firebase';

export async function getUsers() {
  const firestore = getFirestore(app)
  const userCollection = collection(firestore, 'user')
  const querySnapshot = await getDocs(userCollection)
  const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data:doc.data(),
    }))
  return users
}