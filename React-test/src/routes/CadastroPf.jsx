import React, { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faBroom, faPlus, faCheck, faTrash, faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import NavBar from "../components/Nav"
import { AlertS, AlertE } from "../components/Msg";

import '../css/routes.css/PFCadastro.css'

function PFCadastro () {
    return(
        <div id="Tela-PFCadaastro">
            <NavBar/>
            <AlertE/>
            <AlertS/>
            <div id="SecTop-PF">
                <h1>Pessoa Fisica</h1>
                <div>
                    <button><FontAwesomeIcon icon={faPlus} /></button>
                    <button><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <form>

            </form>
            <form>
                <p><i>Selecionar Informações</i></p>
                <div>
                    <fieldset>
                        <label>Nome Completo</label>
                        <input type="text" />
                    </fieldset>
                    <fieldset>
                        <label>Cpf</label>
                        <input type="text" />
                    </fieldset>
                    <fieldset>
                        <label>Gênero</label>
                        <input type="text" />
                    </fieldset>
                    <fieldset>
                        <label>Situação</label>
                        <input type="text" />
                    </fieldset>
                    <fieldset>
                        <label>Atualização Maior que</label>
                        <input type="text" />
                    </fieldset>
                    <fieldset>
                        <label>Atualização Menor que</label>
                        <input type="text" />
                    </fieldset>
                </div>
            </form>
        </div>
    )
}

export default PFCadastro