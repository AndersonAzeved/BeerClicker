import React from 'react'
import Link from 'next/link'
import styles from '../styles/nav.module.css'
import { useRouter } from 'next/router'
import {sair, autenticar} from '../util/firebase'

export default function Nav(){
    const router = useRouter()

    const voltar = () => {
        sair()
        router.push('/usuario/login')
    }

    if(router.pathname == '/'){
        return (
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href='/' className={styles.link}><h5>Beer Clicker</h5></Link>
                </li>
                <div className={styles.botoes}>
                    <a href='/usuario/login' type="button" className="btn btn-primary btn-sm">Log in</a>
                    <a href='/usuario/cadastro' type="button" className="btn btn-success btn-sm">Sign up</a>
                </div>
            </ul>
        )
    }else if(autenticar()){
        return (
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href='/' className={styles.link}><h5>Beer Clicker</h5></Link>
                </li>
                <div className={styles.botoes}>
                    <a href='/usuario/login' onClick={voltar} type="button" className="btn btn-primary btn-sm">Sair</a>
                </div>
            </ul>
        )
    }

    return (
        <ul className={styles.ul}>
            <li className={styles.li}>
                <Link href='/' className={styles.link}><h5>Beer Clicker</h5></Link>
            </li>
        </ul>
    )
}