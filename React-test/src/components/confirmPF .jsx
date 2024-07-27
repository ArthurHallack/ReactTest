import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { ApiDeletePF } from "../functions/pf/excluiPF";

import '../css/componentes.css/confirm.css'

function MsgConfirmPF ({ estado, element, estadoF, error, excluir }) {

    function close (){
        estadoF()
    }

    async function confirm (){
        const fetch = await ApiDeletePF(element.id)
        if(fetch.retorno===0){
            error(fetch)
        }else{
            excluir(element)
        }
        estadoF()
    }

    useEffect(()=>{
        if(estado===true){
            window.document.getElementById('Container-Confirm').style.display='flex'
        }else{
            window.document.getElementById('Container-Confirm').style.display='none'
        }
    },[estado])// responsavel por fazer esse componente aparecer e desaparecer

    return(
        <div id="Container-Confirm">
            <p>Deseja realmente excluir ?</p>
            <div id="Container-ConfirmBTNs">
                <button className="BTNs-ContainerConfirm" id="Btn-Confirm-True" onClick={confirm}><FontAwesomeIcon icon={faCheck} /></button>
                <button className="BTNs-ContainerConfirm" id="Btn-Confirm-false" onClick={close}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
        </div>
    )
}

export default MsgConfirmPF