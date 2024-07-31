import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faBroom, faPlus, faCheck, faTrash, faPenToSquare, faFolderOpen, faXmark, faUpload} from "@fortawesome/free-solid-svg-icons"
import NavBar from "../components/Nav"
import MsgConfirmPF from "../components/confirmPF "
import { AlertS, AlertE } from "../components/Msg";
import { GetAllPF } from "../functions/pf/getAllPF";
import { FichaPF } from "../functions/pf/fichaPF";
import { FiltroGetPF } from "../functions/pf/filtroPF"
import { NaciPesquisa } from "../functions/pf/nacionalidadePF"
import { SalvarPF } from "../functions/pf/savePF"
import { ContatosGet } from "../functions/pf/getAllContatos"

import '../css/routes.css/PFCadastro.css'

function PFCadastro () {

    //REfs
    const refNomeCompleto = useRef()
    const refNomeReserva = useRef()
    const refNomeCracha = useRef()
    const refRG = useRef()
    const refCPF = useRef()
    const refNacionalidade = useRef()
    const refDataNascimento = useRef()
    const refEstadoCivil = useRef()
    const refGenero = useRef()
    const refFornecedor = useRef()
    const refEstrangeira = useRef()
    const refNotificacao = useRef()
    const refSituacao = useRef()

    //refs relacionadas ao filtro 
    const nomeFiltro = useRef()
    const cpfFiltro = useRef()
    const generoFiltro = useRef()
    const situacaoFiltro = useRef()

    //estados
    const [fichaData, setfichaData] = useState ([])
    const [confirmVisivel, setconfirmVisivel] = useState (false)
    const [arrayConfirm, setarrayConfirm] = useState ([])
    const [msgerro, setMsgerro] = useState (null)
    const [msgsucess, setMsgsucess] = useState (null)

    //estados relacionados aos dados pessoais
    const [idValue, setidValue] = useState ('')
    const [nomeCompleto, setnomeCompleto] = useState ("")
    const [nomeReserva, setnomeReserva] = useState ("")
    const [nomeCracha, setnomeCracha] = useState ("")
    const [RG, setRG] = useState ("")
    const [CPF, setCPF] = useState ("")
    const [Nacionalidade, setNacionalidade] = useState ("")
    const [DataNascimento, setDataNascimento] = useState ("")
    const [estadoCivil, setestadoCivil] = useState ("")
    const [Genero, setGenero] = useState ("")
    const [Fornecedor, setFornecedor] = useState (false)
    const [Estrangeira, setEstrangeira] = useState (false)
    const [Notificação, setNotificação] = useState (false)
    const [Situacao, setSituacao] = useState(false)

    const [ListaPF, setListaPF] = useState ([])//lista principal sendo renderizada
    const [ListaPFfiltro, setListaPFfiltro] = useState ([])//lista do filtro sendo renderizada
    const [ListaContatos, setListaContatos] = useState ([])//lista de contatos do cliente sendo renderizada
    const [ListaNacionalidade, setListaNacionalidade] = useState ([])//lista de nacionalidades cadastradas

    //Effects

    useEffect(()=>{
        async function fetchData () {
            const data = await GetAllPF()
            setListaPF(data)
        }
        fetchData()
    },[])

    //functions

    function ConvertMaiusculo (ref) {
        if(ref.current){
            ref.current.value = ref.current.value.toUpperCase()
        }
     }

     async function ListNaci () {
        var valorInput = refNacionalidade.current.value
        if(valorInput.length >= 3){
            var Data = valorInput
            var Dados = await NaciPesquisa(Data)
            setListaNacionalidade(Dados)
            window.document.getElementById('DivListNaci').style.display='flex'
        } else if (valorInput <= 2) {
            window.document.getElementById('DivListNaci').style.display='none'
        }
    }

    function definir (descricao) {
        refNacionalidade.current.value = descricao
        window.document.getElementById('DivListNaci').style.display='none'
    }

    //fechar interno do form dados pessoais
    function fechar (e) {
        e.preventDefault()

        //aparecer
        window.document.getElementById('BTNsTopPF').style.display="flex"
        window.document.getElementById('ContedeuListPF').style.display="flex"
        //desaparecer
        window.document.getElementById('InfoAreaPF').style.display="none"       
        window.document.getElementById('Form-DadosPessoais').style.display="none" 
    }

    //relacionadas ao editar

    async function edit (id) {

        const data = await FichaPF(id)
        setidValue(id)

        refNomeCompleto.current.value = data.nome_completo
        refNomeCracha.current.value = data.nome_cracha
        refNomeReserva.current.value = data.nome_reserva
        refRG.current.value = data.rg
        refCPF.current.value = data.cpf
        refNacionalidade.current.value = data.nacionalidade

        refDataNascimento.current.value = data.dt_nascimento

        refEstadoCivil.current.value = data.estado_civil
        refGenero.current.value = data.genero
        refFornecedor.current.checked = data.fornecedor
        refEstrangeira.current.checked = data.estrangeira
        refNotificacao.current.checked = data.notificacao
        refSituacao.current.checked = data.situacao

        var corpo ={
            "id_pfisica": id,
	        "id_pjuridica": 0
        }
        const data2 = await ContatosGet(corpo)
        const dadosjson = await data2.json()
        const listaContatos = dadosjson.rcontato_regs || [];
        setListaContatos(listaContatos)

        //aparecer
        window.document.getElementById('InfoAreaPF').style.display="flex"
        window.document.getElementById('Form-DadosPessoais').style.display="flex"
        //desaparecer
        window.document.getElementById('ContedeuListPF').style.display="none"
        window.document.getElementById('BTNsTopPF').style.display="none"
        window.document.getElementById('FormFicha').style.display="none"
    }

    //relacionadas a ficha

    async function ficha (id) {
        const data = await FichaPF(id)
        setfichaData(data)

        //aparecer
        window.document.getElementById('InfoAreaPF').style.display="flex"
        window.document.getElementById('FormFicha').style.display="flex"        
        //desaparecer
        window.document.getElementById('ContedeuListPF').style.display="none"
        window.document.getElementById('BTNsTopPF').style.display="none"
        window.document.getElementById('Form-DadosPessoais').style.display="none"
    }

    function fecharFicha (e) {
        e.preventDefault()

        //aparecer
        window.document.getElementById('BTNsTopPF').style.display="flex"
        window.document.getElementById('ContedeuListPF').style.display="flex"
        //desaparecer
        window.document.getElementById('InfoAreaPF').style.display="none"       
        window.document.getElementById('FormFicha').style.display="none" 
    }
    //relacionadas a adição de novos cadastros 

    const formatCPF = (cpf) => {
        // Remove qualquer caractere não numérico
        cpf = cpf.replace(/\D/g, '')
    
        // Adiciona a máscara
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    
        return cpf
      }

      const formatRG = (rg) => {
        // Remove todos os caracteres não numéricos
        rg = rg.replace(/\D/g, '');
    
        // Adiciona a máscara no formato XX.XXX.XXX-X
        if (rg.length <= 9) {
            rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
        } else {
            rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})(\d)$/, '$1.$2.$3-$4/$5');
        }
    
        return rg;
    }

        function formatarData(data) {
            const [ano, mes, dia] = data.split('-')
            return `${dia}/${mes}/${ano}`
        }

      const handleChangeCPF = (event) => {
        const { value } = event.target;
        const formattedCPF = formatCPF(value);
    
        // Atualiza o valor do input
        if (refCPF.current) {
          refCPF.current.value = formattedCPF;
        }
      }
      
      const handleChangeRG = (event) => {
        const { value } = event.target;
        const formattedRG = formatRG(value);
    
        // Atualiza o valor do input
        if (refRG.current) {
          refRG.current.value = formattedRG;
        }
      }

    async function add () {

        refNomeCompleto.current.value = ""
        refNomeCracha.current.value = ""
        refNomeReserva.current.value = ""
        refRG.current.value = ""
        refCPF.current.value = ""
        refNacionalidade.current.value = ""

        refDataNascimento.current.value = ""

        refEstadoCivil.current.value = ""
        refGenero.current.value = ""
        refFornecedor.current.checked = false
        refEstrangeira.current.checked = false
        refNotificacao.current.checked = false
        refSituacao.current.checked = false

        //aparecer
        window.document.getElementById('CamposFormPF-DP').style.display="flex"        
        window.document.getElementById('InfoAreaPF').style.display="flex"        
        window.document.getElementById('Form-DadosPessoais').style.display="flex"        
        //desaparecer
        window.document.getElementById('ContedeuListPF').style.display="none"
        window.document.getElementById('BTNsTopPF').style.display="none" 
        window.document.getElementById('FormFicha').style.display="none" 
    }

    async function confirm (e) {
        e.preventDefault()
        var valorNaci = refNacionalidade.current.value
        var valorReal = ListaNacionalidade.find(naci=> naci.descricao === valorNaci)
        var idCorrespondente = valorReal ? valorReal.id : null

        
        const dataSelecionada = refDataNascimento.current.value
        const dataFormatada = formatarData(dataSelecionada);

        var data = {
            "id": 0,
            "fornecedor": refFornecedor.current.checked,
            "nome_completo": refNomeCompleto.current.value,
            "nome_reserva": refNomeReserva.current.value,
            "nome_cracha": refNomeCracha.current.value,
            "cpf": refCPF.current.value,
            "rg": refRG.current.value,
            "nacionalidade": refNacionalidade.current.value,
            "nac_id_pais": idCorrespondente,
            "dt_nascimento": dataFormatada,
            "genero": refGenero.current.value,
            "colgen_outros": "hide",
            "estado_civil": refEstadoCivil.current.value,
            "situacao": refSituacao.current.checked,                                                                                   
            "notificacao": refNotificacao.current.checked,
            "estrangeira": refEstrangeira.current.checked,            
            "inc_usuario": 1,
            "alt_usuario": 0,
            "alt_dhsis": "2024-07-17T11:00:00.000Z"
        }

        var dataUpdate = {
            "id": idValue,
            "nome_completo": refNomeCompleto.current.value,
            "nome_reserva": refNomeReserva.current.value,
            "nome_cracha": refNomeCracha.current.value,
            "genero": refGenero.current.value,
            "estado_civil": refEstadoCivil.current.value,
            "dt_nascimento": refDataNascimento.current.value,
            "nac_id_pais": idCorrespondente,
            "nacionalidade": refNacionalidade.current.value,
            "estrangeira": refEstrangeira.current.checked,
            "cpf": refCPF.current.value,
            "rg": refRG.current.value,
            "fornecedor": false,
            "notificacao": false,
            "situacao": true,
            "inc_usuario": 1,
            "alt_usuario": 0,
            "alt_dhsis": "2024-07-17T11:00:00.000Z"
        }

        if (idValue==''){
            const Salvando = await SalvarPF(data)
            if(Salvando.retorno===0){
                setMsgsucess(true)
            }else{
                setMsgerro(Salvando.msgerro)
            }
        }else{
            const SalvandoUp = await SalvarPF(dataUpdate)
            if(SalvandoUp.retorno===0){
                setMsgsucess(true)
            }else{
                setMsgerro(SalvandoUp.msgerro)
            }
        }

    }

    //relacionadas ao filtro 

    function filtro () {
        //aparecer
        window.document.getElementById('Form-FilterPF').style.display="flex"        
        //desaparecer
        window.document.getElementById('ContedeuListPF').style.display="none"
        window.document.getElementById('BTNsTopPF').style.display="none"
    }

    async function Filtrar (e) {
        e.preventDefault()
        var data = {
            "chave": "",
	        "nome": nomeFiltro.current.value,
	        "situacao": situacaoFiltro.current.value,
            "cpf": cpfFiltro.current.value,
            "genero": generoFiltro.current.value,
	        "alt_dhsis_maior": "",
	        "alt_dhsis_menor": ""
        }

        var dados = await FiltroGetPF (data)
        var dadosPesquisa = await dados.json()

        setListaPFfiltro(dadosPesquisa)

        //aparecer
        window.document.getElementById('ContedeuListPF').style.display="flex"
        window.document.getElementById('BTNsTopPF').style.display="flex"          
        window.document.getElementById('Table-PF2').style.display="flex"     
        //desaparecer
        window.document.getElementById('Table-PF1').style.display="none"
        window.document.getElementById('Form-FilterPF').style.display="none"
    }

    function fecharFiltro (e) {
        e.preventDefault()
        //aparecer   
        window.document.getElementById('ContedeuListPF').style.display="flex"
        window.document.getElementById('BTNsTopPF').style.display="flex"    
        //desaparecer
        window.document.getElementById('Form-FilterPF').style.display="none" 
    }

    function limparFiltro () {
        window.location.reload()
    }

    //relacionadas as mensagens
    function handleError () {
        setMsgerro(null)
    }

    function handleSuccess () {
        setMsgsucess(null)
    }

    //relacionadas a excluir

    const Exclui = async (element) => {
        setconfirmVisivel(true)
        setarrayConfirm(element)
    }

    function excluir (element){
        setListaPF(prevPaises => prevPaises.filter(pais => pais.id !== element.id))
        setListaPFfiltro(prevarrayFiltro => prevarrayFiltro.filter(pais => pais.id !== element.id))
    }

    function fecharConfirm () {
        setconfirmVisivel(false)
    }

    function mensagemErro (element) {
        setMsgerro(element.msgerro)
    }

    return(
        <div id="Tela-PFCadaastro">
            <NavBar/>
            <AlertE error ={msgerro} handleError={handleError}/>
            <AlertS success={msgsucess} handleSuccess={handleSuccess}/>
            <MsgConfirmPF estado ={confirmVisivel} estadoF ={fecharConfirm} element={arrayConfirm} error = {mensagemErro} excluir ={excluir}/>
            <div id="SecTop-PF">
                <h1>Pessoa Fisica</h1>
                <div id="BTNsTopPF">
                    <button onClick={add}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={filtro}><FontAwesomeIcon icon={faFilter}/></button>
                </div>
            </div>
            <div id="InfoAreaPF">
                <div id="inforAreaPF2">
                    <form id="Form-DadosPessoais">
                        <div>
                            <p><i>Selecionar Informações</i></p>
                        </div>
                        <div id="CamposFormPF-DP">
                            <div id="CamposNomePF-DP">
                                <fieldset className="FieldDadosPessoais nomesPF-DP">
                                    <label>Nome Completo</label>
                                    <input type="text" ref={refNomeCompleto} onChange={()=>{
                                        ConvertMaiusculo(refNomeCompleto)
                                    }}/>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais nomesPF-DP">
                                    <label>Nome p/ reserva</label>
                                    <input type="text" ref={refNomeReserva} onChange={()=>{
                                        ConvertMaiusculo(refNomeReserva)
                                    }}/>
                                </fieldset >
                                <fieldset className="FieldDadosPessoais nomesPF-DP">
                                    <label>Nome p/ crachá</label>
                                    <input type="text" ref={refNomeCracha} onChange={()=>{
                                        ConvertMaiusculo(refNomeCracha)
                                    }}/>
                                </fieldset>
                            </div>
                            <div id="CamposOutrosPF-DP">
                                <fieldset className="FieldDadosPessoais outrosPF-DP"> 
                                    <label>RG</label>
                                    <input type="text" ref={refRG} onChange={handleChangeRG}/>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais outrosPF-DP">
                                    <label>CPF</label>
                                    <input type="text" ref={refCPF} onChange={handleChangeCPF}/>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais outrosPF-DP">
                                    <label>Nacionalidade</label>
                                    <input type="text" ref={refNacionalidade} onChange={()=>{
                                        ConvertMaiusculo(refNacionalidade)
                                        ListNaci()
                                    }}/>
                                    <div id="DivListNaci">
                                        <ul id="ListaNaci">
                                            {ListaNacionalidade.map((val) => {
                                                return (
                                                    <li key={val.id} className="ListaNaciLI" onClick={()=>{definir(val.descricao)}}>
                                                        {val.descricao}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                </fieldset>
                            </div>
                            <div id="CamposMenoresPF-DP">
                                <fieldset className="FieldDadosPessoais menoresPF-DP">
                                    <label>Data de Nascimento</label>
                                    <input type="date" id="DataInputPF-DP" ref={refDataNascimento}/>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais menoresPF-DP">
                                    <label>Estado Civil</label>
                                    <select name="Situacao" id="OpCivilPF" ref={refEstadoCivil}>
                                            <option value="">Selecionar</option>
                                            <option value="1">SOLTEIRO</option>
                                            <option value="2">CASADO</option>
                                            <option value="3">SEPARADO</option>
                                            <option value="4">DIVORCIADO</option>
                                            <option value="5">VIÚVO</option>
                                    </select>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais menoresPF-DP">
                                    <label>Gênero</label>
                                    <select name="Situacao" id="OpGeneroPF" ref={refGenero}>
                                            <option value="">Selecionar</option>
                                            <option value="1">MASCULINO</option>
                                            <option value="2">FEMININO</option>
                                            <option value="3">OUTROS</option>
                                    </select>
                                </fieldset>
                                <fieldset className="CheckPF-DP">
                                    <label>Fornecedor</label>
                                    <div>
                                        <input type="checkbox" ref={refFornecedor}/>
                                        <p>Sim</p>
                                    </div>                            
                                </fieldset>
                                <fieldset className="CheckPF-DP">
                                    <label>Estrangeira</label>
                                    <div>
                                        <input type="checkbox" ref={refEstrangeira}/>
                                        <p>Sim</p>
                                    </div>
                                </fieldset>
                                <fieldset className="CheckPF-DP">
                                    <label>Notificação</label>
                                    <div>
                                        <input type="checkbox" ref={refNotificacao}/>
                                        <p>Sim, receber</p>
                                    </div>
                                </fieldset>
                                <fieldset className="CheckPF-DP">
                                    <label>Situação</label>
                                    <div>
                                        <input type="checkbox" ref={refSituacao}/>
                                        <p>Ativo</p>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div id="BTNsDadosPessoais">
                            <button onClick={confirm}><FontAwesomeIcon icon={faCheck}/></button>
                            <button onClick={fechar}><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                    </form>
                    <form id="FormFicha">
                        <div>
                            <p><i>Informações Gerais</i></p>
                        </div>
                        <div id="CamposFormPF-DP">
                            <div id="CamposNomePF-DP">
                                <fieldset className="FieldDadosPessoais nomesPF-DP">
                                    <label>Nome Completo: </label>
                                    <span>{fichaData.nome_completo}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais nomesPF-DP">
                                    <label>Nome para Reserva: </label>
                                    <span>{fichaData.nome_reserva}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais nomesPF-DP">
                                    <label>Nome para crachá: </label>
                                    <span>{fichaData.nome_reserva}</span>
                                </fieldset>
                            </div>
                            <div id="CamposOutrosPF-DP">
                                <fieldset className="FieldDadosPessoais outrosPF-ficha">
                                    <label>RG: </label>
                                    <span>{fichaData.rg}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais outrosPF-ficha">
                                    <label>CPF: </label>
                                    <span>{fichaData.cpf}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais outrosPF-ficha">
                                    <label>Data de Nascimento</label>
                                    <span>{fichaData.dt_nascimento}</span>
                                </fieldset>
                            </div>
                            <div id="CamposMenoresPF-Ficha">
                                <fieldset className="FieldDadosPessoais menoresPF-Ficha">
                                    <label>Nacionalidade: </label>
                                    <span>{fichaData.nacionalidade}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais menoresPF-Ficha">
                                    <label>Estado Civil: </label>
                                    <span>{fichaData.estado_civil}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais menoresPF-Ficha">
                                    <label>Gênero: </label>
                                    <span>{fichaData.genero }</span>
                                </fieldset>                            
                                <fieldset className="FieldDadosPessoais">
                                    <label>Fornecedor: </label>
                                    <span>{fichaData.fornecedor ? 'Ativo' : 'Inativo'}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais">
                                    <label>Estrangeira: </label>
                                    <span>{fichaData.estrangeira ? 'Ativo' : 'Inativo'}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais">
                                    <label>Notificação: </label>
                                    <span>{fichaData.notificacao ? 'Ativo' : 'Inativo'}</span>
                                </fieldset>
                                <fieldset className="FieldDadosPessoais">
                                    <label>Situação: </label>
                                    <span>{fichaData.situacao ? 'Ativo' : 'Inativo'}</span>
                                </fieldset>
                            </div>
                        </div>
                        <div id="BTNsDadosPessoais">
                            <button onClick={fecharFicha}><FontAwesomeIcon icon={faCheck} /></button>
                            <button><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                    </form>
                    <form id="Form-AddContatos">
                        <p><i>Selecionar Informações</i></p>
                        <div id="DivContatosAdd">
                            <div id="secInputsContatos">                                
                                <fieldset id="fieldContatosTipo">
                                    <label>Tipo</label>
                                    <select name="Situacao" id="OpTipoPF" ref={refGenero}>
                                        <option value="">Selecionar</option>
                                        <option value="1">FONE</option>
                                        <option value="2">CELULAR</option>
                                        <option value="3">EMAIL</option>
                                        <option value="4">FACEBOOK</option>
                                        <option value="5">INSTAGRAM</option>
                                        <option value="6">TWITTER</option>
                                        <option value="7">OUTROS</option>
                                    </select>
                                </fieldset>
                                <fieldset id="FieldContatosEndere">
                                    <label>Endereço</label>
                                    <input type="text" />
                                </fieldset>
                                <fieldset id="FieldContatosDescri">
                                    <label>Descrição</label>
                                    <input type="text" />
                                </fieldset>                              
                            </div>
                            <div id="BTNsContatosPF">
                                <button><FontAwesomeIcon icon={faCheck} /></button>
                                <button><FontAwesomeIcon icon={faXmark} /></button>
                            </div>
                        </div>
                    </form>
                    <div id="ContatoListPF">
                        <div id="HudContatoPF">
                            <ul>
                                <li id="hudTipo">Tipo</li>
                                <li id="hudEndere">Endereço</li>
                                <li id="hudDescri">Descrição</li>
                            </ul>
                        </div>
                        <div id="Conteudo-PF-Contato">
                            <div id="Table-PFcontato">
                                {Array.isArray(ListaContatos) && ListaContatos.length > 0 ? (
                                    ListaContatos.map((ct, index) => (
                                        <ul key={index} className="ListContatos">
                                            <li className="dtipoContatos">{ct.dtipo}</li>
                                            <li className="endereContatos">{ct.endereco}</li>
                                            <li className="descriContatos">{ct.descricao}</li>
                                            <li className="liBTNContatos">
                                                <div className="divContatosBTNs">
                                                    <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais"/>
                                                    <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais"/>
                                                </div>
                                            </li>
                                        </ul>
                                    ))
                                ) : (
                                    <p>Nenhum contato disponível</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="AreaImgPF">
                    <img src="" alt="" />
                    <input type="file" id="uploadBtn"/>
                    <label htmlFor="uploadBtn" id="LabelUpload"><FontAwesomeIcon icon={faUpload} />Upload File</label>
                </div>
            </div>
            <form id="Form-FilterPF">
                <p><i>Selecionar Informações</i></p>
                <div id="DivFiltroPF">
                    <div id="secInputsFiltro">
                        <fieldset>
                            <label>Nome Completo</label>
                            <input type="text" ref={nomeFiltro}/>
                        </fieldset>
                        <fieldset>
                            <label>CPF</label>
                            <input type="text" ref={cpfFiltro}/>
                        </fieldset>
                        <fieldset>
                            <label>Gênero</label>
                                <select name="Situacao" id="OpGeneroFiltro" ref={generoFiltro}>
                                        <option value="">Selecionar</option>
                                        <option value="1">MASCULINO</option>
                                        <option value="2">FEMININO</option>
                                        <option value="3">OUTROS</option>
                                </select>
                        </fieldset>
                        <fieldset>
                            <label>Situação</label>
                            <select name="Situacao" id="OpSituacaoPF" ref={situacaoFiltro}>
                                    <option value="">Selecionar</option>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                            </select>
                        </fieldset>
                    </div>
                    <div id="BTNsFiltroPF">
                        <button onClick={Filtrar}><FontAwesomeIcon icon={faFilter} /></button>
                        <button onClick={limparFiltro}><FontAwesomeIcon icon={faBroom} /></button>
                        <button onClick={fecharFiltro}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
            </form>
            <div id="ContedeuListPF">
                <div id="HudConteudoPF">
                    <ul>
                        <li>ID</li>
                        <li>Nome Completo</li>
                        <li id="liNomeReserva">Nome para reservas</li>
                    </ul>
                </div>
                <div id="Conteudo-PF-Container">
                    <div id="Table-PF">
                        <div id="Table-PF1">
                            {ListaPF.map((pf, index)=>(
                                <ul key={pf.id} className={`Todo-List-PF ${pf.hidden ? 'hidden' : ''}`}>
                                    <li className="Todo-List-li id-tdListPF">{pf.id}</li>
                                    <li className="Todo-List-li NC-tdListPF">{pf.nome_completo}</li>
                                    <li className="Todo-List-li NR-tdListPF">{pf.nome_reserva}</li>
                                    <li className="li-td-btn">
                                        <div className="BTNs-tdList">
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={()=>{ficha(pf.id)}}/>
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={()=>{edit(pf.id)}}/>
                                            <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{Exclui(pf)}}/>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div id="Table-PF2">
                            {ListaPFfiltro.map((pf, index) => (
                                <ul key={pf.id} className={`Todo-List-PF ${pf.hidden ? 'hidden' : ''} ${pf.situacao ? 'red-list' : ''}`}>
                                    <li className="Todo-List-li id-tdListPF">{pf.id}</li>
                                    <li className="Todo-List-li NC-tdListPF">{pf.nome_completo}</li>
                                    <li className="Todo-List-li NR-tdListPF">{pf.nome_reserva}</li>
                                    <li className="li-td-btn">
                                        <div className="BTNs-tdList">
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" />
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={() => edit(pf.id)} />
                                            <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={() => Exclui(pf)} />
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

export default PFCadastro