import { autenticar, auth, sair, bd } from "../../util/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import styles from "./styles/play.module.css"
import { getMelhorias } from "../../api/melhoriasApi";
import { useRouter } from "next/router";
import { updateUserMelhorias, getUserMelhorias } from "../../api/userMelhoriasApi";

export default function Play(props){
    const router = useRouter()
    const { nick } = router.query

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

    const comprarMelhoria = (melhoria) =>{
        const melhorias = props.estado.melhorias.map((melh)=>{if(props.estado.melhorias.indexOF(melh) == props.melhorias.indexOf(melhoria)){melh = melh+1}})
        const data = {
            email: auth.currentUser.email,
            foto: "",
            melhorias: melhorias,
            click: 1,
            total: contador,
            nick: nick
        }
        updateUserMelhorias(nick,data).then(()=>{return true}).catch((e)=>{return false})
    }

    const salvar = () =>{
        console.log(contador)
        const data = {
            email: auth.currentUser.email,
            foto: "",
            melhorias: props.estado.melhorias,
            click: 1,
            total: contador,
            nick: nick
        }
        updateUserMelhorias(nick,data).then(()=>{return true}).catch((e)=>{return false})
    }

    if(props.estado?.total == undefined || props.estado.total == null){
        return(<CervejaSpin/>)
    }else{
        () => setContador(props?.estado.total)
        if(auth.currentUser){
            if(props == {}){
                return(<CervejaSpin/>)
            }
            return (
                <div className={styles.layout}>
                    <div className={styles.container}>
                        <p>Clock: {clock}</p>
                        <Button onClick={voltar}>Sair</Button>
                    </div>
                    <div className={styles.container}>
                        <img className={styles.beer} onClick={addContador} src="/beer.png"/>
                        <br/><br/>
                        <div id="contador">{contador}</div>
                        <div><button onClick={salvar}>salvar</button></div>
                    </div>
                    <div className={styles.melhorias}>
                        <div className={styles.container}>
                            {props?.melhorias.map((melhoria)=>(
                                <div onClick={() => comprarMelhoria(melhoria)} className={styles.item} key={melhoria.preco}>
                                    <img src={melhoria.foto} alt={melhoria.nome} />
                                    <div>{melhoria.nome}</div>
                                    <div>{melhoria.preco}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                //<div>Error!!</div>
                <CervejaSpin/>
            )
        }
    }


    
}

export async function getStaticPaths(){
    return {
        paths:[
            {params: {nick: "joaozin"}},
            {params: {nick: "Anderson Azevedo da Silva"}},
            {params: {nick: "Marlin"}},
        ],
        fallback: true
    }
}

export async function getStaticProps({ params }){
    
    try {
        const estado = await getUserMelhorias(params.nick)
        const melhorias = await getMelhorias()

        if (!estado || !melhorias) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                melhorias: melhorias,
                estado: estado
            },
        };
    } catch (error) {
        console.error("Erro ao buscar dados do usuario:", error);
        return {
            notFound: true,
        };
    }
}


export function CervejaSpin(){
    return(
        <div className={styles.spin}>
            <img
                className={styles.beerimage}
                src="/beer.png"
                alt="Beer"
            />
        </div>
    )
}