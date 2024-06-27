import React, { useState, useRef, useEffect } from "react"
import NavBar from "../components/Nav";
import ModalMunicipio from "../components/ModalMunicipio";
import AlertE from "../components/Msg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faBroom } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faTrash, faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { UfList } from "../functions/municipio/UfMunicipio";
import { PaisPesquisa } from "../functions/municipio/PaisPesquisa";
import { PaisPesquisa2 } from "../functions/municipio/PaisPesquisa";
import { SalvarMunicipio } from "../functions/municipio/SaveMunicipio";
import { GetAllMunicipio } from "../functions/municipio/GetAllMunicipio";
import { ApiDeleteMunicipio } from "../functions/municipio/DeleteMunicipio";
import { FiltroGetMunicipio } from "../functions/municipio/GetFiltroMunicipio";

import '../css/routes.css/municipio.css'

function Municipio () {
    // Values INPUTS
    const Refe1 = useRef();//Pais
    const Refe2 = useRef();//Municipio
    const Refe3 = useRef();//UF
    const Refe4 = useRef();//DDD
    const Refe5 = useRef();//IBGE
    const Refe6 = useRef();//Situação
    const Refe7 = useRef();//Situação (options)

    // ESTADOS DOS INPUTS
    const [idValue, setidValue] = useState ('')
    const [PaisValue, setPaisValue] = useState('')
    const [PaisIdValue, setPaisIdValue] = useState('')
    const [MunicipioValue, setMunicipioValue] = useState('')
    const [UfValue, setUfValue] = useState({ id: 0, descricao: '' })
    const [DDDValue, setDDDValue] = useState('')
    const [IBGEvalu, setIBGEvalue] = useState('')
    const [SituacaoValue, setSituacaoValue] = useState(null)//option

    // ESTADOS DOS INPUTS DURANTE O FILTRO
    const [paisvalueFiltro, setpaisvalueFiltro] = useState ('')
    const [municipioFiltro, setmunicipioFiltro] = useState ('')
    const [ufValueFiltro, setufValueFiltro] = useState ('')
    const [sitValueFiltro, setsitValueFiltro] = useState ('')
    const [veriFiltro, setveriFiltro] = useState (false)

    //ESTADOS DOS COMPONENTES
    const [FormVisivel, setFormVisivel] = useState (false)
    const [BTNSfiltro, setBTNSfiltro]= useState (false)
    const [TrocarTabelas, setTrocarTabelas]= useState (false)

    //OUTROS ESTADOS 
    const [ArrayPaises, setArrayPaises] = useState ([])
    const [ArrayPaises2, setArrayPaises2] = useState ([])
    const [arrayPaisesList, setArrayPaisesList] = useState ([])
    const [arrayFiltro, setarrayFiltro] = useState ([])
    const [paises, setPaises] = useState([])
    const [ResList, setResList] = useState ('')
    const [ArrayUf, setArrayUf] = useState ([])
    const [inputValue, setInputValue] = useState('')
    const [success, setSuccess] = useState(false)
    const [msgerro, setMsgerro] = useState (null)
    const [modalAberto, setModalAberto] = useState(false)
    const [idSelecionado, setIdSelecionado] = useState(null)
    const [listaVisivel, setListaVisivel] = useState(true)

    //EFFECTS 
     useEffect(()=>{
        const listap = window.document.getElementById('DivListPais')
        if (Array.isArray(ArrayPaises) && ArrayPaises.length > 0) {
            if (ArrayPaises[0].id === 0) {
                listap.style.display='none'
            } else {
                listap.style.display='flex'
            }
        }

     },[ArrayPaises])//lista de paises do input

     useEffect(()=>{
        async function fetchData (){
            const data = await UfList()
            const data2 = await PaisPesquisa2()
            setArrayUf(data)
            setArrayPaises2(data2)
        }
        fetchData()
     },[])// trás a lista uf da api 

     useEffect(()=>{
        var valor = Refe3.current.value
        var fond = ArrayUf.find(item => item.descricao === valor)
        const divListUf = document.getElementById('DivListUf')

        if (fond){
            setUfValue(fond)
        }else{
            setUfValue({ id: 0, descricao: '' })
        }
     },[inputValue, Refe3])// Gera a segunda lista UF

     useEffect(()=>{
        if (success) {
            setTimeout(() => {
                window.location.reload();
            }, 0)
        }
    }, [success]) //effect reponsavel por recarregar a página se dado salvo com sucesso

    useEffect (()=>{
        async function fetchData () {
            const data = await RenderGetAll()
            setPaises(data)
        }
        fetchData()
    },[]) //Responsavel pela Lista a ser renderizada

    useEffect (()=>{
        if(BTNSfiltro===true){
            window.document.getElementById('BtnFormFilter').style.display='flex'
            window.document.getElementById('DivSitF').style.display='flex'
            window.document.getElementById('BtnFormAdd').style.display='none'
        }else{
            window.document.getElementById('BtnFormFilter').style.display='none'
            window.document.getElementById('DivSitF').style.display='none'
            window.document.getElementById('BtnFormAdd').style.display='flex'
        }
    },[BTNSfiltro])//TROCA OS BOTÕES DENTRO DO FORMULARIO

    useEffect (()=>{
        if(TrocarTabelas===true){
            window.document.getElementById('table-pais2').style.display='flex'
            window.document.getElementById('table-pais1').style.display='none'
        }else{
            window.document.getElementById('table-pais2').style.display='none'
            window.document.getElementById('table-pais1').style.display='flex'
        }
    },[TrocarTabelas])//TROCA OS FORMULARIOS

    useEffect(()=>{
        const input1 = window.document.getElementById("InputPais")
        const input2 = window.document.getElementById("InputMunicipio")
        if(msgerro=="País inválido"){
            input1.style.border = "3px solid red"
            input2.style.border = "none"
        } else if (msgerro=="Município inválido"){
            input2.style.border = "3px solid red"
            input1.style.border = "none"
        }
    },[msgerro])

    //FUNÇÕES

     function ConvertMaiusculo (ref) {
        if(ref.current){
            ref.current.value = ref.current.value.toUpperCase()
        }
     }

     function fecharListaUf () {
        const divListUf = document.getElementById('DivListUf')
        divListUf.style.display='none'
     }

     function fecharListaPais () {
        window.document.getElementById('DivListPais').style.display='none'
     }
     function fecharListas () {
        window.document.getElementById('DivListPais').style.display='none'
        const divListUf = document.getElementById('DivListUf')
        divListUf.style.display='none'
     }

     //função relacionada a fechar a mensagem de erro

    function handleError () {
        setMsgerro(null)
    }

     //RENDERIZAR A LISTA
    async function RenderGetAll() {
        var dados = await GetAllMunicipio();
        setArrayPaisesList(dados)
        return dados;
    }

    //ADD
    function ADD () {
            Refe1.current.value = ''
            Refe2.current.value = ''
            Refe3.current.value = ''
            Refe4.current.value = ''
            Refe5.current.value = ''
            Refe6.current.checked = false
        setFormVisivel(true)
        setBTNSfiltro(false)
        if(FormVisivel===true){
            window.document.getElementById('FormAdd').style.display='flex'
            window.document.getElementById('DivSit').style.display='flex'
            window.document.getElementById('labelDDD').style.display='flex'
            window.document.getElementById('InputDDD').style.display='flex'
            window.document.getElementById('labelIBGE').style.display='flex'
            window.document.getElementById('InputIBGE').style.display='flex'
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
        window.document.getElementById('DivListPais').style.display='none'
        window.document.getElementById('DivListUf').style.display='none'
        window.document.getElementById('DivSitF').style.display='none'
        

            Refe1.current.value = ''
            Refe2.current.value = ''
            Refe3.current.value = ''
            Refe4.current.value = ''
            Refe5.current.value = ''
            Refe6.current.checked = false
        
    }

    //SAVE
    async function Salvar (event) {

        event.preventDefault()
        var valorP = Refe1.current.value
        var valorReal = ArrayPaises.find(pais=> pais.descricao === valorP)
        var idCorrespondente = valorReal ? valorReal.id : null

        var dataNew = {
            "id": 0,
            "id_pais": idCorrespondente,
            "municipio": Refe2.current.value,
            "uf": Refe3.current.value,
            "ibge": Refe5.current.value,
            "ddd": Refe4.current.value,
            "situacao": Refe6.current.checked
        }

        var dataUpdate ={
            "id": idValue,
            "id_pais": PaisIdValue,
            "municipio": Refe2.current.value,
            "uf": Refe3.current.value,
            "ibge": Refe5.current.value,
            "ddd": Refe4.current.value,
            "situacao": Refe6.current.checked
        }

        if (idValue==''){
            const Salvando = await SalvarMunicipio(dataNew)
            if(Salvando.msgerro===""){
                setSuccess(true)
            }else{
                setMsgerro(Salvando.msgerro)
            }
        }else{
            const Salvando = await SalvarMunicipio(dataUpdate)
            setSuccess(true)
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
        const divListUf = document.getElementById('DivListUf');
        const liUf1 = document.getElementsByClassName('LiUF1');

        if(valor.length === 1){

            window.document.getElementById('DivListUf').style.display='flex'
            divListUf.style.height='13rem'
            Array.from(liUf1).forEach((element) => {
                element.style.display = 'flex';
              });

        }else if (valor.length === 2){

            Array.from(liUf1).forEach((element) => {
                element.style.display = 'none';
              });
              divListUf.style.height='1.8rem'
        
        }else if (valor.length === 0){
            divListUf.style.height='13rem'
            divListUf.style.display='none'
        }
    }

    function clickUf (descricao) {
        Refe3.current.value = descricao
        window.document.getElementById('DivListUf').style.display='none'
    }

    const handleInputChange = (event) => {
        const upperCaseValue = event.target.value.toUpperCase();
        setInputValue(upperCaseValue);
      }

    //FILTRAR 

    function FiltroBTN () {
        setFormVisivel(true)
        Refe1.current.value = ''
        Refe2.current.value = ''
        Refe3.current.value = ''
        Refe5.current.value = ''
        Refe7.current.value = ''

        if(veriFiltro===true){
            Refe1.current.value = paisvalueFiltro
            Refe2.current.value = municipioFiltro
            Refe3.current.value = ufValueFiltro
            Refe7.current.value = sitValueFiltro
        }

        if(FormVisivel===true){
            window.document.getElementById('FormAdd').style.display='flex'
            window.document.getElementById('SecTopBTN').style.display='none'           
            window.document.getElementById('Table-Municipio').style.display='none'
            window.document.getElementById('DivSitF').style.display='flex'
            window.document.getElementById('OpSituacao').style.display='flex'
            window.document.getElementById('DivSit').style.display='none'
            window.document.getElementById('labelDDD').style.display='none'
            window.document.getElementById('InputDDD').style.display='none'
            window.document.getElementById('labelIBGE').style.display='none'
            window.document.getElementById('InputIBGE').style.display='none'

        }

        setBTNSfiltro(true)
    }

    async function Filtrar (event) {
        event.preventDefault()
        var data = {
            "pais": Refe1.current.value,
            "municipio": Refe2.current.value,
            "uf": Refe3.current.value,
            "situacao": Refe7.current.value
        }

        var req = await FiltroGetMunicipio(data)
        var datajson = await req.json()
        setarrayFiltro(datajson)
        setTrocarTabelas(true)
        setBTNSfiltro(false)
        setveriFiltro(true)
        setpaisvalueFiltro(Refe1.current.value)
        setmunicipioFiltro(Refe2.current.value)
        setufValueFiltro(Refe3.current.value)
        setveriFiltro(Refe7.current.value)

        window.document.getElementById('FormAdd').style.display='none'
        window.document.getElementById('Table-Municipio').style.display='flex'
        window.document.getElementById('SecTopBTN').style.display='flex'

    }

    function Limpar () {

        setSuccess(true)
    }

    //EXCLUIR
    const Exclui = async (element) => {
        try {
            console.log("Excluindo país:", element);
            await ApiDeleteMunicipio(element.id);
            setPaises(prevPaises => prevPaises.filter(pais => pais.id !== element.id));
            // Atualiza o estado do arrayFiltro removendo o país excluído
            setarrayFiltro(prevarrayFiltro => prevarrayFiltro.filter(pais => pais.id !== element.id));
            console.log("País excluído com sucesso:", element);
        } catch (error) {
            console.error("Erro ao excluir país:", error);
        }
    };

    //EDITAR
    async function EditPais (element) {
        setidValue(element.id)
        setBTNSfiltro(false)
        Refe1.current.value = element.pais
        Refe2.current.value = element.municipio
        Refe3.current.value = element.uf
        Refe4.current.value = element.ddd
        Refe5.current.value = element.ibge
        Refe6.current.checked = element.situacao

        var valorP = Refe1.current.value
        var valorReal = ArrayPaises2.find(pais=> pais.descricao === valorP)
        var idCorrespondente = valorReal ? valorReal.id : null


        setPaisIdValue(idCorrespondente)
        setFormVisivel(true)
        if(FormVisivel===true){
            window.document.getElementById('FormAdd').style.display='flex'
            window.document.getElementById('DivSit').style.display='flex'
            window.document.getElementById('SecTopBTN').style.display='none'           
            window.document.getElementById('Table-Municipio').style.display='none'
            
            window.document.getElementById('labelDDD').style.display='flex'
            window.document.getElementById('InputDDD').style.display='flex'
            window.document.getElementById('labelIBGE').style.display='flex'
            window.document.getElementById('InputIBGE').style.display='flex'
        }
    }

    //FUNÇÕES DO MODAL////////
    function abrirModal (id) {
        setIdSelecionado(id)
        setModalAberto(true)
    }
    function fecharModal () {
        setModalAberto(false)
    }

    function ArrayModal (ArrayPaises) {
        
    }

    return(
        <div id="TelaMunicipio">
            <NavBar/>
            <AlertE error ={msgerro} handleError={handleError}/>
            <div id="SecTop">
                <h1>Municipio</h1>
                <div id="SecTopBTN">
                    <button onClick={ADD}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={FiltroBTN}><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <form action="" method="post" id="FormAdd">
                <div id="FormCampos">
                    <fieldset>
                        <label className="LabelForm">Pais</label>
                        <input type="text" className="InputForm" id="InputPais" ref={Refe1} onChange={()=>{
                            ListPais()
                            ConvertMaiusculo(Refe1)
                        }} onClick={fecharListaUf} maxLength="14" />
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
                        <input type="text" className="InputForm" id="InputMunicipio" ref={Refe2} onChange={()=>{
                            ConvertMaiusculo(Refe2)
                        }} onClick={fecharListas}/>
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">UF</label>
                        <input type="text"  className="InputForm" id="InputUf" value={inputValue} ref={Refe3} onChange={()=>{
                            changeUf()
                            ConvertMaiusculo(Refe3)
                            handleInputChange(event)
                            fecharListaPais()
                        }} onClick={fecharListaPais} maxLength="2"/>
                        <div className="DivList" id="DivListUf">
                            <ul id="ListaUF">
                                {ArrayUf.map((val, key)=>{
                                    return(
                                        <li className="ListItemUf LiUF1" key={key} onClick={()=>{clickUf(val.descricao)}}>{val.descricao}</li>
                                    )
                                })}
                                <li className="ListItemUf" id="LiUF2" onClick={()=>{
                                    window.document.getElementById('DivListUf').style.display='none'
                                }} >{UfValue.descricao}</li>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset id="FieldsetDDD">
                        <label className="LabelForm" id="labelDDD">DDD</label>
                        <input type="number" className="InputForm" id="InputDDD" ref={Refe4} onClick={fecharListas}/>
                    </fieldset>
                    <fieldset id="FieldsetIBGE">
                        <label className="LabelForm" id="labelIBGE">IBGE</label>
                        <input type="number" className="InputForm" id="InputIBGE" ref={Refe5} onClick={fecharListas}/>
                    </fieldset>
                    <fieldset>
                        <label className="LabelForm">Situação</label>
                        <div id="DivSit">
                            <input type="checkbox" ref={Refe6} />
                            <p>Ativo</p>
                        </div>
                        <div id="DivSitF">
                            <select name="Situacao" id="OpSituacao" ref={Refe7} onChange={()=>{setSituacaoValue(Refe7.current.value)}} onClick={fecharListas}>
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
                    <button id="BtnConfirmFilter" onClick={Filtrar}><FontAwesomeIcon icon={faFilter} /></button>
                    <button id="BtnConfirmFilter" onClick={Limpar}><FontAwesomeIcon icon={faBroom} /></button>
                    <button id="BtnCloseAdd" onClick={CloseForm}><FontAwesomeIcon icon={faXmark}/></button>
                </div>
            </form>
            {modalAberto&&<ModalMunicipio fecharModal={fecharModal} FuncaoModal={ArrayModal} dados={paises} idElement={idSelecionado}/>}
            <div id="Table-Municipio">
                <div id="HudMunicipio">
                    <ul>
                        <li id="HudIdM">ID</li>
                        <li id="HudPaisM">Pais</li>
                        <li id="HudMunicipioM">Municipio</li>
                    </ul>
                </div>
                <div id="Conteudo-Pais-Container">
                    <div id="Table-Pais">
                        <div id="table-pais1">
                                {paises.map((pais,index)=>(
                                    <ul key={pais.id} className={`Todo-List-ul ${pais.hidden ? 'hidden' : ''}`} style={{ display: listaVisivel ? "flex" : "none" }} >
                                        <li className="Todo-List-li id-tdListM">{pais.id}</li>
                                        <li className="Todo-List-li pais-tdListM">{pais.pais}</li>
                                        <li className="Todo-List-li municipio-tdList">{pais.municipio}</li>
                                        <li className="li-td-btn">
                                            <div className="BTNs-tdList">
                                                <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={()=>{abrirModal(pais.id)}}/>
                                                <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={()=>{EditPais(pais)}}/>
                                                <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(pais)}}/>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                        </div>
                        <div id="table-pais2">
                                {arrayFiltro.map((pais, index)=>(
                                    <ul key={pais.id} className={`Todo-List-ul ${pais.hidden ? 'hidden' : ''} ${pais.situacao ? 'red-list' : ''}`} style={{ display: listaVisivel ? "flex" : "none" }} >
                                        <li  className="Todo-List-li id-tdListM">{pais.id}</li>
                                        <li  className="Todo-List-li pais-tdListM">{pais.pais}</li>
                                        <li  className="Todo-List-li municipio-tdList">{pais.municipio}</li>
                                        <li  className="li-td-btn">
                                            <div className="BTNs-tdList">
                                                <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={()=>{abrirModal(pais.id)}}/>
                                                <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={()=>{EditPais(pais)}}/>
                                                <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(pais)}}/>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Municipio