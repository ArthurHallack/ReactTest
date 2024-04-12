import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavData } from "./NavData";
import { NavAux } from "./NavAux";
import PuserImg from "../img/Puser.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import '../css/componentes.css/nav.css';

function NavBar () {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [showAuxNav, setShowAuxNav] = useState(false);
    const [navAuxPosition, setNavAuxPosition] = useState({}); // Estado para armazenar as coordenadas do NavAux
    const navigate = useNavigate();
    const rotaG = ()=>{
        navigate('/Grafico')
    }
    const rotaC = ()=>{
        navigate('/Config')
    }

    const ativarAnimacao = () => {
        setIsComponentVisible(prevState => !prevState);
    }

    const handleItemClick = (id, event) => {
        const clickedElement = event.currentTarget;
        const rect = clickedElement.getBoundingClientRect();

        switch (id) {
            case "1":
                navigate('/Home');
                break;
            case "2":
                // Implemente ações para o id 2
                break;
            case "3":
                setShowAuxNav(true);
                setNavAuxPosition({
                    top: rect.top,
                    left: rect.right // Adicionando 1 rem (16px) para a direita em relação ao elemento clicado
                });
                break;
            case "4":
                rotaG()
                break;
            case "5":
                rotaC()
                break;

            default:
                // Ação padrão para outros ids
                break;
        }
    };

    const handleNavAuxMouseOut = () => {
        setShowAuxNav(false);
    };

    return (
        <div id="Componente" style={{ left: isComponentVisible ? '0' : '-18%' }}>
            <nav id="nav-bar">
                <div id="Hud">
                    <img src={PuserImg} alt="usuario"  id="UserImg"/>
                    <h1 id="UserName">Arthur Hallack</h1>
                    <p id="Titulo">Admin</p>
                </div>
                <ul id="NavList">
                    {NavData.map((val, key)=>{
                        return(
                            <li className="row" key={val.id} onClick={(event) => handleItemClick(val.id, event)}>
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
            {showAuxNav && <NavAux style={navAuxPosition} onMouseOut={handleNavAuxMouseOut} />} {/* Passar as coordenadas para o NavAux e adicionar evento onMouseOut */}
            <span id="BTN" onClick={ativarAnimacao}><FontAwesomeIcon icon={faBars}/></span>
        </div>
    )
}

export default NavBar;
