import React, { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const Ref1 = useRef()
    const Ref2 = useRef()
    const navigate = useNavigate()
    const [loginCadastro, setLoginCadastro] = useState("")
    const [senhaCadastro, setSenhaCadastro] = useState("")

    useEffect(() => {
        const login = localStorage.getItem("loginCadastro")
        const senha = localStorage.getItem("senhaCadastro")
        if (login && senha) {
            setLoginCadastro(login)
            setSenhaCadastro(senha)
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
        if (valueLogin === loginCadastro && valueSenha === senhaCadastro) {
            navigate('/Home')
        } else {
            alert("Login ou senha Incorretos")
        }
    };

    return (
        <div id="Tela-Login">
            <form id="Form-Login">
                <img src="" alt="" id="img-Login"/>
                <div id="Conteudo-Form">
                    <div id="Conteudo-Form2">
                    <h1 id="H1Login">Login</h1>
                    <label htmlFor="" className="LabelLogin">Usuario</label>
                    <input type="text" className="InputLogin" ref={Ref1}/>
                    <label className="LabelLogin">Senha</label>
                    <input type="password" className="InputLogin" ref={Ref2}/>
                    <div id="DivBTN-Login">
                        <button type="submit" className="LoginBTN" id="LOGINBTN" onClick={Validation}>Log in</button>
                        <button type="button" className="LoginBTN" id="CadastroBTN" onClick={Cadastrar}>Cadastre-se</button>
                    </div>
                </div>
                </div>
            </form> 
        </div>
    )
}

export default Login