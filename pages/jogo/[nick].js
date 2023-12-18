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
    const [contador, setContador] = useState(props.estado?.total)
    const [estado, setEstado] = useState()
    let producoes = 0
    for (let index = 1; index < 17; index++) {
        producoes += props.melhorias[index].producao * props.estado.melhorias[index]
    }
    let clicks = 1 + props.estado.melhorias[0] * 0.1

    const [producao, setProducao] = useState(producoes)
    const [click, setClick] = useState(clicks)

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

    const comprarMelhoria = (indice) =>{
        let val_cont = document.getElementById('contador').textContent
        let mult = val_cont[val_cont.length - 1];
        let val_total = 0
        val_total = (mult == 'K') ? (parseFloat(val_cont) * (1000**1)):
                        (mult == 'M') ? (parseFloat(val_cont) * (1000**2)):
                            (mult == 'B') ? (parseFloat(val_cont) * (1000**3)):
                                (mult == 'T') ? (parseFloat(val_cont) * (1000**4)):
                                    (mult == 'A') ? (parseFloat(val_cont) * (1000**5)):
                                        (parseInt(val_cont) * 1000**0)

        let val_preco = document.getElementById(props.melhorias[indice].nome).textContent
        let mult_preco = val_preco[val_preco.length - 1];
        let preco_total = 0
        preco_total = (mult_preco == 'K') ? (parseFloat(val_preco) * (1000**1)):
                        (mult_preco == 'M') ? (parseFloat(val_preco) * (1000**2)):
                            (mult_preco == 'B') ? (parseFloat(val_preco) * (1000**3)):
                                (mult_preco == 'T') ? (parseFloat(val_preco) * (1000**4)):
                                    (mult_preco == 'A') ? (parseFloat(val_preco) * (1000**5)):
                                        (parseInt(val_preco) * 1000**0)
        if(preco_total <= val_total){
            setContador((prevCont) => prevCont - preco_total)
            if(indice > 0){
                const val = props.melhorias[indice].producao
                setProducao(producao+val)
            }else{
                setClick( 1 + (props.melhorias[indice].producao * (parseInt(document.getElementById(indice).textContent) + 1)))
            }
            let melhorias = props.estado.melhorias
            melhorias[indice] += 1
            const data = {
                melhorias: melhorias,
                click: click,
                total: val_total,
                producao: parseFloat(producao)
            }
            document.getElementById(indice).innerHTML = `<div>${melhorias[indice]}</div>`
            updateUserMelhorias(nick,data,true).then(()=>{console.log('comprou')}).catch((e)=>{console.log("não comprou")})
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

    if(props.estado?.total == undefined || props.estado?.total == null){
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
                    <title>{nick}</title>
                    <div className={styles.container}>
                        <div className={styles.statistics}>
                            <div>
                                <div colSpan={2}>Estatísticas</div>
                            </div>
                            <div>
                                <div>Click:
                                    {click > 1000 ? 
                                        click > 1000**2 ? 
                                            click > 1000**3 ? 
                                                click > 1000**4 ? 
                                                    click > 1000**5 ?
                                                        `${(click/(1000**5)).toFixed(3)}AA`
                                                    :`${(click/(1000**4)).toFixed(3)}T` 
                                                :`${(click/(1000**3)).toFixed(3)}B` 
                                            : `${(click/(1000**2)).toFixed(3)}M` 
                                        : `${(click/(1000**1)).toFixed(3)}K`
                                    : click.toFixed(1)}
                                </div>
                            </div>
                            <div>
                                <div>Cps:
                                    {producao > 1000 ? 
                                        producao > 1000**2 ? 
                                            producao > 1000**3 ? 
                                                producao > 1000**4 ? 
                                                    producao > 1000**5 ?
                                                        `${(producao/(1000**5)).toFixed(3)}AA`
                                                    :`${(producao/(1000**4)).toFixed(3)}T` 
                                                :`${(producao/(1000**3)).toFixed(3)}B` 
                                            : `${(producao/(1000**2)).toFixed(3)}M` 
                                        : `${(producao/(1000**1)).toFixed(3)}K`
                                    : producao.toFixed(1)}
                                </div>
                            </div>
                        </div>
                        <Button onClick={salvar}>save</Button>
                    </div>
                    <div className={styles.container}>
                        <img className={styles.beer} onClick={addContador} src="/beer.png"/>
                        <br/><br/>
                        <div className={styles.contador} id="contador">
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
                <CervejaSpin/>
            )
        }
    }


    
}

export async function getStaticPaths(){
    return {
        paths:[
            {params: {nick: "marlin"}},
            {params: {nick: "Anderson Azevedo da Silva"}},
            {params: {nick: "testador2"}},
            {params: {nick: "testando"}},
            {params: {nick: "Fabricio10"}},
            {params: {nick: "fabricio10"}},
            {params: {nick: "fabricio"}},
            {params: {nick: "fafa"}},
            {params: {nick: "bibi"}},
            {params: {nick: "Marlon"}},
            {params: {nick: "baiano"}},
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