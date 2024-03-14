import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function ModalPais ({fecharModal}) {
    const [modalAberto, setModalAberto] = useState(true)

    const CloseModal = () => {
        fecharModal()
    }
    const toggleModal = () => {
        setModalAberto(!modalAberto);
    }
    return(
        <div className="ModalPais"  style={{ display: modalAberto ? "block" : "none" }}>
           <div className="ModalTop">
                <span>
                    <p>consulta</p>
                    <h1>Pais</h1>
                </span>
                <FontAwesomeIcon icon={faXmark} onClick={CloseModal}/>
           </div>
        </div>
    )
}

export default ModalPais