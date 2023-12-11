import styles from '../styles/index.module.css'

export default function Home(){
    return(
        <div className={styles.page}>
            <title>Beer Clicker</title>
            <h1 className={styles.title}>Olá, bem-vindo ao Beer Clicker</h1><br/>
            <div className={styles.sobre}>
                <div className={styles.image}>
                    <img src="beer.png" className={styles.beer}/>
                    <div className={styles.texto}>
                        <p>
                            Beer Clicker é um jogo desenvolvido por Anderson Azevedo da Silva, Cleomar Junior e Marlon Silva,
                            estudantes do quarto período do curso de Sistemas de Informação da Universidade Federal do 
                            Rio Grande do Norte, para a disciplina de Programação Web ministrada pelo professor Fabrício
                            Vale.
                        </p>
                        <p>
                            O projeto basicamente consiste em um idle game, fortemente inspirado no jogo "Cookie Clicker"
                            Nele o jogador tem o objetivo de juntar a maior quantidade de cookies, e ele também pode
                            adquirir upgrades que aumentam sua produção de cookies automaticamente. O nosso jogo segue a
                            mesma idéia, porém ao invés de cookies usamos a temática de cervejas, além de que, para nosso
                            jogo tivemos a idéia de adicionar um ranking, para instigar a competitividade.
                        </p>
                    </div>
                </div>
                
            <div><br/>
                <h1 className={styles.title}>Desenvolvedores</h1><br/>
                <div className={styles.devs}>
                    <div className={styles.dev}>
                        <h5>Anderson Azevedo da Silva</h5>
                        <img src="/devs/anderson.jpg"/>
                    </div><br/>
                    <div>
                        <h5>Cleomar Souza dos Santos Junior</h5>
                        <img src="/devs/cleomar.jpeg"/>
                    </div><br/>
                    <div>
                        <h5>Marlon Silva Dantas</h5>
                        <img src="/devs/marlon.jpeg"/>
                    </div><br/>
                </div>
            </div>
            </div>
        </div>
    )
}