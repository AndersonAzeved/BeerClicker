import { autenticar, auth, sair, bd } from "../../util/firebase";
import { collection, addDoc, getDocs, onSnapshot, doc } from "firebase/firestore"; 
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
    const [contador, setContador] = useState(props.estado.total)
    const [estado, setEstado] = useState()
    let producoes = 0
    for (let index = 1; index < 17; index++) {
        producoes += props.melhorias[index].producao * props.estado.melhorias[index]
    }

    const [producao, setProducao] = useState(producoes)
    const [click, setClick] = useState(props.estado.click)

    useEffect(()=>{
        // Define um intervalo de 1000 milissegundos (1 segundo)
        const intervalId = setInterval(() => {
            // Atualiza o estado do contador a cada segundo
            setClock((prev) => prev+1)
            setContador((prevCont) => prevCont + producao);
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    },[producao])

    const unsub = onSnapshot(doc(bd, "user_melhorias", nick), (doc) => {
        console.log("Current data: ", doc.data());
    });

   console.log(props)
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
    }

    const salvar = () =>{
        console.log(contador)
        let val_cont = document.getElementById('contador').textContent
        let mult = val_cont[val_cont.length - 1];
        let val_total = 0
        val_total = (mult == 'K') ? (parseFloat(val_cont) * (1000**1)):
                        (mult == 'M') ? (parseFloat(val_cont) * (1000**2)):
                            (mult == 'B') ? (parseFloat(val_cont) * (1000**3)):
                                (mult == 'T') ? (parseFloat(val_cont) * (1000**4)):
                                    (mult == 'A') ? (parseFloat(val_cont) * (1000**5)):
                                        (parseInt(val_cont) * 1000**0)
        const data = {
            melhorias: props.estado.melhorias,
            click: props.estado.click,
            total: val_total,
            nick: nick,
            producao: parseFloat(producao)
        }
        updateUserMelhorias(nick,data,true).then(()=>{console.log('salvou')}).catch((e)=>{console.log("não salvou")})
    }

    if(props.estado?.total == undefined || props.estado.total == null){
        return(<CervejaSpin/>)
    }else{
        const addContador = () =>{
            setContador((a) => a + click)
        }
        if(nick){
            if(props == {}){
                return(<CervejaSpin/>)
            }
            return (
                <div className={styles.layout}>
                    <div className={styles.container}>
                        <p>Clock: </p>
                        <Button onClick={voltar}>Sair</Button>
                    </div>
                    <div className={styles.container}>
                        <img className={styles.beer} onClick={addContador} src="/beer.png"/>
                        <br/><br/>
                        <div id="contador">
                            {contador > 1000 ? 
                                contador > 1000**2 ? 
                                    contador > 1000**3 ? 
                                        contador > 1000**4 ? 
                                            contador > 1000**5 ?
                                                `${(contador/(1000**5)).toFixed(3)} AA`
                                            :`${(contador/(1000**4)).toFixed(3)} T` 
                                        :`${(contador/(1000**3)).toFixed(3)} B` 
                                    : `${(contador/(1000**2)).toFixed(3)} M` 
                                : `${(contador/(1000**1)).toFixed(3)} K`
                            : contador.toFixed(1)}
                        </div>
                        <div><button onClick={salvar}>salvar</button></div>
                    </div>
                    <div className={styles.melhorias}>
                        <div className={styles.container}>
                            {props?.melhorias.map((melhoria)=>(
                                <div onClick={() => comprarMelhoria(props.melhorias.indexOf(melhoria))} className={styles.item} key={melhoria.preco}>
                                    <img src={melhoria.foto} alt={melhoria.nome} />
                                    <div className={styles.melhoria_details}>
                                        <div>{melhoria.nome}</div>
                                        <div id={melhoria.nome}>
                                        {parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)]))) > 1000 ? 
                                            parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)]))) > 1000**2 ? 
                                                parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)]))) > 1000**3 ? 
                                                    parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)]))) > 1000**4 ? 
                                                        parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)]))) > 1000**5 ?
                                                            `${(parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)])))/(1000**5)).toFixed(2)}AA`
                                                        :`${(parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)])))/(1000**4)).toFixed(2)}T` 
                                                    :`${(parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)])))/(1000**3)).toFixed(2)}B` 
                                                : `${(parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)])))/(1000**2)).toFixed(2)}M` 
                                            : `${(parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)])))/(1000**1)).toFixed(2)}K`
                                        : parseInt(0.88 * melhoria.preco * (1.1 ** (props.estado.melhorias[props.melhorias.indexOf(melhoria)]))).toFixed(2)}</div>
                                    </div>
                                    <div id={props.melhorias.indexOf(melhoria)} >{props.estado.melhorias[props.melhorias.indexOf(melhoria)]}</div>
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
            {params: {nick: "testador2"}},
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