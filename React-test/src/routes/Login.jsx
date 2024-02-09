import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const Ref1 = useRef()
    const Ref2 = useRef()
    const navigate = useNavigate()

    useEffect(() => {

        const loginCadastro = localStorage.getItem("loginCadastro")
        const senhaCadastro = localStorage.getItem("senhaCadastro")
        if (loginCadastro && senhaCadastro) {
            console.log(senhaCadastro)
        }
    }, [])

    const Cadastrar = (e) => {
        e.preventDefault()
        navigate('/Cadastro')
    }
    
    const Validation = (e) => {
        e.preventDefault();
        const valueLogin = Ref1.current.value
        const valueSenha = Ref2.current.value

        console.log("Login:", valueLogin)
        console.log("Senha:", valueSenha)
    };

    return (
        <div id="Container-Login">
            <form id="Form-Login">
                <h1 id="H1Login">Login</h1>
                <label htmlFor="" className="LabelLogin">Usuario</label>
                <input type="text" className="InputLogin" ref={Ref1}/>
                <label className="LabelLogin">Senha</label>
                <input type="password" className="InputLogin" ref={Ref2}/>
                <button type="submit" className="LoginBTN" onClick={Validation}>Login</button>
                <button type="button" className="LoginBTN" id="CadastroBTN" onClick={Cadastrar}>Cadastre-se</button>
            </form> 
        </div>
    )
}

export default Login