import React, { useState, useRef, useEffect } from "react"
import NavBar from "../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import '../css/routes.css/municipio.css'

function Municipio () {

    // Values INPUTS
    const Ref1 = useRef();//Pais
    const Ref2 = useRef();//Municipio
    const Ref3 = useRef();//UF
    const Ref4 = useRef();//DDD
    const Ref5 = useRef();//IBGE
    const Ref6 = useRef();//Situação

    // ESTADOS DOS INPUTS
    const [PaisValue, setPaisValue] = useState('')
    const [MunicipioValue, setMunicipioValue] = useState('')
    const [UfValue, setUfValue] = useState('')
    const [DDDValue, setDDDValue] = useState('')
    const [IBGEvalu, setIBGEvalue] = useState('')
    const [SituacaoValue, setSituacaoValue] = useState(false)

    //ESTADOS DOS COMPONENTES
    const [FormVisivel, setFormVisivel] = useState (false)

    //FUNÇÕES

    function ADD () {
        setFormVisivel(true)
        if(FormVisivel===true){
            window.document.getElementById('FormAdd').style.display='flex'
            window.document.getElementById('SecTopBTN').style.display='none'           
        }
    }

    function CloseForm (event) {
        event.preventDefault()
        setFormVisivel(false)
        if(FormVisivel===false){
            window.document.getElementById('FormAdd').style.display='none'
            window.document.getElementById('SecTopBTN').style.display='flex'
        }
    }


    return(
        <div id="TelaMunicipio">
            <NavBar/>
            <div id="SecTop">
                <h1>Municipio</h1>
                <div id="SecTopBTN">
                    <button onClick={ADD}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={CloseForm}><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <form action="" method="post" id="FormAdd">
                <div id="FormCampos">
                    <fieldset>
                        <label className="LabelForm">Pais</label>
                        <input type="text" className="InputForm" id="InputPais" ref={Ref1} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">Municipio</label>
                        <input type="text" className="InputForm" id="InputMunicipio" ref={Ref2} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">UF</label>
                        <input type="text"  className="InputForm" id="InputUf" ref={Ref3} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">DDD</label>
                        <input type="number" className="InputForm" id="InputDDD" ref={Ref4} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">IBGE</label>
                        <input type="number" className="InputForm" id="InputIBGE" ref={Ref5} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">Situação</label>
                        <div id="DivSit">
                            <input type="checkbox" ref={Ref6} />
                            <p>Ativo</p>
                        </div>
                    </fieldset>
                </div>
                <div id="BtnFormAdd">
                    <button id="BtnConfirmAdd"><FontAwesomeIcon icon={faCheck} /></button>
                    <button id="BtnCloseAdd"><FontAwesomeIcon icon={faXmark}/></button>
                </div>
            </form>
        </div>
    )
}

export default Municipio