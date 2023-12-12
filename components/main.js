import Footer from './footer'
import Nav from './nav'
import styles from '../styles/main.module.css'
import OffCanvas from './offCanvas'

export default function Main({children}){
    return (
        <>  
            <Nav/>
            <div className={styles.main}><div>{children}</div></div>
            <Footer/>
        </>
    )
}