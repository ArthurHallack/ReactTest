import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import engrenagemImg from "../img/engrenagem.png"

const StyleCadastro = {
    width: "25rem"
}

function SignIn() {
    const RefCadastro1 = useRef()
    const RefCadastro2 = useRef()
    const RefCadastro3 = useRef()
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
            <form id="Form-Cadastro">
                <img src={engrenagemImg} alt="engrenagem"  id="IMG-cadastro" style={StyleCadastro}/>
                <div id="Conteudo-Cadastro">
                    <label>Usuário</label>
                    <input type="text" ref={RefCadastro1} className="inputCadastro"/>
                    <label>Senha</label>
                    <input type="password" ref={RefCadastro2} className="inputCadastro"/>
                    <label>Confirme sua Senha</label>
                    <input type="password" ref={RefCadastro3} className="inputCadastro"/>
                    <button type="submit" onClick={Gravar} id="cadastroBTN">Cadastrar</button>
                </div>
        </form>
        </div>
    )
}

export default SignIn
