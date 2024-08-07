import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faBroom } from "@fortawesome/free-solid-svg-icons"
import NavBar from "../components/Nav"
import ModalPais from "../components/ModalPais"
import { AlertE } from "../components/Msg"
import MsgConfirm from "../components/confirm"
import { GetAll } from "../functions/GetAllPais"
import { FiltroGet } from "../functions/GetFiltro"

const stylo = {
    display: "none"
}

function PaisCrud() {
    // APIS
    const APIEndpoint = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/GRAVA'
    
    // Values INPUTS
    const Ref1 = useRef();//Pais
    const Ref2 = useRef();//Sigla
    const Ref3 = useRef();//Nacionalidade
    const Ref4 = useRef();//Bacen
    const Ref5 = useRef();//Situação (input)
    const Ref6 = useRef();//DDI
    const Ref7 = useRef();//Situação (options)

    // ESTADOS DOS INPUTS
    const [idValue, setidValue] = useState ('')
    const [PaisValue, setPaisValue] = useState('')
    const [SiglaValue, setSiglaValue] = useState('')
    const [NacionalidadeValue, setNacionalidadeValue] = useState('')
    const [BacenValue, setBacenValue] = useState('')
    const [DDIValue, setDDIValue] = useState('')
    const [SituacaoValue, setSituacaoValue] = useState(false)
    const [OpSitValue, setOpSitValue] = useState(null)

    //ESTADOS  PARA ARMAZENAR OS DADOS DOS PAÍSES
    const [paises, setPaises] = useState([])
    const [arrayPaises, setArrayPaises] = useState ([])
    const [arrayFiltro, setarrayFiltro] = useState ([])

    //OUTROS ESTADOS
    const [isVisivel, setisVisivel] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msgerro, setMsgerro] = useState (null)
    const [listaVisivel, setListaVisivel] = useState(true)
    const [modalAberto, setModalAberto] = useState(false)
    const [idSelecionado, setIdSelecionado] = useState(null)
    const [showFilterBtns, setShowFilterBtns] = useState(false)
    const [veriFiltro, setveriFiltro] = useState (false)
    const [confirmVisivel, setconfirmVisivel] = useState (false)
    const [arrayConfirm, setarrayConfirm] = useState ([])

    // EFFECTS
    useEffect (()=>{
        async function fetchData () {
            const data = await RenderGetAll()
            setPaises(data)
        }
        fetchData()
    },[])

    useEffect(() => {
        if (msgerro) {
            console.log(msgerro)
        }
    }, [msgerro]) //efect responsavel pela mensagem de erro

    useEffect(()=>{
        if (success) {
            setTimeout(() => {
                window.location.reload();
            }, 0)
        }
    }, [success]) //effect reponsavel por recarregar a página se dado salvo com sucesso

    useEffect(()=>{
        const input1 = window.document.getElementById("inputPais")
        const input2 = window.document.getElementById("InputSigla")
        const input3 = window.document.getElementById("inputNac")
        if(msgerro=="País inválido"){
            input1.style.border = "3px solid red"
            input2.style.border = "none"
            input3.style.border = "none"
        } else if (msgerro=="Sigla inválida"){
            input2.style.border = "3px solid red"
            input1.style.border = "none"
            input3.style.border = "none"
        } else if (msgerro=="Nacionalidade inválida"){
            input3.style.border = "3px solid red"
            input2.style.border = "none"
            input1.style.border = "none"
        } else if (msgerro=="Informação Já Cadastrada"){
            input1.style.border = "3px solid red"
            input2.style.border = "3px solid red"
            input3.style.border = "3px solid red"
        }
    }, [msgerro])// effect esponsavel por fazer os inputs vermelhos em caso de erro

    useEffect(() => {
        if (showFilterBtns===true) {
            window.document.getElementById('BTNS-Form-Pais-Filtro').style.display = 'flex';
            window.document.getElementById('BTNS-Form-Pais').style.display = 'none';
            window.document.getElementById('inputBacen').style.display = 'none'
            window.document.getElementById('labelBacen').style.display = 'none'
            window.document.getElementById('labelDDI').style.display = 'none'
            window.document.getElementById('inputDDI').style.display = 'none'
            window.document.getElementById('DivSit').style.display = 'none'
            window.document.getElementById('OpSituacao').style.display = 'flex'
            window.document.getElementById('labelSituacao').style.display = 'flex';
        } else {
            window.document.getElementById('BTNS-Form-Pais-Filtro').style.display = 'none';
            window.document.getElementById('BTNS-Form-Pais').style.display = 'flex';
            window.document.getElementById('inputBacen').style.display = 'flex'
            window.document.getElementById('labelBacen').style.display = 'flex'
            window.document.getElementById('labelDDI').style.display = 'flex'
            window.document.getElementById('inputDDI').style.display = 'flex'
            window.document.getElementById('DivSit').style.display = 'flex'
            window.document.getElementById('OpSituacao').style.display = 'none'
            window.document.getElementById('labelSituacao').style.display = 'flex';
            window.document.getElementById('InputSituação-Pais').style.display = 'flex';
        }
    }, [showFilterBtns]);

    // Funções

    //função relacionada a fechar a mensagem de erro

    function handleError () {
        setMsgerro(null)
    }

    //CONVERTER PARA MAIUSCULO NOS INPUTS
    const converterParaMaiusculo = (ref, setFunction) => {
        return function (e) {
            const novoValor = e.target.value.toUpperCase();
            setFunction(novoValor);
            if (ref.current) {
                ref.current.value = novoValor;
            }
        };
    };
    // FILTRO
    const toggleFilterBtns = () => {
        setShowFilterBtns(true)
    }
    function Filtro (){
        Ref1.current.value = ''
        Ref2.current.value = ''
        Ref3.current.value = ''
        Ref5.current.value = ''
        if (veriFiltro === true){
            Ref1.current.value = PaisValue
            Ref2.current.value = SiglaValue
            Ref3.current.value = NacionalidadeValue
            Ref5.current.checked = SituacaoValue
        }
        window.document.getElementById('Div-Form-Pais-Conteudo').style.display= 'none'
        window.document.getElementById('Form-Pais-ADD').style.display = 'flex'
        window.document.getElementById('divBTN-ADD').style.display = 'none'
        toggleFilterBtns()
    } //responsavel por mostrar o form de filtragem

    function FecharInterno (){
        window.document.getElementById('Div-Form-Pais-Conteudo').style.display= 'flex'
        window.document.getElementById('Form-Pais-ADD').style.display = 'none'
        window.document.getElementById('divBTN-ADD').style.display = 'flex'
        setShowFilterBtns(false)
    }

    async function Filtrar (){
        var data = {
            "id": 0,
            "pais": Ref1.current.value,
            "sigla": Ref2.current.value,
            "nacionalidade": Ref3.current.value,
            "bacen": parseInt(Ref4.current.value, 10),
            "situacao": Ref7.current.value,
            "ddi": Ref6.current.value
        }
        var req = await FiltroGet(data)
        var datajson = await req.json()
        setarrayFiltro(datajson)
        
        setPaisValue(Ref1.current.value);
        setSiglaValue(Ref2.current.value);
        setNacionalidadeValue(Ref3.current.value);
        setBacenValue(Ref4.current.value);
        setSituacaoValue(Ref7.current.value)
        setDDIValue(Ref6.current.value)

        setShowFilterBtns(true)
        setveriFiltro(true)


        window.document.getElementById('Div-Form-Pais-Conteudo').style.display= 'flex'
        window.document.getElementById('Form-Pais-ADD').style.display = 'none'
        window.document.getElementById('divBTN-ADD').style.display = 'flex'
        window.document.getElementById('table-pais1').style.display = 'none'
        window.document.getElementById('table-pais2').style.display = 'flex'
    } //faz a filtragem mesmo

    //LIMPAR FILTRO

    function Limpar () {

        window.location.reload()
    }

    //EDITAR
    async function EditPais (element) {
        setidValue(element.id)
        Ref1.current.value = element.pais
        Ref2.current.value = element.sigla
        Ref3.current.value = element.nacionalidade
        Ref4.current.value = element.bacen
        Ref5.current.value = element.situacao

        window.document.getElementById('Form-Pais-ADD').style.display = 'flex'
        window.document.getElementById('divBTN-ADD').style.display = 'none'
        window.document.getElementById('Div-Form-Pais-Conteudo').style.display= 'none'
        setShowFilterBtns(false)
    }
    
    //ADICIONAR
    const Add = ()=>{
        setisVisivel(true)
        if (isVisivel == true) {
            window.document.getElementById('Form-Pais-ADD').style.display = 'flex'
            window.document.getElementById('divBTN-ADD').style.display = 'none'
            window.document.getElementById('Div-Form-Pais-Conteudo').style.display= 'none'
            setShowFilterBtns(false)
            Ref1.current.value = ''
            Ref2.current.value = ''
            Ref3.current.value = ''
            Ref4.current.value = ''
            Ref5.current.value = ''
        }
    }
    //EXCLUIR
    const Exclui = async (element) => {

        setconfirmVisivel(true)
        setarrayConfirm(element)

    };
    
    function excluir (element){
        setPaises(prevPaises => prevPaises.filter(pais => pais.id !== element.id))
        setarrayFiltro(prevarrayFiltro => prevarrayFiltro.filter(pais => pais.id !== element.id))
    }

    //RENDERIZAR A LISTA
    async function RenderGetAll() {
        var dados = await GetAll();
        setArrayPaises(dados)
        return dados;
    }
    
    //SALVAR
    const Save = () => {
        const newData = {
            "id": 0,
            "pais": Ref1.current.value,
            "sigla": Ref2.current.value,
            "nacionalidade": Ref3.current.value,
            "bacen": Ref4.current.value,
            "situacao": Ref5.current.checked,
            "ddi": Ref6.current.value
        };

        const dataUpdate = {
            "id": idValue,
            "pais": Ref1.current.value,
            "sigla": Ref2.current.value,
            "nacionalidade": Ref3.current.value,
            "bacen": Ref4.current.value,
            "situacao": Ref5.current.checked,
            "ddi": Ref6.current.value
            
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
            .then(res =>{
                if (!res.ok) {
                    throw new Error('Erro na requisição');
                }
                return res.json()
            }).then(data => {
                if (data.msgerro !== ''){
                    setMsgerro(data.msgerro)
                }else{
                    setSuccess(true)
                }
            })
        }else {
            fetch(APIEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': BasicAuth
                },
                body: JSON.stringify(dataUpdate)
            }).then(res =>{
                if (!res.ok) {
                    throw new Error('Erro na requisição');
                }
                return res.json()
            }).then(data => {
                if (data.msgerro !== ''){
                    setMsgerro(data.msgerro)
                }else{
                    setSuccess(true)
                }
            })
               
        }

        setPaisValue(newData.pais);
        setSiglaValue(newData.sigla);
        setNacionalidadeValue(newData.nacionalidade);
        setBacenValue(newData.bacen);
        setSituacaoValue(newData.situacao)
        setDDIValue(newData.ddi)

    };
    //BTN FECHAR
    function fechar () {
        window.document.getElementById('Form-Pais-ADD').style.display="none"
        window.document.getElementById('divBTN-ADD').style.display="flex"
        window.document.getElementById('Div-Form-Pais-Conteudo').style.display= 'flex'
        const input1 = window.document.getElementById("inputPais")
        const input2 = window.document.getElementById("InputSigla")
        const input3 = window.document.getElementById("inputNac")
        input1.style.border = "none"
        input2.style.border = "none"
        input3.style.border = "none"
        Ref1.current.value = ''
        Ref2.current.value = ''
        Ref3.current.value = ''
        Ref4.current.value = ''
        Ref5.current.value = ''
    }
    //FUNÇÕES DO MODAL////////
    function abrirModal (id) {
        setIdSelecionado(id)
        setModalAberto(true)
    }
    function fecharModal () {
        setModalAberto(false)
    }

    function ArrayModal (arrayPaises) {
        
    }

    //FUNÇÕES DA CONFIRMAÇÃO AO EXCLUIR

    function fecharConfirm () {
        setconfirmVisivel(false)
    }

    function mensagemErro (element) {
        setMsgerro(element.msgerro)
    }

    return (
        <div id="direction-pais">
            <NavBar/>
            <AlertE error ={msgerro} handleError={handleError}/>
            <MsgConfirm estado ={confirmVisivel} estadoF ={fecharConfirm} element={arrayConfirm} error = {mensagemErro} excluir ={excluir}/>
            <div id="Tela-Pais">
                <h1 id="Titulo-Pais">Pais</h1>
                <div id="divBTN-ADD" >
                    <button onClick={Add}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={Filtro}><FontAwesomeIcon icon={faFilter} /></button>
                </div>
                <div id="Form-Pais-ADD">
                    <p><i>Selecionar Informações</i></p>
                    <div id="Form-Pais-ADD2">
                        <form action="" method="post" id="FormPais">
                            <fieldset className="Fieldset-Pais-Form">
                                <label htmlFor="">Pais</label>
                                <input type="text" ref={Ref1} className="InputsFormPais" id="inputPais" onChange={converterParaMaiusculo(Ref1,  setPaisValue)} maxLength="14" required/>
                            </fieldset>
                            <fieldset className="Fieldset-Pais-Form">
                                <label htmlFor="">Sigla</label>
                                <input type="text" ref={Ref2} id="InputSigla" className="InputsFormPais" onChange={converterParaMaiusculo(Ref2, setSiglaValue)} maxLength="3" required/>
                            </fieldset>
                            <fieldset className="Fieldset-Pais-Form">
                                <label htmlFor="">Nacionalidade</label>
                                <input type="text" ref={Ref3} className="InputsFormPais" id="inputNac" onChange={converterParaMaiusculo(Ref3, setNacionalidadeValue)} maxLength="20" required/>
                            </fieldset>
                            <fieldset className="Fieldset-Pais-Form">
                                <label htmlFor="" id="labelBacen">Bacen</label>
                                <input type="number" ref={Ref4} className="InputsFormPais" id="inputBacen" maxLength="10" />
                            </fieldset>
                            <fieldset className="Fieldset-Pais-Form">
                                <label htmlFor="" id="labelDDI">DDI</label>
                                <input type="number" ref={Ref6} className="InputsFormPais" id="inputDDI"/>
                            </fieldset>
                            <fieldset className="Fieldset-Pais-Form">
                                <label htmlFor="" id="labelSituacao">Situação</label>
                                <div id="DivSit">
                                    <input type="checkbox" ref={Ref5} className="InputsFormPais" id="InputSituação-Pais" required />
                                    <p>Ativo</p>
                                </div>
                                <select name="Situacao" id="OpSituacao" ref={Ref7} onChange={()=>{setOpSitValue(Ref7.current.value)}}>
                                    <option value="">Selecionar</option>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                                </select>
                            </fieldset>
                        </form>
                        <div id="BTNS-Form-Pais">
                            <button type="submit" onClick={Save}><FontAwesomeIcon icon={faCheck} /></button>
                            <button onClick={fechar}><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div id="BTNS-Form-Pais-Filtro">
                            <button type="submit" onClick={Filtrar}><FontAwesomeIcon icon={faFilter} /></button>
                            <button onClick={Limpar}><FontAwesomeIcon icon={faBroom} /></button>
                            <button onClick={FecharInterno}><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                    </div>
                </div>
                {modalAberto&&<ModalPais fecharModal={fecharModal} FuncaoModal={ArrayModal} dados={arrayPaises} idElement={idSelecionado}/>}
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
                            <div id="table-pais1">
                                {paises.map((pais, index) => (
                                    <ul key={pais.id} className={`Todo-List-ul ${pais.hidden ? 'hidden' : ''}`} style={{ display: listaVisivel ? "flex" : "none" }}>
                                        <li className="Todo-List-li id-tdList">{pais.id}</li>
                                        <li className="Todo-List-li pais-tdList">{pais.pais}</li>
                                        <li className="Todo-List-li sigla-tdList">{pais.sigla}</li>
                                        <li className="Todo-List-li Naci-tdlist">{pais.nacionalidade}</li>
                                        <li className="li-td-btn">
                                            <div className="BTNs-tdList">
                                                <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={() => abrirModal(pais.id)} />
                                                <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={()=>{EditPais(pais)}} />
                                                <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(pais)}} />
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                            <div id="table-pais2">
                                {arrayFiltro.map((pais, index) => (
                                    <ul
                                    key={pais.id}
                                    id="td-ul-filtro"
                                    className={`Todo-List-ul ${pais.hidden ? 'hidden' : ''} ${pais.situacao ? 'red-list' : ''}`}
                                    style={{ display: listaVisivel ? "flex" : "none" }}
                                    >
                                    <li className="Todo-List-li id-tdList">{pais.id}</li>
                                    <li className="Todo-List-li pais-tdList">{pais.pais}</li>
                                    <li className="Todo-List-li sigla-tdList">{pais.sigla}</li>
                                    <li className="Todo-List-li Naci-tdlist">{pais.nacionalidade}</li>
                                    <li className="li-td-btn">
                                        <div className="BTNs-tdList">
                                        <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={() => abrirModal(pais.id)} />
                                        <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={() => { EditPais(pais) }} />
                                        <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={() => { Exclui(pais) }} />
                                        </div>
                                    </li>
                                    </ul>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaisCrud;
