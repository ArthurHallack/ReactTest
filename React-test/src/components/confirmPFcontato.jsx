import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiDeleteContatoPF } from '../functions/pf/excluiContato';
import '../css/componentes.css/confirm.css';

function MsgConfirmPFcontato({ estado, element, estadoF, error, excluir }) {

    function close() {
        estadoF();
    }

    async function confirm() {
        const fetch = await ApiDeleteContatoPF(element.id);
        if (fetch.retorno === 0) {
            error(fetch);
        } else {
            excluir(element);
        }
        estadoF();
    }

    if (!estado) {
        // Não renderiza o componente se estado for false
        return null;
    }

    return (
        <div id="Container-Confirm">
            <p>Deseja realmente excluir?</p>
            <div id="Container-ConfirmBTNs">
                <button className="BTNs-ContainerConfirm" id="Btn-Confirm-True" onClick={confirm}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="BTNs-ContainerConfirm" id="Btn-Confirm-false" onClick={close}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
}

export default MsgConfirmPFcontato;
