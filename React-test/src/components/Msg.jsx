import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import '../css/componentes.css/Msg.css'

function AlertE ({ msgerro }) {
    const [fechar, setFechar] = useState ("")

    var close = ()=>{
        setFechar("escondido")
    }
    var msg = JSON.parse(msgerro)
    console.log(msg)

    return(
        <div className={`msg-container ${fechar}`}>
            <p className="msg"><FontAwesomeIcon icon={faCircleExclamation} id="icon" /></p>
            <FontAwesomeIcon icon={faXmark} onClick={close} className="xmark" />
        </div>
    )
}

function AlertS ({ success }) {
    return(
        <div>
            <p>{success}</p>
        </div>
    )
}

export default AlertE
