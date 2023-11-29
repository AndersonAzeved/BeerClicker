export default function Login(){
    return(
        <div>
            <h1>Fazer Login</h1>
            <div>
                <input placeholder="Email" type="email" required/>
                <input placeholder="Senha" type="password" required/>
                <button type="submit">Log in</button>
            </div>
        </div>
    )
}