import Image from 'next/image';
import styles from '../styles/footer.module.css'


export default function Footer(){
    return (
        <footer className={styles.footer}>
            <p>Veja o projeto</p>
            <a target='_blank' href='https://github.com/AndersonAzeved/BeerClicker'><Image src="/github.png" width={35} height={35} alt='github'/></a>
        </footer>
    )
}