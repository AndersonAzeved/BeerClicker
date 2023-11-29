import React from 'react'
import Link from 'next/link'
import styles from '../styles/nav.module.css'

export default function Nav(){
    return (
        <ul className={styles.ul}>
            <li className={styles.li}>
                Beer Clicker
            </li>
        </ul>
    )
}