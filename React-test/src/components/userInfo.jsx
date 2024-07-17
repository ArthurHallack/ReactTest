import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FichaUsuario } from "../functions/usuario/fichaUsuario";

import '../css/componentes.css/userInfo.css'

function UserInfo ({idUser}) {

    //States 
    const [dadosUsuario, setdadosUsuario] = useState ([])
    //Effects
    useEffect(()=>{
        const fetchdata = async ()=>{
            const data = await FichaUsuario(idUser)
            setdadosUsuario(data)
        }

        fetchdata()
        
    },[idUser])


    //functions
    function showdata () {
        //deve aparecer
        window.document.getElementById('Container-dados').style.display="flex"
        //deve desaparecer
        window.document.getElementById('Container-edit').style.display="none"
        window.document.getElementById('Container-permisoes').style.display="none"
    }

    function showedit () {
        //deve aparecer
        window.document.getElementById('Container-edit').style.display="flex"
        //deve desaparecer
        window.document.getElementById('Container-dados').style.display="none"
        window.document.getElementById('Container-permisoes').style.display="none"
    }

    function showcontainer () {
        //deve aparecer
        window.document.getElementById('Container-permisoes').style.display="flex"
        //deve desaparecer
        window.document.getElementById('Container-edit').style.display="none"
        window.document.getElementById('Container-dados').style.display="none"
    }

    return(
        <div id="UserArea">
            <div id="Controler">
                <ul>                   
                    <li className= "BtnControler" onClick={showdata}>Dados</li>
                    <li className= "BtnControler" onClick={showedit}>Edição</li>
                    <li className= "BtnControler" onClick={showcontainer}>Permisões</li>
                </ul>
            </div>
            <div id="Container-dados">
                <ul>
                    <li>ID: {dadosUsuario.id}</li>
                    <li>Nome: {dadosUsuario.nome}</li>
                    <li>Email: {dadosUsuario.email}</li>
                    <li>Tel: {dadosUsuario.celular}</li>
                    <li>Senha: {dadosUsuario.senha_email}</li>
                    <li>Situação: {dadosUsuario.situacao}</li>
                </ul>
            </div>
            <div id="Container-edit">
                <h1>Mudada</h1>
            </div>
            <div id="Container-permisoes">
                <h1>Em breve</h1>
            </div>
        </div>
    )
}

export default UserInfo