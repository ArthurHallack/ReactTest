import React, { useRef } from "react";
import '../css/componentes.css/NavAux.css'
import { useNavigate } from "react-router-dom";

function NavAux ({ style, onMouseOut }) {
    const navAuxRef = useRef(null);
    const navigate = useNavigate();

    const navegar = () => {
        navigate('/Pais');
    }

    const navegar2 = () => {
        navigate('/Municipio');
    }

    const navegar3 = () => {
        navigate('/Aeroporto');
    }

    const handleMouseOut = (event) => {
        if (!navAuxRef.current.contains(event.relatedTarget)) {
            onMouseOut();
        }
    };

    return(
        <div id="Aux" style={{ position: 'absolute', top: style.top, left: style.left }} onMouseOut={handleMouseOut} ref={navAuxRef}>
            <span onClick={navegar}>Pais</span>
            <span onClick={navegar2}>Municipio</span>
            <span onClick={navegar3}>Aeroporto</span>
        </div>
    );
}

function NavAuxP () {
    return(
        <div>
            <span>Pessoa F</span>
            <span>Pessoa J</span>
        </div>
    );
}

export { NavAux, NavAuxP };
