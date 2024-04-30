import React from "react";
import NavBar from "../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import '../css/routes.css/municipio.css'

function Municipio () {
    return(
        <div id="TelaMunicipio">
            <NavBar/>
            <div id="SecTop">
                <h1>Municipio</h1>
                <div id="SecTopBTN">
                    <button><FontAwesomeIcon icon={faPlus} /></button>
                    <button><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <form action="" method="post" id="FormAdd">
                <fieldset>
                    <label htmlFor="" className="LabelForm">Pais</label>
                    <input type="text" required className="InputForm"/>
                </fieldset>
                <fieldset>
                    <label className="LabelForm">Municipio</label>
                    <input type="text" className="InputForm" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="" className="LabelForm">UF</label>
                    <input type="text"  className="InputForm" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="" className="LabelForm">DDD</label>
                    <input type="number" className="InputForm" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="" className="LabelForm">IBGE</label>
                    <input type="number" className="InputForm" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="" className="LabelForm">Situação</label>
                    <div id="DivSit">
                        <input type="checkbox" required />
                        <p>Ativo</p>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Municipio