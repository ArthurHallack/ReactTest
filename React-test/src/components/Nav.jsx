import React from "react";
import cataventoImg from "../img/catavento.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from "@fortawesome/free-solid-svg-icons"


const StyleNav = {
    width: "3rem"
}

const StyleMoon = {
    cursor: 'pointer'
}

function NavBar () {
    return (
        <nav id="nav-bar">
            <div id="Titulo-Container">
                <h1 id="H1-Nav">Catavento</h1>
                <img src={cataventoImg} alt="iconCatavento" style={StyleNav} />
            </div>
           <ul id="NavList">
            <li className="LiNav">Home</li>
            <li className="LiNav">Usuario</li>
            <li className="LiNav">Projeto</li>
            <li className="LiNav">Financeiro</li>
            <li className="LiNav">Sistema</li>
           </ul>
           <FontAwesomeIcon icon={faMoon} style={StyleMoon} />
        </nav>
    )
}

export default NavBar