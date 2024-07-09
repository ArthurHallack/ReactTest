import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import '../css/componentes.css/Msg.css'

function AlertE({ error, handleError }) {
    const [visivel, setVisivel] = useState(false); // Inicializa visivel como false

    useEffect(() => {
        if (error) {
            console.log(error);
            setVisivel(true); // Mostra o alerta se houver erro
        } else {
            setVisivel(false); // Esconde o alerta se não houver erro
        }
    }, [error]); // Executa o useEffect sempre que error mudar

    const close = () => {
        setVisivel(false); // Define visivel como false ao clicar no botão
        handleError()
    };

    return (
        <div className={`msg-container ${visivel ? '' : 'escondido'}`}>
            <p className="msg"><FontAwesomeIcon icon={faCircleExclamation} id="icon" />{error}</p>
            <FontAwesomeIcon icon={faXmark} onClick={close} className="xmark" />
        </div>
    );
}

function AlertS ({ success, handleSuccess }) {

    const [visivel, setVisivel] = useState(false); // Inicializa visivel como false

    useEffect(() => {
        if (success) {
            console.log(success);
            setVisivel(true); // Mostra o alerta se houver sucesso
        } else {
            setVisivel(false); // Esconde o alerta se não houver sucesso
        }
    }, [success]); // Executa o useEffect sempre que sucesso mudar

    const close = () => {
        setVisivel(false); // Define visivel como false ao clicar no botão
        handleSuccess()
    };

    return(
        <div className={`msg-containerS ${visivel ? '' : 'escondido'}`}>
            <p className="msg">Realizado Com Sucesso</p>
            <FontAwesomeIcon icon={faXmark} onClick={close} className="xmark" />
        </div>
    )
}

export { AlertE, AlertS }