import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/Nav";
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
    const [idValue, setidValue] = useState ('')
    const [PaisValue, setPaisValue] = useState('');
    const [SiglaValue, setSiglaValue] = useState('');
    const [NacionalidadeValue, setNacionalidadeValue] = useState('');
    const [BacenValue, setBacenValue] = useState('');
    const [DDIValue, setDDIValue] = useState('');
    const [SituacaoValue, setSituacaoValue] = useState(false);

    //ESTADOS  PARA ARMAZENAR OS DADOS DOS PAÍSES
    const [paises, setPaises] = useState([]);

    //OUTROS ESTADOS
    const [isVisivel, setisVisivel] = useState(false)
    const [success, setSuccess] = useState(false)
    const [listaVisivel, setListaVisivel] = useState(true)

    // EFFECT
    useEffect (()=>{
        async function fetchData () {
            const data = await RenderGetAll()
            setPaises(data)
        }
        fetchData()
    },[])

    useEffect(() => {
        console.log(idValue);
    }, [idValue]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                window.location.reload();
            }, 0); // 1 segundo de espera antes de recarregar a página
        }
    }, [success]);

    // Funções
    const converterParaMaiusculo = (ref, setFunction) => {
        return function (e) {
            const novoValor = e.target.value.toUpperCase();
            setFunction(novoValor);
            if (ref.current) {
                ref.current.value = novoValor;
            }
        };
    };

    async function EditPais (element) {
        setidValue(element.id)
        Ref1.current.value = element.pais
        Ref2.current.value = element.sigla
        Ref3.current.value = element.nacionalidade
        Ref4.current.value = element.bacen
        Ref5.current.value = element.situacao

        window.document.getElementById('Form-Pais-ADD').style.display = 'flex'
        window.document.getElementById('divBTN-ADD').style.display = 'none'
    }

    const Add = ()=>{
        setisVisivel(true)
        if (isVisivel == true) {
            window.document.getElementById('Form-Pais-ADD').style.display = 'flex'
            window.document.getElementById('divBTN-ADD').style.display = 'none'
        }
    }

    const Exclui = async (element) => {
        await ApiDelete(element.id);
        setPaises(prevPaises => {
            return prevPaises.filter(pais => pais.id !== element.id);
        });
    };


    async function RenderGetAll() {
        var dados = await GetAll();
        return dados;
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

        const dataUpdate = {
            "id": idValue,
            "pais": Ref1.current.value,
            "sigla": Ref2.current.value,
            "nacionalidade": Ref3.current.value,
            "bacen": Ref4.current.value,
            "situacao": Ref5.current.value
            
        };

        const Username = 'INTEGRASIS';
        const PassWord = '32P@&sB@rr0S';
        const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

        if(idValue==''){
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
                    setSuccess(true)

                }).catch(error => {
                    console.error('Erro:', error);
                });
        }else {
            fetch(APIEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': BasicAuth
                },
                body: JSON.stringify(dataUpdate)
            })
                .then(res => {
                    console.log(res);
                    if (!res.ok) {
                        throw new Error('Erro ao enviar dados para a API');
                    }
                    setSuccess(true)
                }).catch(error => {
                    console.error('Erro:', error);
                });
        }

        setPaisValue(newData.pais);
        setSiglaValue(newData.sigla);
        setNacionalidadeValue(newData.nacionalidade);
        setBacenValue(newData.bacen);
        setSituacaoValue(newData.situacao)

        window.document.getElementById('Form-Pais-ADD').style.display="none"
        window.document.getElementById('divBTN-ADD').style.display="flex"
    };

    function fechar () {
        window.document.getElementById('Form-Pais-ADD').style.display="none"
        window.document.getElementById('divBTN-ADD').style.display="flex"
        Ref1.current.value = ''
        Ref2.current.value = ''
        Ref3.current.value = ''
        Ref4.current.value = ''
        Ref5.current.value = ''
    }

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
                    <div id="BTNS-Form-Pais">
                        <button type="submit" onClick={Save}>Salvar</button>
                        <button onClick={fechar}><FontAwesomeIcon icon={faXmark}/>Fechar</button>
                    </div>

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
                        {paises.map((pais, index) => (
                            <ul key={index} className={`Todo-List-ul ${pais.hidden ? 'hidden' : ''}`} style={{ display: listaVisivel ? "flex" : "none" }}>
                                <li className="Todo-List-li id-tdList">{pais.id}</li>
                                <li className="Todo-List-li pais-tdList">{pais.pais}</li>
                                <li className="Todo-List-li sigla-tdList">{pais.sigla}</li>
                                <li className="Todo-List-li Naci-tdlist">{pais.nacionalidade}</li>
                                <li className="li-td-btn">
                                    <div className="BTNs-tdList">
                                        <button className="BTN-ReadPais BTNtd-Pais"><FontAwesomeIcon icon={faFolderOpen}/></button>
                                        <button className="BTN-EditPais BTNtd-Pais" onClick={()=>{EditPais(pais)}}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        <button className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(pais)}}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaisCrud;
