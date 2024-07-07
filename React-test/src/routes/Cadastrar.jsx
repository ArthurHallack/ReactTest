import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import engrenagemImg from "../img/engrenagem.png"
import NavBar from "../components/Nav";

import '../css/routes.css/cadastro.css'

const StyleCadastro = {
    width: "25rem"
}

function SignIn() {
    const RefCadastro1 = useRef()//Email
    const RefCadastro2 = useRef()
    const RefCadastro3 = useRef()
    const RefCadastro4 = useRef()//Nome
    const RefCadastro5 = useRef()//Celular
    const navigate = useNavigate()

    const Gravar = (e) => {
        e.preventDefault()
        var Usuario = RefCadastro1.current.value
        var confirmacao = RefCadastro2.current.value
        var Senha = RefCadastro3.current.value
        if (Senha === confirmacao) {

            localStorage.setItem("loginCadastro", Usuario)
            localStorage.setItem("senhaCadastro", Senha)
            navigate('/')

        } else {
            alert("Confirmação de senha incorreta")
        }
    }

    return (
        <div id="Tela-Cadastro">
            <NavBar/>
            <form id="Form-Cadastro">
                <img src={engrenagemImg} alt="engrenagem"  id="IMG-cadastro" style={StyleCadastro}/>
                <div id="Conteudo-Cadastro">
                    <div className="Single-input">
                        <input type="text" ref={RefCadastro1} className="inputCadastro" id="Email" required/>
                        <label for="Email">Email</label>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefCadastro1} className="inputCadastro" id="Nome" required/>
                        <label for="Nome">Nome</label>
                    </div>
                    <div className="Single-input">
                        <input type="tel" ref={RefCadastro1} className="inputCadastro" id="Celular" required/>
                        <label for="Celular">Celular</label>
                    </div>
                    <div className="Single-input">
                        <input type="password" ref={RefCadastro2} className="inputCadastro" id="Senha" required/>
                        <label for="Senha">Senha</label>
                    </div>
                    <div className="Single-input">
                        <input type="password" ref={RefCadastro3} className="inputCadastro" id="Csenha" required/>
                        <label for="Csenha">Confirme sua Senha</label>
                    </div>
                    <div className="Single-input">
                        <input type="checkbox" ref={RefCadastro1} className="inputCadastro" id="Sit" required/>
                        <label for="Sit">Situação</label>
                    </div>
                    <button type="submit" onClick={Gravar} id="cadastroBTN">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn
