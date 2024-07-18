import React, { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"
import { faPlus, faDatabase, faPenToSquare, faUnlock } from "@fortawesome/free-solid-svg-icons"

import '../css/componentes.css/userNav.css'

function UserNav () {
    return(
        <div id="navUser">
            <div id="home" className="navItem"><FontAwesomeIcon icon={faHouseChimney} /></div>
            <div className="space"></div>
            <div id="add" className="navItem"><FontAwesomeIcon icon={faPlus} /></div>
            <div className="space"></div>
            <div id="data" className="navItem"><FontAwesomeIcon icon={faDatabase} /></div>
            <div className="space"></div>
            <div id="permi" className="navItem"><FontAwesomeIcon icon={faUnlock} /></div>
            <div className="space"></div>
            <div id="edit" className="navItem"><FontAwesomeIcon icon={faPenToSquare} /></div>
        </div>
    )
}

export default UserNav