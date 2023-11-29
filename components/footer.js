import Image from 'next/image';
import styles from '../styles/footer.module.css'


export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={styles.devs}>
                <p>Anderson</p>
                <p>Cleomar</p>
                <p>Marlon</p>
            </div>
        </footer>
    )
}