import React from "react";
import NavBar from "../components/Nav";
import Menu from "../components/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from "@fortawesome/free-solid-svg-icons"

function Home () {
    return (
        <div id="Tela-Home">
            <NavBar/>
            <div id="Conteudo-Home">
                <Menu/>
                <div id="Div-Conteudo-Home">
                    <h1 id="H1-Conteudo-Home">React Project </h1>
                    <h2 id="H2-Conteudo-Home" className="h2Home">Home Page</h2>
                    <h2 id="H3-Conteudo-Home" className="h2Home">Inicie sua sessão agora mesmo !</h2>
                </div>
            </div>
        </div>
    )
}

export default Home