import React from "react";
import NavBar from "../components/Nav";
import Menu from "../components/Menu";

function Home () {
    return (
        <div id="Tela-Home">
            <NavBar/>
            <div id="Conteudo-Home">
                <Menu/>
            </div>
        </div>
    )
}

export default Home