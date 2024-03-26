import React from "react";
import cataventoImg from "../img/catavento.png"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from "@fortawesome/free-solid-svg-icons"


const StyleNav = {
    width: "3rem"
}

const StyleMoon = {
    cursor: 'pointer'
}

function NavBar () {

    const navigate = useNavigate()
    const Redirect = ()=>{
        navigate('/Home')
    }

    return (
        <nav id="nav-bar">
            <div id="Titulo-Container">
                <h1 id="H1-Nav">Catavento</h1>
                <img src={cataventoImg} alt="iconCatavento" style={StyleNav} />
            </div>
           <ul id="NavList">
            <li className="LiNav" onClick={Redirect}>Home</li>
            <li className="LiNav">Usuario</li>
            <li className="LiNav">Tabelas</li>
            <li className="LiNav">Financeiro</li>
            <li className="LiNav">Sistema</li>
           </ul>
           <FontAwesomeIcon icon={faMoon} style={StyleMoon} />
        </nav>
    )
}

export default NavBar