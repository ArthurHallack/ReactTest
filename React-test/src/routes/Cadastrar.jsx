import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import engrenagemImg from "../img/engrenagem.png"
import cadeadoImg from "../img/cadeado.png"
import informaImg from "../img/informa.png"
import editarImg from "../img/editar.png"
import NavBar from "../components/Nav";
import MsgConfirmUser from "../components/confirmUser";
import UserNav from "../components/UserNav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faBroom } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faTrash, faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { AlertS, AlertE } from "../components/Msg";
import { Cadastrar } from "../functions/usuario/cadastrar";
import { GetAllusuario } from "../functions/usuario/usuarioGetAll";
import { FichaUsuario } from "../functions/usuario/fichaUsuario";

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
    const RefEdit1 = useRef()//Email
    const RefEdit2 = useRef()//Senha
    const RefEdit3 = useRef()//Csenha
    const RefEdit4 = useRef()//Nome
    const RefEdit5 = useRef()//Celular
    const RefEdit6 = useRef()//Situação

    //relacionadas ao gravar
    const [msgsucess, setMsgsucess] = useState (null)
    const [msgerro, setMsgerro] = useState (null)
    const [ConfSenha, setConfiSenha] = useState (null)

    //relacionados a componentes 
    const [confirmVisivel, setconfirmVisivel] = useState (false)
    const [arrayConfirm, setarrayConfirm] = useState ([])

    const [formAddVisivel, setformAddVisivel] = useState (false)
    const [formDataVisivel, setformDataVisivel] = useState (false)
    const [formPermiVisivel, setformPermiVisivel] = useState (false)
    const [formEditVisivel, setformEditVisivel] = useState (false)
    const [userNav, setuserNav] = useState (false)
    const [ListaVisivel, setListaVisivel] = useState (true)

    //relacionados a lista de usuarios

    const [Usuario, setUsuario] = useState ([]) //lista de usuarios

    const [DadosDoUsuario, setDadosDoUsuario] = useState ([]) //dados do usuario


    //effects

    useEffect(()=>{
        if(msgerro=="Informação Já Cadastrada"){
            
        } else if (msgerro=="E-mail inválido"){
            //window.document.getElementById('Email').style.borderBottom="2px solid rgb(254, 80, 61)"
        }
    },[msgerro])//mensagem de erro

    useEffect (()=>{
        async function fetchData () {
            const data = await GetAllusuario()
            setUsuario(data)
        }
        fetchData()
    },[]) //Responsavel pela Lista de usuarios a ser renderizada

    useEffect (()=>{
        if(formAddVisivel===true){
            window.document.getElementById('Tela-Cadastro').style.justifyContent="center"
            //aparecer
            window.document.getElementById('Form-Cadastro').style.display="flex"
            //desaparecer
            window.document.getElementById('SecTop').style.display="none"
            window.document.getElementById('Table-Usuario').style.display="none"
        }else{
             window.document.getElementById('Form-Cadastro').style.display="none"
        }
    },[formAddVisivel])// faz o formulario de add aparecer

    useEffect (()=>{
        if (ListaVisivel===true){
            //deve aparecer
            window.document.getElementById('Tela-Cadastro').style.justifyContent=""
            window.document.getElementById('SecTop').style.display="flex"
            window.document.getElementById('Table-Usuario').style.display="flex"
            //desaparecer
            window.document.getElementById('Form-Cadastro').style.display="none"
        }
    },[ListaVisivel])//responsavel por controlar a aparição da lista

    useEffect(()=>{
        if(formDataVisivel===true){
            window.document.getElementById('Tela-Cadastro').style.justifyContent="center"
            //aparecer
            window.document.getElementById('Form-Data').style.display="flex"
            //desaparecer
            window.document.getElementById('SecTop').style.display="none"
            window.document.getElementById('Table-Usuario').style.display="none"
            window.document.getElementById('Form-Cadastro').style.display="none"
        }else{
            window.document.getElementById('Form-Data').style.display="none"
       }
    },[formDataVisivel])// faz o formulario de data aparecer

    useEffect(()=>{
        if(formPermiVisivel===true){
            window.document.getElementById('Tela-Cadastro').style.justifyContent="center"
            //aparecer
            window.document.getElementById('Form-Permi').style.display="flex"
            //desaparecer
            window.document.getElementById('SecTop').style.display="none"
            window.document.getElementById('Table-Usuario').style.display="none"
            window.document.getElementById('Form-Cadastro').style.display="none"
        }else{
            window.document.getElementById('Form-Permi').style.display="none"
        }
    },[formPermiVisivel])// faz o formulario de permi aparecer

    useEffect(()=>{
        if(formEditVisivel===true){
            window.document.getElementById('Tela-Cadastro').style.justifyContent="center"
            //aparecer
            window.document.getElementById('Form-Edit').style.display="flex"
            //desaparecer
            window.document.getElementById('SecTop').style.display="none"
            window.document.getElementById('Table-Usuario').style.display="none"
            window.document.getElementById('Form-Cadastro').style.display="none"
            window.document.getElementById('Form-Permi').style.display="none"

            RefEdit1.current.value = DadosDoUsuario.email//Email
            RefEdit2.current.value = DadosDoUsuario.senha_email//Senha
            RefEdit4.current.value = DadosDoUsuario.nome//Nome
            RefEdit5.current.value = DadosDoUsuario.celular//Celular
            RefEdit6.current.checked = DadosDoUsuario.situacao//Situação

        }else{
            window.document.getElementById('Form-Edit').style.display="none"
        }
    },[formEditVisivel])

    

    //RELACINADAS AO FORMULARIO------------------------------------------------------------------------------------------------------------------------------------------------
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
                setformAddVisivel(false)
                setuserNav(false)

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

    const Confirmar = async (e)=>{
        e.preventDefault()
        var Email = RefEdit1.current.value
        var Senha = RefEdit2.current.value
        var Nome = RefEdit4.current.value
        var Celular = RefEdit5.current.value
        var Situacao = RefEdit6.current.checked
        var AtualData = new Date();
        var FormDataAtual = AtualData.toISOString().split('T')[0]

        var data = {
            "id": DadosDoUsuario.id,
	        "email": Email,
	        "nome": Nome,
	        "celular": Celular,
	        "senha_email": Senha,
	        "situacao": Situacao,
	        "inc_usuario": 1,
	        "inc_dusuario": "? DESCONHECIDO ?",
	        "inc_dhsis": DadosDoUsuario.inc_dhsis,
	        "alt_usuario": 1,
	        "alt_dusuario": "? DESCONHECIDO ?",
	        "alt_dhsis": FormDataAtual,
	        "modulo_regs": []
            }

            var dados = await Cadastrar(data)

            if (dados.msgerro===""){
                setMsgsucess(true)
                setListaVisivel(true)
                setformAddVisivel(false)
                setformEditVisivel(false)
                setuserNav(false)
            }else{
                setMsgerro(dados.msgerro)
            }
        }

    //Sucess MSG

    function handleSuccess () {
        setMsgsucess(null)
    }

    function handleError () {
        setMsgerro(null)
    }
    //-----

    function formAddTrue () {
        setformAddVisivel(true)
    }

    function formAddFalse () {
        setformAddVisivel(false)
    }

    function formDataTrue () {
        setformDataVisivel(true)
    }

    function formDataFalse () {
        setformDataVisivel(false)
    }

    function FormPermiTrue () {
        setformPermiVisivel(true)
    }

    function FormPermiFalse () {
        setformPermiVisivel(false)
    }

    function FormEditTrue () {
        setformEditVisivel(true)
    }

    function FormEditFalse () {
        setformEditVisivel(false)
    }

    function estadoNavUserF () {
        setuserNav(false)
    }

    function listaVisivelT () {
        setListaVisivel(true)
    }

    function listaVisivelF () {
        setListaVisivel(false)
    }


    //FIM DAS RELACIONADAS AO FORMULARIO---------------------------------------------------------------------------------------------------------------------------------------

    //relacionadas aos botões iniciais

    function ADD () {
        setformAddVisivel(true)
        setuserNav(true)
        listaVisivelF()
    }

    //FUNÇÕES DA MSG DE CONFIRMAÇÃO AO EXCLUIR

    function fecharConfirm () {
        setconfirmVisivel(false)
    }

    function mensagemErro (element) {
        setMsgerro(element.msgerro)
    }

    function excluir (element){
        setUsuario(prevUsers => prevUsers.filter(user => user.id !== element.id))
    }

    const Exclui = async (element) => {

        setconfirmVisivel(true)
        setarrayConfirm(element)

    }

    // relacinadas ao BTN de informações e editar

    async function infos (id) {
        var informacoes = await FichaUsuario(id)
        setDadosDoUsuario(informacoes)
        setListaVisivel(false)
        setformAddVisivel(false)
        setformDataVisivel(true)
        setformPermiVisivel(false)
        setformEditVisivel(false)
        setuserNav(true)
    }

    async function editarUsuario (id) {
        var informacoes = await FichaUsuario(id)
        setDadosDoUsuario(informacoes)
        setListaVisivel(false)
        setformAddVisivel(false)
        setformDataVisivel(false)
        setformPermiVisivel(false)
        setformEditVisivel(true)
        setuserNav(true)
    }

    return (
        <div id="Tela-Cadastro">
            <NavBar/>
            <AlertS success={msgsucess} handleSuccess={handleSuccess}/>
            <AlertE error ={msgerro} handleError={handleError}/>
            <MsgConfirmUser estado ={confirmVisivel} estadoF ={fecharConfirm} element={arrayConfirm} error = {mensagemErro} excluir ={excluir}/>
            <UserNav add ={formAddVisivel} addF ={formAddFalse} addT ={formAddTrue} data={formDataVisivel} dataT ={formDataTrue} dataF ={formDataFalse}
            estado ={userNav} fechar ={estadoNavUserF} listaT ={listaVisivelT} listaF ={listaVisivelF} permi ={formPermiVisivel} permiT ={FormPermiTrue} permiF ={FormPermiFalse}
            edit ={formEditVisivel} editT ={FormEditTrue} editF ={FormEditFalse}/>
            <div id="SecTop">
                <h1>Usuarios</h1>
                <div id="SecTopBTN">
                    <button onClick={ADD}><FontAwesomeIcon icon={faPlus} /></button>
                    <button ><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <form id="Form-Cadastro">
                <img src={engrenagemImg} alt="engrenagem"  id="IMG-cadastro" style={StyleCadastro}/>
                <div id="Conteudo-Cadastro">
                    <div id="BtnsTopCadastro">
                        <h1 id="h1Cadastro">Usuario</h1>
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
            <form id="Form-Data">
                <img src={informaImg} alt="engrenagem"  id="IMG-Data" style={StyleCadastro}/>
                <div id="Conteudo-Data">
                    <div id="Titulo-DataForm">
                        <h1>Informações Gerais</h1>
                    </div>
                    <div id="Infos-Data">
                        <div className="Campo-Data">
                            <label htmlFor="" className="Label-Data">ID: </label>
                            <span className="span-data">{DadosDoUsuario.id}</span>
                        </div>
                        <div className="Campo-Data">
                            <label htmlFor="" className="Label-Data">Nome: </label>
                            <span className="span-data">{DadosDoUsuario.nome}</span>
                        </div>
                        <div className="Campo-Data">
                            <label htmlFor="" className="Label-Data">Email: </label>
                            <span className="span-data">{DadosDoUsuario.email}</span>
                        </div>
                        <div className="Campo-Data">
                            <label htmlFor="" className="Label-Data">Celular: </label>
                            <span className="span-data">{DadosDoUsuario.celular}</span>
                        </div>
                        <div className="Campo-Data">
                            <label htmlFor="" className="Label-Data">Senha: </label>
                            <span>{DadosDoUsuario.senha_email}</span>
                        </div>
                        <div className="Campo-Data">
                            <label htmlFor="" className="Label-Data">Situação: </label>
                            <span className="span-data">{DadosDoUsuario.situacao}</span>
                        </div>
                    </div>
                </div>
            </form>
            <form id="Form-Permi">
                <img src={cadeadoImg} alt="engrenagem"  id="IMG-Permi" style={StyleCadastro}/>
                <div id="Conteudo-Permi">
                    <h1>Em breve</h1>
                </div>
            </form>
            <form id="Form-Edit">
                <img src={editarImg} alt="engrenagem"  id="IMG-cadastro" style={StyleCadastro}/>
                <div id="Conteudo-Cadastro">
                    <div id="BtnsTopEdit">
                        <h1 id="h1Edit">Editar</h1>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefEdit1} className="inputCadastro" id="Email" required/>
                        <label htmlFor="Email">Email</label>
                    </div>
                    <div className="Single-input">
                        <input type="text" ref={RefEdit4} className="inputCadastro" id="Nome" required/>
                        <label htmlFor="Nome">Nome</label>
                    </div>
                    <div className="Single-input">
                        <input type="tel" ref={RefEdit5} className="inputCadastro" id="Celular" required/>
                        <label htmlFor="Celular">Celular</label>
                    </div>
                    <div className="Single-input">
                        <input type="password" ref={RefEdit2} className="inputCadastro" id="Senha" required/>
                        <label htmlFor="Senha">Senha</label>
                    </div>
                    <div className="Single-input" id="DivInputSit">
                        <input type="checkbox" ref={RefEdit6} className="inputCadastro" id="Sit" required/>
                        <label htmlFor="Sit" id="labelSit">Situação</label>
                    </div>
                    <div id="DivCadastroBTN">
                        <button type="submit" onClick={Confirmar} id="editarBTN">Confirmar</button>
                    </div>
                </div>
            </form>
            <div id="Table-Usuario">
                <div id="HudUsuario">
                    <ul>
                        <li id="HudIdU">ID</li>
                        <li id="HudNomeU">Nome</li>
                    </ul>
                </div>
                <div id="Conteudo-Usuario-Container">
                    <div id="Table-Usuario-Interno">
                        <div id="Table-Usuario1">
                            {Usuario.map((usuario,index)=>(
                                <ul key={usuario.id} className={`Todo-List-Users ${usuario.hidden ? 'hidden' : ''}`}>
                                    <li className="Todo-List-li id-tdListU">{usuario.id}</li>
                                    <li className="Todo-List-li nome-tdListU">{usuario.nome}</li>
                                    <li className="li-td-btn">
                                        <div className="BTNs-tdList-Users">
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={()=>{infos(usuario.id)}}/>
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={()=>{editarUsuario(usuario.id)}}/>
                                            <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(usuario)}}/>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div id="Table-Usuario2">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
