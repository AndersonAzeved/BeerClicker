import { autenticar, auth, sair, bd } from "../../util/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import styles from "./styles/play.module.css"
import { getMelhorias } from "../../api/melhoriasApi";
import { useRouter } from "next/router";

export default function Play({melhorias}){
    const router = useRouter()

    const [clock, setClock] = useState(0);
    const [contador, setContador] = useState(0)

   
    useEffect(() => {
        // Define um intervalo de 1000 milissegundos (1 segundo)
        const intervalId = setInterval(() => {
            // Atualiza o estado do contador a cada segundo
            setClock((prevClock) => prevClock + 1);
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []); // O segundo parâmetro vazio [] garante que o useEffect seja executado apenas uma vez (montagem do componente)

    const addContador = () =>{
        setContador((a) => a+1)
    }

    const voltar = () =>{
        sair()
        router.push('/usuario/login')
    }

    if(autenticar()){
        return (
            <div className={styles.layout}>
                <div className={styles.container}>
                    <p>Clock: {clock}</p>
                    <Button onClick={voltar}>Sair</Button>
                </div>
                <div className={styles.container}>
                    <p>Contador: {contador}</p>
                    <img className={styles.beer} onClick={addContador} src="/beer.png"/>
                </div>
                <div className={styles.container}>
                    {melhorias.map((melhoria)=>(
                        <div className={styles.item}>
                            <img src={melhoria.foto} alt={melhoria.nome} />
                            <div>{melhoria.nome}</div>
                            <div>{melhoria.preco}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }else{
        return(
            <div>Error!!</div>
        )
    }
}

export async function submitDb(db, nome, desc, prod, prec){
    try {
        const docRef = await addDoc(collection(db, "melhoria"), {
            nome: nome,
            descricao: desc,
            producao: prod,
            preco: prec,
            foto: "" 
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getDb(){
    const querySnapshot = await getDocs(collection(bd, "melhorias"));
    const teste = querySnapshot.docs.map((doc) => doc.data());
    teste.map((x)=>{console.log(x.nome)})   
}

export async function getStaticProps(){
    
    try{
        const melhorias = await getMelhorias()

        return { props: {melhorias} }
    }catch(e){
        return { props: {}}
    }
}