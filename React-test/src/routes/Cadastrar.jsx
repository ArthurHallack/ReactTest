import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import engrenagemImg from "../img/engrenagem.png"
import NavBar from "../components/Nav";
import { AlertS } from "../components/Msg";

import '../css/routes.css/cadastro.css'

const StyleCadastro = {
    width: "25rem"
}

function SignIn() {
    const RefCadastro1 = useRef()//Email
    const RefCadastro2 = useRef()//Senha
    const RefCadastro3 = useRef()//Csenha
    const RefCadastro4 = useRef()//Nome
    const RefCadastro5 = useRef()//Celular
    const RefCadastro6 = useRef()//Situação
    const navigate = useNavigate()

    const [msgsucess, setMsgsucess] = useState (null)
    const [ConfSenha, setConfiSenha] = useState (null)


    const Gravar = (e) => {
        e.preventDefault()
        var Email = RefCadastro1.current.value
        var Senha = RefCadastro2.current.value
        var Csenha = RefCadastro3.current.value
        var Nome = RefCadastro4.current.value
        var Celular = RefCadastro5.current.value
        var Situacao = RefCadastro6.current.checked
        
        if (Senha === Csenha) {
            var data = {
                "id": 0,
	            "email": Email,
	            "nome": Nome,
	            "celular": Celular,
	            "senha_email": Senha,
	            "situacao": Situacao
            }
        }


    }

    //Sucess MSG

    function handleSuccess () {
        setMsgsucess(null)
    }

    return (
        <div id="Tela-Cadastro">
            <NavBar/>
            <AlertS success={msgsucess} handleSuccess={handleSuccess}/>
            <form id="Form-Cadastro">
                <img src={engrenagemImg} alt="engrenagem"  id="IMG-cadastro" style={StyleCadastro}/>
                <div id="Conteudo-Cadastro">
                    <div id="BtnsTopCadastro">
                        <span id="BtnPF">Pessoa Fisica</span>
                        <span id="BtnPJ">Pessoa Juridica</span>
                        <h1>Pessoa Fisica</h1>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefCadastro1} className="inputCadastro" id="Email" required/>
                        <label for="Email">Email</label>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefCadastro4} className="inputCadastro" id="Nome" required/>
                        <label for="Nome">Nome</label>
                    </div>
                    <div className="Single-input">
                        <input type="tel" ref={RefCadastro5} className="inputCadastro" id="Celular" required/>
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
                    <div className="Single-input" id="DivInputSit">
                        <input type="checkbox" ref={RefCadastro6} className="inputCadastro" id="Sit" required/>
                        <label for="Sit" id="labelSit">Situação</label>
                    </div>
                    <div id="DivCadastroBTN">
                        <button type="submit" onClick={Gravar} id="cadastroBTN">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignIn
