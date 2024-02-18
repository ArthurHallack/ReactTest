import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/fontawesome-svg-core'

function Menu () {
    return(
        <div id="Menu">
            <div id="Container-H1Menu">
                <h1 id="H1Menu">Catavento<FontAwesomeIcon icon="fa-solid fa-xmark" /></h1>
            </div>
            <ul id="MenuList">
                <li><b>Pais</b></li>
                <li><b>Municipio</b></li>
                <li><b>Aeroporto</b></li>
                <li><b>exemplo1</b></li>
                <li><b>exemplo2</b></li>
            </ul>
        </div>
    )
}

export default Menu