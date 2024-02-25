import React from "react";
import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"

function PaisCrud() {
    const APIGrava = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/GRAVA'
    const Dados = {
        "ID": 0,
        "Pais": "",
        "Sigla": "",
        "Nacionalidade": "",
        "Bacen": "",
        "DDI": "",
        "Situação": ""
    }
    //Values INPUTS//
    const Ref1 = useRef()
    const Ref2 = useRef()
    const Ref3 = useRef()
    const Ref4 = useRef()
    const Ref5 = useRef()
    const Ref6 = useRef()
    //ESTADOS DOS INPUTS//
    const [PaisValue , setPaisValue] = useState ('')
    const [SiglaValue , setSiglaValue] = useState('')
    const [NacionalidadeValue , setNacionalidadeValue] = useState('')
    const [BacenValue , setBacenValue] = useState('')
    const [DDIValue , setDDIValue] = useState('')
    const [SituacaoValue , setSituacaoValue] = useState(false)
    //Funções//
    const Save = () => {
        const newData = {
            "id":0,
            "Pais": Ref1.current.value,
            "Sigla": Ref2.current.value,
            "Nacionalidade": Ref3.current.value,
            "Bacen": Ref4.current.value,
            "DDI": Ref5.current.value,
            "Situação": Ref6.current.value
        }

        fetch(APIGrava, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(res=> {
            if(!res.ok){
                throw new Error('Erro ao enviar dados para a API');
            }
        }).catch(error=>{
            console.error('Erro:', error)
        })

            setPaisValue(newData.Pais)
            setSiglaValue(newData.Sigla)
            setNacionalidadeValue(newData.Nacionalidade)
            setBacenValue(newData.Bacen)
            setDDIValue(newData.DDI)
            setSituacaoValue(newData.Situação)
        }

    return (
        <div id="Tela-Pais">
            <h1 id="Titulo-Pais">Pais</h1>
            <div id="Form-Pais-ADD">
                <p><i>Selecionar Informações</i></p>
                <div id="Form-Pais-ADD2">
                    <form action="" method="post" id="FormPais">
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Pais</label>
                            <input type="text" ref={Ref1}/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Sigla</label>
                            <input type="text" ref={Ref2}/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Nacionalidade</label>
                            <input type="text" ref={Ref3}/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Bacen</label>
                            <input type="text" ref={Ref4}/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">DDI</label>
                            <input type="number" ref={Ref5}/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Situação</label>
                            <input type="checkbox" ref={Ref6}/> Ativo
                        </fieldset>
                    </form>
                    <button type="submit" onClick={Save}>Salvar</button>
                </div>
            </div>
            <div id="Div-Form-Pais-Conteudo">
                <div id="Conteudo-Pais-Container">
                    <div id="Pais-Hud">
                        <h1 className="H1-hud">ID</h1>
                        <h1 className="H1-hud">Sigla</h1>
                        <h1 className="H1-hud">Pais</h1>
                        <h1 className="H1-hud">Nacionalidade</h1>
                        <h1 className="H1-hud">Nacional</h1>
                    </div>
                    <div className="Td-List">
                        <p>1</p>
                        <p>br</p>
                        <p>brasil</p>
                        <p>nacionalidade</p>
                        <div className="BTN-Td-List">
                            <button><FontAwesomeIcon icon={faFolderOpen} /></button>
                            <button><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaisCrud;