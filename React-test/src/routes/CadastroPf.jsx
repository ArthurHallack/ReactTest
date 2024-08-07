import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faBroom, faPlus, faCheck, faTrash, faPenToSquare, faFolderOpen, faXmark, faUpload} from "@fortawesome/free-solid-svg-icons"
import NavBar from "../components/Nav"
import MsgConfirmPF from "../components/confirmPF "
import MsgConfirmPFcontato from "../components/confirmPFcontato"
import { AlertS, AlertE } from "../components/Msg";
import { GetAllPF } from "../functions/pf/getAllPF";
import { FichaPF } from "../functions/pf/fichaPF";
import { FiltroGetPF } from "../functions/pf/filtroPF"
import { NaciPesquisa } from "../functions/pf/nacionalidadePF"
import { SalvarPF } from "../functions/pf/savePF"
import { ContatosGet } from "../functions/pf/getAllContatos"
import { SalvarContatoPF } from "../functions/pf/contatoSave"
import { FichaPFcontato } from "../functions/pf/fichaContato"
import { SaveImgPF } from "../functions/pf/saveIMG"
import { FichaIMG } from "../functions/pf/fichaIMG"

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

    //refs relacionadas ao form de contatos
    const contatosTipo = useRef()
    const contatosEndere = useRef()
    const contatosDescri = useRef()

    const fileInputRef = useRef(null)

    //estados
    const [fichaData, setfichaData] = useState ([])
    const [confirmVisivel, setconfirmVisivel] = useState (false)
    const [confirmVisivelContato, setconfirmVisivelContato] = useState (false)
    const [arrayConfirm, setarrayConfirm] = useState ([])
    const [arrayConfirmContato, setarrayConfirmContato] = useState ([])
    const [msgerro, setMsgerro] = useState (null)
    const [msgsucess, setMsgsucess] = useState (null)

    //estados relacionados aos dados pessoais
    const [idValue, setidValue] = useState ('')
    const [idValueContato, setidValueContato] = useState ('')
    const [idValueFicha, setidValueFicha] = useState ('')
    const [NomeContato, setNomeContato] = useState ('')
    const [inc, setinc] = useState ('')
    const [incEdit, setincEdit] = useState ('')
    const [alt, setalt] = useState ('')
    const [altEdit, setaltEdit] = useState ('')
    const [imageBase64, setImageBase64] = useState("")
    const [imageBase64Save, setImageBase64Save] = useState("")
    const [addnew, setaddnew] = useState(false)
    const [addup, setaddup] = useState(false)
    const [imagEdit, setimagEdit] = useState(false)

    const [ListaPF, setListaPF] = useState ([])//lista principal sendo renderizada
    const [ListaPFatualizada, setListaPFatualizada] = useState (false)//lista principal precisa ser atualizada ? 
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

    useEffect(()=>{
        async function fetchData () {
            const data = await GetAllPF()
            setListaPF(data)
            setListaPFatualizada(false)
        }
        fetchData()
    },[ListaPFatualizada])

    useEffect(()=>{
        if(imageBase64 != ""){
            //deve aparecer
            window.document.getElementById('BtnsImgPerfil').style.display="flex"
            //deve desaparecer
            window.document.getElementById('uploadBtn').style.display="none"
            window.document.getElementById('LabelUpload').style.display="none"
            //configs
            window.document.getElementById('AreaImgPF').style.justifyContent="space-between"
        }else {
            //deve aparecer
            window.document.getElementById('LabelUpload').style.display="flex"
            //deve desaparecer
            window.document.getElementById('BtnsImgPerfil').style.display="none"
            //configs
            window.document.getElementById('AreaImgPF').style.justifyContent="center"
        }
    },[imageBase64])

    useEffect(()=>{
        if(addnew===true){
            async function fetchData() {
                var arraypagina = await GetAllPF()
                var id = findObjectWithHighestId(arraypagina)
                var Getalt = await FichaPF(id.id)
                var alt = Getalt.alt_dhsis
                var data = {
                    "id": id.id,
                    "foto":  imageBase64Save,
                    "alt_dhsis": alt
                }
                var dados = await SaveImgPF(data)
                if(dados.msgerro===''){
                    setaddnew(false)
                }else{
                    setaddnew(false)
                    setMsgerro(dados.msgerro)
                }
            }
            fetchData()
        }
    },[addnew])

    useEffect(()=>{
        if(addup===true){
            async function fetchData() {
                var Getalt = await FichaPF(idValue)
                var alt = Getalt.alt_dhsis
                var data = {
                    "id": idValue,
                    "foto":  imageBase64Save,
                    "alt_dhsis": alt
                }
                var data2 = {
                    "id": idValue,
                    "foto":  "",
                    "alt_dhsis": alt
                }
                if(imageBase64===""){
                    var dados = await SaveImgPF(data2)
                    if(dados.msgerro===''){
                        setaddup(false)
                    }else{
                        setaddup(false)
                        setMsgerro(dados.msgerro)
                    }
                }else {
                    var dados = await SaveImgPF(data)
                    if(dados.msgerro===''){
                        setaddup(false)
                    }else{
                        setaddup(false)
                        setMsgerro(dados.msgerro)
                    }
                }
                
            }
            fetchData()
        }
    },[addup])

    useEffect(()=>{
        if (imageBase64Save) {
            // Adiciona o prefixo ao valor de imagebase64save
            const formattedBase64 = `data:image/jpeg;base64,${imageBase64Save}`;
            
            // Atualiza o estado imagebase64 com o valor formatado
            setImageBase64(formattedBase64);
            setimagEdit(false)
        }
    },[imageBase64Save, imagEdit])

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

    function formatDateForInput(dateStr) {
        // Divida a string da data no formato DD/MM/YYYY
        const [day, month, year] = dateStr.split('/');
    
        // Construa o formato YYYY-MM-DD
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
        return formattedDate;
    }

    //relacionadas a foto do perfil em base64

    function handleFileChange(event) {
        const file = event.target.files[0];
    
        if (file) {
            // Verifica se o tipo de arquivo é JPEG
            if (file.type === 'image/jpeg') {
                const reader = new FileReader();
                
                reader.onloadend = () => {
                    const base64String = reader.result;
                    
                    // Atualiza o estado com a base64 completa
                    setImageBase64(base64String);
                    
                    // Remove o prefixo `data:image/jpeg;base64,`
                    const base64Data = base64String.split(',')[1];
                    
                    // Atualiza o estado com a base64 formatada
                    setImageBase64Save(base64Data);
                };
                
                reader.readAsDataURL(file);
            } else {
                // Exibe uma mensagem de alerta se o arquivo não for JPEG
                alert('Por favor, selecione um arquivo JPG.');
            }
        }
    }
    
    

    function limparFoto () {
        setImageBase64("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reseta o valor do input de arquivo
          }
    }

    const findObjectWithHighestId = (arr) => {
        return arr.reduce((max, obj) => (obj.id > max.id ? obj : max), arr[0]);
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
        //configurações
        window.document.getElementById('Form-DadosPessoais').style.marginBottom=""
    }

    //relacionadas ao editar

    async function editContato (id){
        var data = await FichaPFcontato(id)
        setidValueFicha(id)
        setinc(data.inc_dhsis)
        setalt(data.alt_dhsis)

        contatosTipo.current.value = data.tipo
        contatosEndere.current.value = data.endereco
        contatosDescri.current.value = data.descricao

        //aparecer
        window.document.getElementById('Form-AddContatos').style.display="flex"
        //desaparecer
        window.document.getElementById('Form-DadosPessoais').style.display="none"
        window.document.getElementById('FormFicha').style.display="none"
        window.document.getElementById('Form-FilterPF').style.display="none"

        //configs de tamanho
        window.document.getElementById('ContatoListPF').style.height="20rem"
    }

    async function editIMG(id) {
        var imagem = await FichaIMG(id)
        setImageBase64Save(imagem.foto)
        setImageBase64("")
        setimagEdit(true)
    }

    async function edit (id) {

        const data = await FichaPF(id)
        setidValue(id)
        setidValueContato(id)
    
        var dataNasci = formatDateForInput(data.dt_nascimento)

        refNomeCompleto.current.value = data.nome_completo
        refNomeCracha.current.value = data.nome_cracha
        refNomeReserva.current.value = data.nome_reserva
        refRG.current.value = data.rg
        refCPF.current.value = data.cpf
        refNacionalidade.current.value = data.nacionalidade

        refDataNascimento.current.value = dataNasci

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
        setNomeContato(data.nome_completo)
        setincEdit(data.inc_dhsis)
        setaltEdit(data.alt_dhsis)

        //aparecer
        window.document.getElementById('InfoAreaPF').style.display="flex"
        window.document.getElementById('Form-DadosPessoais').style.display="flex"
        window.document.getElementById('ContatoListPF').style.display="flex"
        //desaparecer
        window.document.getElementById('ContedeuListPF').style.display="none"
        window.document.getElementById('BTNsTopPF').style.display="none"
        window.document.getElementById('FormFicha').style.display="none"
    }

    //relacionadas a ficha

    async function ficha (id) {
        const data = await FichaPF(id)
        setfichaData(data)
        setidValue('')

        var corpo ={
            "id_pfisica": id,
	        "id_pjuridica": 0
        }
        const data2 = await ContatosGet(corpo)
        const dadosjson = await data2.json()
        const listaContatos = dadosjson.rcontato_regs || [];
        setListaContatos(listaContatos)
        setNomeContato(data.nome_completo)

        //aparecer
        window.document.getElementById('InfoAreaPF').style.display="flex"
        window.document.getElementById('FormFicha').style.display="flex"
        window.document.getElementById('ContatoListPF').style.display="flex"        
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

        setidValue('')
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
        window.document.getElementById('ContatoListPF').style.display="none" 
        //configurações
        window.document.getElementById('Form-DadosPessoais').style.marginBottom="19rem"
    }

    async function confirm (e) {
        e.preventDefault()
        var valorNaci = refNacionalidade.current.value
        var valorReal = ListaNacionalidade.find(naci=> naci.descricao === valorNaci)
        var idCorrespondente = valorReal ? valorReal.id : null

        
        const dataSelecionada = refDataNascimento.current.value
        const dataFormatada = formatarData(dataSelecionada);

        var AtualData = new Date();
        var FormDataAtual = AtualData.toISOString().split('T')[0];

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
            "alt_dhsis": FormDataAtual
        }

        var dataUpdate = {
            "id": idValue,
            "nome_completo": refNomeCompleto.current.value,
            "nome_reserva": refNomeReserva.current.value,
            "nome_cracha": refNomeCracha.current.value,
            "genero": refGenero.current.value,
            "estado_civil": refEstadoCivil.current.value,
            "dt_nascimento": dataFormatada,
            "nac_id_pais": idCorrespondente,
            "nacionalidade": refNacionalidade.current.value,
            "estrangeira": refEstrangeira.current.checked,
            "cpf": refCPF.current.value,
            "rg": refRG.current.value,
            "fornecedor": false,
            "notificacao": false,
            "situacao": true,
            "inc_usuario": 1,
            "inc_dhsis": incEdit,
            "alt_usuario": 0,
            "alt_dhsis": altEdit
        }

        if (idValue===''){
            const Salvando = await SalvarPF(data)
            if(Salvando.msgerro==="Classe    - EMSSQLNativeException\rDescrição - [FireDAC][Phys][ODBC][Microsoft][SQL Server Native Client 11.0][SQL Server]Nome de objeto 'PROSERVICO' inválido."){
                setMsgsucess(true)
                setListaPFatualizada(true)
                setaddnew(true)
                //aparecer
                window.document.getElementById('ContedeuListPF').style.display='flex'
                window.document.getElementById('BTNsTopPF').style.display='flex'
                //desaparecer
                window.document.getElementById('FormFicha').style.display='none'
                window.document.getElementById('Form-AddContatos').style.display='none'
                window.document.getElementById('InfoAreaPF').style.display='none'
                window.document.getElementById('Form-DadosPessoais').style.display='none'
                //configurações
                window.document.getElementById('Form-DadosPessoais').style.marginBottom=""
            }else{
                setMsgerro(Salvando.msgerro)
            }
        }else{
            const SalvandoUp = await SalvarPF(dataUpdate)
            if(SalvandoUp.msgerro==="Classe    - EMSSQLNativeException\rDescrição - [FireDAC][Phys][ODBC][Microsoft][SQL Server Native Client 11.0][SQL Server]Nome de objeto 'PROSERVICO' inválido."){
                setMsgsucess(true)
                setListaPFatualizada(true)
                setaddup(true)
                //aparecer
                window.document.getElementById('ContedeuListPF').style.display='flex'
                window.document.getElementById('BTNsTopPF').style.display='flex'
                //desaparecer
                window.document.getElementById('FormFicha').style.display='none'
                window.document.getElementById('Form-AddContatos').style.display='none'
                window.document.getElementById('InfoAreaPF').style.display='none'
                window.document.getElementById('Form-DadosPessoais').style.display='none'
                //configurações
                window.document.getElementById('Form-DadosPessoais').style.marginBottom=""
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

    const ExcluiContato = async (element) => {
        setconfirmVisivelContato(true)
        setarrayConfirmContato(element)
    }

    function excluir (element){
        setListaPF(prevPaises => prevPaises.filter(pais => pais.id !== element.id))
        setListaPFfiltro(prevarrayFiltro => prevarrayFiltro.filter(pais => pais.id !== element.id))
    }

    function excluirContato (element){
        setListaContatos(prevPaises => prevPaises.filter(pais => pais.id !== element.id))    
    }

    function fecharConfirm () {
        setconfirmVisivel(false)
    }

    function fecharConfirmContato () {
        setconfirmVisivelContato(false)
    }

    function mensagemErro (element) {
        setMsgerro(element.msgerro)
    }

    function mensagemErroContato (element) {
        setMsgerro(element.msgerro)
    }

    //relacionada aos contatos em geral, tabela, forms etc..

    function showContatosAdd () {
        setidValueFicha('')
        //aparecer
        window.document.getElementById('Form-AddContatos').style.display="flex"
        //desaparecer
        window.document.getElementById('Form-DadosPessoais').style.display="none"
        window.document.getElementById('FormFicha').style.display="none"
        window.document.getElementById('Form-FilterPF').style.display="none"

        //configs de tamanho
        window.document.getElementById('ContatoListPF').style.height="20rem"

    }

    async function saveContato (e) {
        e.preventDefault()
        var data = {
            "id": 0,
            "id_pfisica": idValueContato,
            "id_pjuridica": 0,
            "nome": NomeContato,
            "tipo": contatosTipo.current.value,
            "endereco": contatosEndere.current.value,
            "descricao": contatosDescri.current.value,
            "pad_comercial": true,
            "pad_financeiro": true,
            "inc_usuario": 0,
            "inc_dusuario": "ADMINISTRADOR",
            "inc_dhsis": "2024-07-17T12:00:00.000Z",
            "alt_usuario": 0,
            "alt_dusuario": "ADMINISTRADOR",
            "alt_dhsis": "2024-07-17T12:00:00.000Z"
        }

        var data2 = {
            "id": idValueFicha,
            "id_pfisica": idValueContato,
            "id_pjuridica": 0,
            "nome": NomeContato,
            "tipo": contatosTipo.current.value,
            "endereco": contatosEndere.current.value,
            "descricao": contatosDescri.current.value,
            "pad_comercial": true,
            "pad_financeiro": true,
            "inc_usuario": 0,
            "inc_dusuario": "ADMINISTRADOR",
            "inc_dhsis": inc,
            "alt_usuario": 0,
            "alt_dusuario": "ADMINISTRADOR",
            "alt_dhsis": alt
        }

        if (idValueFicha===''){
            var save = await SalvarContatoPF(data)
            if (save.msgerro===""){
                setMsgsucess(true)
                //aparecer
                window.document.getElementById('ContedeuListPF').style.display='flex'
                window.document.getElementById('BTNsTopPF').style.display='flex'
                //desaparecer
                window.document.getElementById('FormFicha').style.display='none'
                window.document.getElementById('Form-AddContatos').style.display='none'
                window.document.getElementById('InfoAreaPF').style.display='none'
                //configs de tamanho
                window.document.getElementById('ContatoListPF').style.height="15rem"
            }else{
                setMsgerro(save.msgerro)
            }
        }else{
            var save2 = await SalvarContatoPF(data2)
            if (save2.msgerro===""){
                setMsgsucess(true)
                //aparecer
                window.document.getElementById('ContedeuListPF').style.display='flex'
                window.document.getElementById('BTNsTopPF').style.display='flex'
                //desaparecer
                window.document.getElementById('FormFicha').style.display='none'
                window.document.getElementById('Form-AddContatos').style.display='none'
                window.document.getElementById('InfoAreaPF').style.display='none'
                //configs de tamanho
                window.document.getElementById('ContatoListPF').style.height="15rem"
            }else{
                setMsgerro(save2.msgerro)
            }
        }
    }

    function FecharContatoForm (e) {
        e.preventDefault()
        //aparecer   
        window.document.getElementById('ContedeuListPF').style.display="flex"
        window.document.getElementById('BTNsTopPF').style.display="flex"    
        //desaparecer
        window.document.getElementById('Form-AddContatos').style.display="none" 
        window.document.getElementById('InfoAreaPF').style.display='none'
        //configs de tamanho
        window.document.getElementById('ContatoListPF').style.height="15rem"
    }

    return(
        <div id="Tela-PFCadaastro">
            <NavBar/>
            <AlertE error ={msgerro} handleError={handleError}/>
            <AlertS success={msgsucess} handleSuccess={handleSuccess}/>
            <MsgConfirmPF estado ={confirmVisivel} estadoF ={fecharConfirm} element={arrayConfirm} error = {mensagemErro} excluir ={excluir}/>
            <MsgConfirmPFcontato estado={confirmVisivelContato} estadoF={fecharConfirmContato} element={arrayConfirmContato} error={mensagemErroContato} excluir={excluirContato}/>
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
                            <button onClick={fecharFicha}><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                    </form>
                    <form id="Form-AddContatos">
                        <p><i>Selecionar Informações</i></p>
                        <div id="DivContatosAdd">
                            <div id="secInputsContatos">                                
                                <fieldset id="fieldContatosTipo">
                                    <label>Tipo</label>
                                    <select name="Situacao" id="OpTipoPF" ref={contatosTipo}>
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
                                    <input type="text" ref={contatosEndere}/>
                                </fieldset>
                                <fieldset id="FieldContatosDescri">
                                    <label>Descrição</label>
                                    <input type="text" ref={contatosDescri}/>
                                </fieldset>                              
                            </div>
                            <div id="BTNsContatosPF">
                                <button onClick={saveContato}><FontAwesomeIcon icon={faCheck} /></button>
                                <button onClick={FecharContatoForm}><FontAwesomeIcon icon={faXmark} /></button>
                            </div>
                        </div>
                    </form>
                    <div id="ContatoListPF">
                        <div id="HudContatoPF">
                            <ul>
                                <li id="hudTipo">Tipo</li>
                                <li id="hudEndere">Endereço</li>
                                <li id="hudDescri">Descrição</li>
                                <li id="hudAdd" onClick={showContatosAdd}><FontAwesomeIcon icon={faPlus} id="addhud"/></li>
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
                                                    <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={()=>{editContato(ct.id)}}/>
                                                    <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais" onClick={()=>{ExcluiContato(ct)}}/>
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
                    {imageBase64 && (
                        <div id="secImg">
                            <img src={imageBase64} alt="Imagem de perfil" id="ImgPerfil" />
                            <p><b>Perfil</b></p>
                        </div>
                    )}
                    <input type="file" id="uploadBtn" accept="image/jpeg" onChange={handleFileChange} ref={fileInputRef} />
                    <label htmlFor="uploadBtn" id="LabelUpload">
                        <FontAwesomeIcon icon={faUpload} /> Upload File
                    </label>
                    <div id="BtnsImgPerfil">
                        <button onClick={limparFoto}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
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
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={()=>{ficha(pf.id); editIMG(pf.id);}}/>
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={() => {edit(pf.id); editIMG(pf.id);}}/>
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
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais" onClick={()=>{ficha(pf.id); editIMG(pf.id);}}/>
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais" onClick={() => {edit(pf.id); editIMG(pf.id);}}/>
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