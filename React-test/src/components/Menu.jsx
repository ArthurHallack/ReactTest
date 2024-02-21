import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


const StyleIcon = {
    width: '0.8rem',
    marginLeft: '8.3rem',
    cursor: 'pointer'
}

function Menu () {
    return(
        <div id="Menu">
            <div id="Container-H1Menu">
                <h1 id="H1Menu">Catavento<FontAwesomeIcon icon={faX} style={StyleIcon}/></h1>
            </div>
            <ul id="MenuList">
                <li className="LiMenu"><b>Pais</b></li>
                <li className="LiMenu"><b>Municipio</b></li>
                <li className="LiMenu"><b>Aeroporto</b></li>
                <li className="LiMenu"><b>exemplo1</b></li>
                <li className="LiMenu"><b>exemplo2</b></li>
            </ul>
        </div>
    )
}

export default Menu;