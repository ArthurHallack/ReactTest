import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import '../css/componentes.css/confirm.css'

function MsgConfirm ({ Estado, }) {
    function close (){
        if(Estado===true){

        }
    }
    function confirm (){

    }
    useEffect(()=>{

    })
    return(
        <div id="Container-Confirm">
            <p>Deseja Realmente excluir ?</p>
            <div id="Container-ConfirmBTNs">
                <button className="BTNs-ContainerConfirm" id="Btn-Confirm-True"><FontAwesomeIcon icon={faCheck} /></button>
                <button className="BTNs-ContainerConfirm" id="Btn-Confirm-false" onClick={close}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
        </div>
    )
}

export default MsgConfirm