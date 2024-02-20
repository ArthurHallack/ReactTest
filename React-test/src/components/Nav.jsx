import React from "react";
import cataventoImg from "../img/catavento.png"

const StyleNav = {
    width: "3rem"
}

function NavBar () {
    return (
        <nav id="nav-bar">
            <div id="Titulo-Container">
                <h1 id="H1-Nav">Catavento</h1>
                <img src={cataventoImg} alt="iconCatavento" style={StyleNav} />
            </div>
           <ul id="NavList">
            <li>Home</li>
            <li>Usuario</li>
            <li>Projeto</li>
            <li>Financeiro</li>
            <li>Sistema</li>
           </ul>
           <input type="range" />
        </nav>
    )
}

export default NavBar