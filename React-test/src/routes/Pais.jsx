import React from "react";
import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"

function PaisCrud() {

    //APIS//
    const [idEndPoint, setidEndPoint] = useState ('1')
    const APIEndpoint = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/GRAVA'
    const ApiGetPais = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/FICHA/${idEndPoint}`
    //Fetch//
    
    //Values INPUTS//
    const Ref1 = useRef()
    const Ref2 = useRef()
    const Ref3 = useRef()
    const Ref4 = useRef()
    //ESTADOS DOS INPUTS//
    const [inputValue, setInputValue] = useState('');
    const [PaisValue , setPaisValue] = useState ('')
    const [SiglaValue , setSiglaValue] = useState('')
    const [NacionalidadeValue , setNacionalidadeValue] = useState('')
    const [BacenValue , setBacenValue] = useState('')
    const [DDIValue , setDDIValue] = useState('')
    const [SituacaoValue , setSituacaoValue] = useState(false)
    //Funções//
    const converterParaMaiusculo = (ref)=>{
        return function (e) {
            const novoValor = e.target.value.toUpperCase()
            setInputValue(novoValor)
            if (ref.current){
                ref.current.value = novoValor
            }
        }
    }
    
    async function TestGet () {
        const Username = 'INTEGRASIS';
        const PassWord = '32P@&sB@rr0S';
        const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord)

        try {
            const dados = await fetch(ApiGetPais, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': BasicAuth
                },
            })
    
            if (!dados.ok) {
                throw new Error('Erro ao enviar dados para a API');
            }
    
            const dadosJson = await dados.json();
            console.log(dadosJson);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const Save = () => {
        const newData = {
            "id":0,
            "pais": Ref1.current.value,
            "sigla": Ref2.current.value,
            "nacionalidade": Ref3.current.value,
            "bacen": Ref4.current.value
        }
        
        const Username = 'INTEGRASIS';
        const PassWord = '32P@&sB@rr0S';
        const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord)

        fetch(APIEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BasicAuth
            },
            body: JSON.stringify(newData)
        })
        .then(res=> {
            console.log(res)
            if(!res.ok){
                throw new Error('Erro ao enviar dados para a API');
            }
        }).catch(error=>{
            console.error('Erro:', error)
        })

            setPaisValue(newData.pais)
            setSiglaValue(newData.sigla)
            setNacionalidadeValue(newData.nacionalidade)
            setBacenValue(newData.bacen)
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
                            <input type="text" ref={Ref1} className="InputsFormPais" onChange={converterParaMaiusculo(Ref1)} maxlength="12"/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Sigla</label>
                            <input type="text" ref={Ref2} id="InputSigla" className="InputsFormPais" onChange={converterParaMaiusculo(Ref2)} maxlength="3"/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Nacionalidade</label>
                            <input type="text" ref={Ref3} className="InputsFormPais" onChange={converterParaMaiusculo(Ref3)} maxlength="20"/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Bacen</label>
                            <input type="text" ref={Ref4} className="InputsFormPais" onChange={converterParaMaiusculo(Ref4)} maxlength="10"/>
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
                        <h1 className="H1-hud" id="AjustePais">Nacionalidade</h1>
                    </div>
                    <div className="Td-List">
                        <p className="td-list-conteudo" id="Id-TD">1</p>
                        <p className="td-list-conteudo">br</p>
                        <p className="td-list-conteudo">brasil</p>
                        <p className="td-list-conteudo">nacionalidade</p>
                        <div className="BTN-Td-List">
                            <button className="BTNs-TD"><FontAwesomeIcon icon={faFolderOpen} onClick={TestGet}/></button>
                            <button className="BTNs-TD"><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className="BTNs-TD"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaisCrud;