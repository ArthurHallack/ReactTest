import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import engrenagemImg from "../img/engrenagem.png"
import NavBar from "../components/Nav";
import { AlertS, AlertE } from "../components/Msg";
import { Cadastrar } from "../functions/usuario/cadastrar";
import { GetAllusuario } from "../functions/usuario/usuarioGetAll";
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

    //relacionadas ao gravar
    const [msgsucess, setMsgsucess] = useState (null)
    const [msgerro, setMsgerro] = useState (null)
    const [ConfSenha, setConfiSenha] = useState (null)


    //effects

    useEffect(()=>{
        if(msgerro=="Informação Já Cadastrada"){
            console.log("oi")
        } else if (msgerro=="E-mail inválido"){
            //window.document.getElementById('Email').style.borderBottom="2px solid rgb(254, 80, 61)"
        }
    },[msgerro])//mensagem de erro


    const Gravar = async (e) => {
        e.preventDefault()
        var Email = RefCadastro1.current.value
        var Senha = RefCadastro2.current.value
        var Csenha = RefCadastro3.current.value
        var Nome = RefCadastro4.current.value
        var Celular = RefCadastro5.current.value
        var Situacao = RefCadastro6.current.checked
        var AtualData = new Date();
        var FormDataAtual = AtualData.toISOString().split('T')[0];
        
        if (Senha === Csenha) {
            var data = {
                "id": 0,
	            "email": Email,
	            "nome": Nome,
	            "celular": Celular,
	            "senha_email": Senha,
	            "situacao": Situacao,
                "inc_usuario": 1,
	            "alt_usuario": 1,
	            "alt_dhsis": FormDataAtual,
	            "modulo_regs": []
            }
            var dados = await Cadastrar(data)

            if(dados.msgerro===""){
                setMsgsucess(true)
            }else{
                setMsgerro(dados.msgerro)
            }

            RefCadastro1.current.value=""
            RefCadastro2.current.value=""
            RefCadastro3.current.value=""
            RefCadastro4.current.value=""
            RefCadastro5.current.value=""
            RefCadastro6.current.checked=false
            
        }else {
            setMsgerro("Confirmação de senha Incorrreta")
        }


    }

    //Sucess MSG

    function handleSuccess () {
        setMsgsucess(null)
    }

    function handleError () {
        setMsgerro(null)
    }

    return (
        <div id="Tela-Cadastro">
            <NavBar/>
            <AlertS success={msgsucess} handleSuccess={handleSuccess}/>
            <AlertE error ={msgerro} handleError={handleError}/>
            <form id="Form-Cadastro">
                <img src={engrenagemImg} alt="engrenagem"  id="IMG-cadastro" style={StyleCadastro}/>
                <div id="Conteudo-Cadastro">
                    <div id="BtnsTopCadastro">
                        <span id="BtnPF">Pessoa Fisica</span>
                        <span id="BtnPJ">Pessoa Juridica</span>
                        <h1>Usuario</h1>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefCadastro1} className="inputCadastro" id="Email" required/>
                        <label htmlFor="Email">Email</label>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefCadastro4} className="inputCadastro" id="Nome" required/>
                        <label htmlFor="Nome">Nome</label>
                    </div>
                    <div className="Single-input">
                        <input type="tel" ref={RefCadastro5} className="inputCadastro" id="Celular" required/>
                        <label htmlFor="Celular">Celular</label>
                    </div>
                    <div className="Single-input">
                        <input type="password" ref={RefCadastro2} className="inputCadastro" id="Senha" required/>
                        <label htmlFor="Senha">Senha</label>
                    </div>
                    <div className="Single-input">
                        <input type="password" ref={RefCadastro3} className="inputCadastro" id="Csenha" required/>
                        <label htmlFor="Csenha">Confirme sua Senha</label>
                    </div>
                    <div className="Single-input" id="DivInputSit">
                        <input type="checkbox" ref={RefCadastro6} className="inputCadastro" id="Sit" required/>
                        <label htmlFor="Sit" id="labelSit">Situação</label>
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
