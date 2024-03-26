import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavData } from "./NavData";
import PuserImg from "../img/Puser.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import '../css/componentes.css/nav.css';

function NavBar () {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const navigate = useNavigate();

    const ativarAnimacao = () => {
        setIsComponentVisible(prevState => !prevState);
    }

    const Redirect = (id) => {
        console.log(id);
        switch (id) {
            case "1":
                navigate('/Home');
                break;
            case "2":
                // Implemente ações para o id 2
                break;
            case "3":
                // Implemente ações para o id 3
                break;
            // Adicione mais casos conforme necessário
            default:
                // Ação padrão para outros ids
                break;
        }
    };

    return (
        <div id="Componente" style={{ left: isComponentVisible ? '0' : '-38.6vh' }}>
            <nav id="nav-bar">
                <div id="Hud">
                    <img src={PuserImg} alt="usuario"  id="UserImg"/>
                    <h1 id="UserName">Arthur Hallack</h1>
                    <p id="Titulo">Admin</p>
                </div>
                <ul id="NavList">
                    {NavData.map((val, key)=>{
                        return(
                            <li className="row" key={val.id}  id={window.location.pathname == val.link ? "active" : "" }onClick={() => Redirect(val.id)}>
                                <div id="icon">
                                    {val.icon}
                                </div>
                                <div id="title">
                                    {val.title}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <span id="BTN" onClick={ativarAnimacao}><FontAwesomeIcon icon={faBars}/></span>
        </div>
    )
}

export default NavBar;
