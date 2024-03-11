import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/Nav";
import { GetPais } from "../functions/ReadPais";
import { GetAll } from "../functions/GetAllPais";
import { ApiDelete } from "../functions/DeletePais";

const stylo = {
    display: "none"
}

function PaisCrud() {
    // APIS
    const APIEndpoint = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/GRAVA';
    
    // Values INPUTS
    const Ref1 = useRef();
    const Ref2 = useRef();
    const Ref3 = useRef();
    const Ref4 = useRef();
    const Ref5 = useRef();

    // ESTADOS DOS INPUTS
    const [PaisValue, setPaisValue] = useState('');
    const [SiglaValue, setSiglaValue] = useState('');
    const [NacionalidadeValue, setNacionalidadeValue] = useState('');
    const [BacenValue, setBacenValue] = useState('');
    const [DDIValue, setDDIValue] = useState('');
    const [SituacaoValue, setSituacaoValue] = useState(false);

    //ESTADOS  RENDERGETALL
    const [elementosUl, setelementosUl] = useState ([])

    //OUTROS ESTADOS
    const [isVisivel, setisVisivel] = useState(false)

    // EFFECT
    useEffect (()=>{
        async function fetchData () {
            const data = await RenderGetAll()
            setelementosUl(data)
        }
        fetchData()
    },[])

    
    // Funções

    const Add = ()=>{
        setisVisivel(true)
        if (isVisivel == true) {
            window.document.getElementById('Form-Pais-ADD').style.display = 'flex'
            window.document.getElementById('divBTN-ADD').style.display = 'none'
        }
    }

    const Exclui = (id)=>{
        ApiDelete(id)
    }

    const converterParaMaiusculo = (ref, setFunction) => {
        return function (e) {
            const novoValor = e.target.value.toUpperCase();
            setFunction(novoValor);
            if (ref.current) {
                ref.current.value = novoValor;
            }
        };
    };

    async function RenderGetAll() {
        var dados = await GetAll();
        return dados.map((element, index) => (
            <ul key={index} className="Todo-List-ul">
                <li className="Todo-List-li id-tdList">{element.id}</li>
                <li className="Todo-List-li pais-tdList">{element.pais}</li>
                <li className="Todo-List-li sigla-tdList">{element.sigla}</li>
                <li className="Todo-List-li Naci-tdlist">{element.nacionalidade}</li>
                <li className="li-td-btn">
                    <div className="BTNs-tdList">
                        <button className="BTN-ReadPais BTNtd-Pais"><FontAwesomeIcon icon={faFolderOpen}/></button>
                        <button className="BTN-EditPais BTNtd-Pais"><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(element.id)}}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </li>
            </ul>
        ));
    }
    

    const Save = () => {
        const newData = {
            "id": 0,
            "pais": Ref1.current.value,
            "sigla": Ref2.current.value,
            "nacionalidade": Ref3.current.value,
            "bacen": Ref4.current.value,
            "situacao": Ref5.current.value
        };

        const Username = 'INTEGRASIS';
        const PassWord = '32P@&sB@rr0S';
        const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

        fetch(APIEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BasicAuth
            },
            body: JSON.stringify(newData)
        })
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    throw new Error('Erro ao enviar dados para a API');
                }
            }).catch(error => {
                console.error('Erro:', error);
            });

        setPaisValue(newData.pais);
        setSiglaValue(newData.sigla);
        setNacionalidadeValue(newData.nacionalidade);
        setBacenValue(newData.bacen);
        setSituacaoValue(newData.situacao)

        window.document.getElementById('Form-Pais-ADD').style.display="none"
        window.document.getElementById('divBTN-ADD').style.display="flex"
    };

    return (
        <div id="Tela-Pais">
            <NavBar/>
            <h1 id="Titulo-Pais">Pais</h1>
            <div id="divBTN-ADD" >
                <button onClick={Add}>ADD</button>
            </div>
            <div id="Form-Pais-ADD">
                <p><i>Selecionar Informações</i></p>
                <div id="Form-Pais-ADD2">
                    <form action="" method="post" id="FormPais">
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Pais</label>
                            <input type="text" ref={Ref1} className="InputsFormPais" onChange={converterParaMaiusculo(Ref1,  setPaisValue)} maxLength="12" required/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Sigla</label>
                            <input type="text" ref={Ref2} id="InputSigla" className="InputsFormPais" onChange={converterParaMaiusculo(Ref2, setSiglaValue)} maxLength="3" required/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Nacionalidade</label>
                            <input type="text" ref={Ref3} className="InputsFormPais" onChange={converterParaMaiusculo(Ref3, setNacionalidadeValue)} maxLength="20" required/>
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Bacen</label>
                            <input type="number" ref={Ref4} className="InputsFormPais" maxLength="10" />
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Situação</label>
                            <input type="checkbox" ref={Ref5} className="InputsFormPais" id="InputSituação-Pais" required/>
                        </fieldset>
                    </form>
                    <button type="submit" onClick={Save}>Salvar</button>
                </div>
            </div>
            <div id="Div-Form-Pais-Conteudo">
                <div id="HudPais">
                    <ul id="HudPais-Ul">
                        <li id="HudId" className="TD-Hud">ID</li>
                        <li id="Hud-Pais" className="TD-Hud">Pais</li>
                        <li id="HudSigla" className="TD-Hud">Sigla</li>
                        <li id="HudNacionalidade" className="TD-Hud">Nacionalidade</li>
                    </ul>
                </div>
                <div id="Conteudo-Pais-Container">
                    <div id="Table-Pais">
                        <ul className="Todo-List-ul">
                            <li className="Todo-List-li id-tdList"></li>
                            <li className="Todo-List-li pais-tdList"></li>
                            <li className="Todo-List-li sigla-tdList"></li>
                            <li className="Todo-List-li Naci-tdlist"></li>
                            <li className="li-td-btn">
                                <div className="BTNs-tdList" style={stylo}>
                                    <button className="BTN-ReadPais BTNtd-Pais"><FontAwesomeIcon icon={faFolderOpen}/></button>
                                    <button className="BTN-EditPais BTNtd-Pais"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button className="BTN-ExcluiPais BTNtd-Pais"><FontAwesomeIcon icon={faTrash} /></button>
                                 </div>
                            </li>
                        </ul>
                        <div>
                            {elementosUl}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaisCrud;