import React, { useState, useRef, useEffect } from "react"
import NavBar from "../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { UfList } from "../functions/municipio/UfMunicipio";
import { PaisPesquisa } from "../functions/municipio/PaisPesquisa";

import '../css/routes.css/municipio.css'

function Municipio () {
    // Values INPUTS
    const Refe1 = useRef();//Pais
    const Refe2 = useRef();//Municipio
    const Refe3 = useRef();//UF
    const Refe4 = useRef();//DDD
    const Refe5 = useRef();//IBGE
    const Refe6 = useRef();//Situação


    // ESTADOS DOS INPUTS
    const [PaisValue, setPaisValue] = useState('')
    const [MunicipioValue, setMunicipioValue] = useState('')
    const [UfValue, setUfValue] = useState('')
    const [DDDValue, setDDDValue] = useState('')
    const [IBGEvalu, setIBGEvalue] = useState('')
    const [SituacaoValue, setSituacaoValue] = useState(false)

    //ESTADOS DOS COMPONENTES
    const [FormVisivel, setFormVisivel] = useState (false)

    //OUTROS ESTADOS 
    const [ArrayPaises, setArrayPaises] = useState ([])
    const [ResList, setResList] = useState ('')
    const [ArrayUf, setArrayUf] = useState ([])

    //EFFECTS 
     useEffect(()=>{
        const listap = window.document.getElementById('DivListPais')
        if (Array.isArray(ArrayPaises) && ArrayPaises.length > 0) {
            if (ArrayPaises[0].id === 0) {
                listap.style.display='none'
            } else {
                listap.style.display='flex'
            }
        } else if (ArrayPaises === undefined) {
            console.log('ArrayPaises não está definido');
        } else {
            console.log('ArrayPaises está vazio');
        }

     },[ArrayPaises])//lista de paises do input

     useEffect(()=>{
        async function fetchData (){
            const data = await UfList()
            setArrayUf(data)
        }
        fetchData()
     },[])// trás a lista uf da api 

     useEffect(()=>{
        
     },[UfValue])

    //FUNÇÕES

     function ConvertMaiusculo (ref) {
        if(ref.current){
            ref.current.value = ref.current.value.toUpperCase()
        }
     }

    //ADD
    function ADD () {
        setFormVisivel(true)
        if(FormVisivel===true){
            window.document.getElementById('FormAdd').style.display='flex'
            window.document.getElementById('SecTopBTN').style.display='none'           
            window.document.getElementById('Table-Municipio').style.display='none'           
        }
    }

    function CloseForm (event) {
        event.preventDefault()
        setFormVisivel(false)
        window.document.getElementById('FormAdd').style.display='none'
        window.document.getElementById('SecTopBTN').style.display='flex'
        window.document.getElementById('Table-Municipio').style.display='flex'

            Refe1.current.value = ''
            Refe2.current.value = ''
            Refe3.current.value = ''
            Refe4.current.value = ''
            Refe5.current.value = ''
        
    }

    //SAVE
    function Salvar (event) {
        event.preventDefault()
        var dataNew = {
            "id": 0,
            "pais": Refe1.current.value,
            "municipio": Refe2.current.value,
            "uf": Refe3.current.value,
            "ddd": Refe4.current.value,
            "ibge": Refe5.current.value,
            "situacao": Refe6.current.checked
        }

    }

    //PAIS PESQUISA 
    async function ListPais () {
        var valorInput = Refe1.current.value
        if(valorInput.length >= 3){
            var Data = valorInput
            var Dados = await PaisPesquisa(Data)
            setArrayPaises(Dados)
        } else if (valorInput <= 2) {
            window.document.getElementById('DivListPais').style.display='none'
        }
    }

    function clickPais (descricao) {
        Refe1.current.value = descricao
        window.document.getElementById('DivListPais').style.display='none'
    }

    //UF 

    function changeUf () {
        var valor = Refe3.current.value
        setUfValue(valor)
    }
    
    return(
        <div id="TelaMunicipio">
            <NavBar/>
            <div id="SecTop">
                <h1>Municipio</h1>
                <div id="SecTopBTN">
                    <button onClick={ADD}><FontAwesomeIcon icon={faPlus} /></button>
                    <button><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <form action="" method="post" id="FormAdd">
                <div id="FormCampos">
                    <fieldset>
                        <label className="LabelForm">Pais</label>
                        <input type="text" className="InputForm" id="InputPais" ref={Refe1} onChange={()=>{
                            ListPais()
                            ConvertMaiusculo(Refe1)
                        }} />
                        <div className="DivList" id="DivListPais">
                            <ul id="ListPais" className="ListOps">
                                {ArrayPaises.map((val,key)=>{
                                    return(
                                        <li className="ListItem" key={key} onClick={() => clickPais(val.descricao)} >{val.descricao}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">Municipio</label>
                        <input type="text" className="InputForm" id="InputMunicipio" ref={Refe2} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">UF</label>
                        <input type="text"  className="InputForm" id="InputUf" ref={Refe3} onChange={changeUf}/>
                        <div id="DivListUf">
                            <ul id="ListaUF">
                                {ArrayUf.map((val, key)=>{
                                    return(
                                        <li className="ListItemUf" key={key}>{val.descricao}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">DDD</label>
                        <input type="number" className="InputForm" id="InputDDD" ref={Refe4} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">IBGE</label>
                        <input type="number" className="InputForm" id="InputIBGE" ref={Refe5} />
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">Situação</label>
                        <div id="DivSit">
                            <input type="checkbox" ref={Refe6} />
                            <p>Ativo</p>
                        </div>
                        <div id="DivSitF">
                            <select name="Situacao" id="OpSituacao">
                                    <option value="">Selecionar</option>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                            </select>
                        </div>
                    </fieldset>
                </div>
                <div id="BtnFormAdd">
                    <button id="BtnConfirmAdd" onClick={Salvar}><FontAwesomeIcon icon={faCheck} /></button>
                    <button id="BtnCloseAdd" onClick={CloseForm}><FontAwesomeIcon icon={faXmark}/></button>
                </div>
                <div id="BtnFormFilter">
                    <button id="BtnConfirmFilter"><FontAwesomeIcon icon={faCheck} /></button>
                    <button id="BtnCloseAdd" onClick={CloseForm}><FontAwesomeIcon icon={faXmark}/></button>
                </div>
            </form>
            <div id="Table-Municipio">
                <div id="HudMunicipio">
                    <ul>
                        <li id="HudIdM">ID</li>
                        <li id="HudPaisM">Pais</li>
                        <li id="HudMunicipioM">Municipio</li>
                    </ul>
                </div>
            </div>
            <div id="Table-Municipio2">

            </div>
        </div>
    )
}

export default Municipio