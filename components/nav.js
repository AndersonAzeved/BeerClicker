import React from 'react'
import Link from 'next/link'
import styles from '../styles/nav.module.css'
import { useRouter } from 'next/router'

export default function Nav(){
    const router = useRouter()

    if(router.pathname == '/'){
        return (
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href='/' className={styles.link}><h5>Beer Clicker</h5></Link>
                </li>
                <div className={styles.botoes}>
                    <a href='/usuario/login' type="button" className="btn btn-primary btn-sm">Sig in</a>
                    <a href='/usuario/cadastro' type="button" className="btn btn-success btn-sm">Sig up</a>
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