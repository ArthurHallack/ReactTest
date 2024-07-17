import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FichaUsuario } from "../functions/usuario/fichaUsuario";

import '../css/componentes.css/userInfo.css'

function UserInfo () {

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
                    <li onClick={showdata}>Dados</li>
                    <li onClick={showedit}>Edição</li>
                    <li onClick={showcontainer}>Permisões</li>
                </ul>
            </div>
            <div id="Container-dados">
                <h1>Yoshaaa</h1>
            </div>
            <div id="Container-edit">
                <h1>Mudada</h1>
            </div>
            <div id="Container-permisoes">
                <h1>kakoshina</h1>
            </div>
        </div>
    )
}

export default UserInfo