import { getFirestore } from "firebase/firestore";
import { autenticar } from "../../funcoes/autenticar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useState } from "react";

export default function Play(props){
    const app = initializeApp(props)
    const auth = getAuth(app)
    //const analytics = getAnalytics(app);

    const db = getFirestore(app)
    const autenticado = autenticar(auth)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    

    if(autenticado){
        return(
            <div>
                <h1>Deu certo</h1>
                <button onClick={()=>submitDb(db)}>Add Itaipava</button>
                <button onClick={()=>getDb(db)}>get DB</button>
            </div>
        )
    }else{
        const login = (e) => {
            e.preventDefault()
      
            signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
              document.getElementById('formLogin').innerHTML = '<h3>Log in com sucesso</h3>'
      
            }).catch((error) => {
              const errorCode = error.code
              const errorMessage = error.message
              console.log("errorCode: ", errorCode)
              console.log("errorMessage: ", errorMessage)
            })
        }
        return(
            <form id='formLogin' onSubmit={login}>
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
                <button type="submit">submit</button>
            </form>
        )
        
    }
}

export async function submitDb(db){
    try {
        const docRef = await addDoc(collection(db, "melhoria"), {
            nome: "Itaipava",
            descricao: "Produz uma pequena quantidade de cerveja passivamente.",
            producao: 0.4 
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getDb(db){
    const querySnapshot = await getDocs(collection(db, "melhoria"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nome}`);
    });
}


export async function getStaticProps(){

    /* 
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
    */

    return{
        props: {
            apiKey: "AIzaSyAQ0ufq90NYvrg0UnxFBIgyvC_UjFXb-W0",
            authDomain: "beerclickerr.firebaseapp.com",
            databaseURL: "https://beerclickerr-default-rtdb.firebaseio.com",
            projectId: "beerclickerr",
            storageBucket: "beerclickerr.appspot.com",
            messagingSenderId: "343160384164",
            appId: "1:343160384164:web:4c58c75e4a6a686ede1431",
            measurementId: "G-7LEGWC6VMY"
        }
    }
  }