import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../util/firebase';

export async function getMelhorias() {
    const firestore = getFirestore(db);
    const melhoriasCollection = collection(firestore, 'melhorias');
    const querySnapshot = await getDocs(melhoriasCollection);
    const melhorias = querySnapshot.docs.map(doc => doc.data());
    return melhorias;
}