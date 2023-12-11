import Image from 'next/image';
import styles from '../styles/footer.module.css'


export default function Footer(){
    return (
        <footer className={styles.footer}>
            <p>Veja o projeto</p>
            <a target='_blank' href='https://github.com/AndersonAzeved/BeerClicker'><img src='github.png'></img></a>
        </footer>
    )
}