import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../util/firebase';

export async function getMelhorias() {
    const firestore = getFirestore(app);
    const melhoriasCollection = collection(firestore, 'melhorias');
    const querySnapshot = await getDocs(melhoriasCollection);
    const desordenado = querySnapshot.docs.map(doc => doc.data());

    const melhorias = desordenado.sort((a,b)=> a.preco - b.preco)

    return melhorias;
}