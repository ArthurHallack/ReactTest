import React from "react";
import NavBar from "../components/Nav";
import PuserImg from "../img/Puser.png";
import "../css/routes.css/config.css"

function Config () {
    return(
        <div id="tela">
            <NavBar/>
            <div id="hud">
                <div id="lateral">
                    <section id="menu">
                        <img src={PuserImg} alt="usuario" />
                        <ul>
                            <li><h1>Arthur Hallack</h1></li>
                            <li><h2>Admin</h2></li>
                            <li><p><i>integrasis account</i></p></li>
                        </ul>
                    </section> 
                </div>               
            </div>
        </div>
    )
}

export default Config