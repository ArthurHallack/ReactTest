import React, { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faBroom, faPlus, faCheck, faTrash, faPenToSquare, faFolderOpen, faXmark } from "@fortawesome/free-solid-svg-icons"
import NavBar from "../components/Nav"
import { AlertS, AlertE } from "../components/Msg";
import { GetAllPF } from "../functions/pf/getAllPF";

import '../css/routes.css/PFCadastro.css'

function PFCadastro () {

    //estados

    const [ListaPF, setListaPF] = useState ([])//lista principal sendo renderizada
    const [ListaPFfiltro, setListaPFfiltro] = useState ([])//lista do filtro sendo renderizada

    //Effects

    useEffect(()=>{
        async function fetchData () {
            const data = await GetAllPF()
            setListaPF(data)
        }
        fetchData()
    },[])

    return(
        <div id="Tela-PFCadaastro">
            <NavBar/>
            <AlertE/>
            <AlertS/>
            <div id="SecTop-PF">
                <h1>Pessoa Fisica</h1>
                <div id="BTNsTopPF">
                    <button><FontAwesomeIcon icon={faPlus} /></button>
                    <button><FontAwesomeIcon icon={faFilter} /></button>
                </div>
            </div>
            <div id="InfoAreaPF">
                <form id="Form-DadosPessoais">
                    <div>
                        <p><i>Selecionar Informações</i></p>

                    </div>
                    <div id="CamposFormPF-DP">
                        <div id="CamposNomePF-DP">
                            <fieldset className="FieldDadosPessoais nomesPF-DP">
                                <label>Nome Completo</label>
                                <input type="text" />
                            </fieldset>
                            <fieldset className="FieldDadosPessoais nomesPF-DP">
                                <label>Nome p/ reserva</label>
                                <input type="text" />
                            </fieldset >
                            <fieldset className="FieldDadosPessoais nomesPF-DP">
                                <label>Nome p/ crachá</label>
                                <input type="text" />
                            </fieldset>
                        </div>
                        <div id="CamposOutrosPF-DP">
                            <fieldset className="FieldDadosPessoais outrosPF-DP"> 
                                <label>RG</label>
                                <input type="text" />
                            </fieldset>
                            <fieldset className="FieldDadosPessoais outrosPF-DP">
                                <label>CPF</label>
                                <input type="text" />
                            </fieldset>
                            <fieldset className="FieldDadosPessoais outrosPF-DP">
                                <label>Nacionalidade</label>
                                <input type="text" />
                            </fieldset>
                        </div>
                        <div id="CamposMenoresPF-DP">
                            <fieldset className="FieldDadosPessoais menoresPF-DP">
                                <label>Data de Nascimento</label>
                                <input type="date" id="DataInputPF-DP"/>
                            </fieldset>
                            <fieldset className="FieldDadosPessoais menoresPF-DP">
                                <label>Estado Civil</label>
                                <select name="Situacao" id="OpCivilPF">
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
                                <select name="Situacao" id="OpGeneroPF">
                                        <option value="">Selecionar</option>
                                        <option value="1">MASCULINO</option>
                                        <option value="2">FEMININO</option>
                                        <option value="3">OUTROS</option>
                                </select>
                            </fieldset>
                            <fieldset className="CheckPF-DP">
                                <label>Fornecedor</label>
                                <div>
                                    <input type="checkbox" />
                                    <p>Sim</p>
                                </div>                            
                            </fieldset>
                            <fieldset className="CheckPF-DP">
                                <label>Estrangeira</label>
                                <div>
                                    <input type="checkbox" />
                                    <p>Sim</p>
                                </div>
                            </fieldset>
                            <fieldset className="CheckPF-DP">
                                <label>Notificação</label>
                                <div>
                                    <input type="checkbox" />
                                    <p>Sim, receber</p>
                                </div>
                            </fieldset>
                            <fieldset className="CheckPF-DP">
                                <label>Situação</label>
                                <div>
                                    <input type="checkbox" />
                                    <p>Ativo</p>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div id="BTNsDadosPessoais">
                        <button><FontAwesomeIcon icon={faCheck} /></button>
                        <button><FontAwesomeIcon icon={faXmark}/></button>
                    </div>
                </form>
                <div id="AreaImgPF">
                    <img src="" alt="" />
                    <input type="file" placeholder="" />
                </div>
            </div>
            <form id="Form-FilterPF">
                <p><i>Selecionar Informações</i></p>
                <div id="DivFiltroPF">
                    <div id="secInputsFiltro">
                        <fieldset>
                            <label>Nome Completo</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset>
                            <label>CPF</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset>
                            <label>Gênero</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset>
                            <label>Situação</label>
                            <select name="Situacao" id="OpSituacaoPF">
                                    <option value="">Selecionar</option>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                            </select>
                        </fieldset>
                    </div>
                    <div id="BTNsFiltroPF">
                        <button><FontAwesomeIcon icon={faFilter} /></button>
                        <button><FontAwesomeIcon icon={faBroom} /></button>
                        <button><FontAwesomeIcon icon={faXmark}/></button>
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
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais"/>
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais"/>
                                            <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais"/>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div id="Table-PF2">
                            {ListaPFfiltro.map((pf, index)=>(
                                <ul key={pf.id} className={`Todo-List-PF ${pf.hidden ? 'hidden' : ''} ${pf.situacao ? 'red-list' : ''}`}>
                                    <li className="Todo-List-li id-tdListPF">{pf.id}</li>
                                    <li className="Todo-List-li NC-tdListPF">{pf.nome_completo}</li>
                                    <li className="Todo-List-li NR-tdListPF">{pf.nome_reserva}</li>
                                    <li className="li-td-btn">
                                        <div className="BTNs-tdList">
                                            <FontAwesomeIcon icon={faFolderOpen} className="BTN-ReadPais BTNtd-Pais"/>
                                            <FontAwesomeIcon icon={faPenToSquare} className="BTN-EditPais BTNtd-Pais"/>
                                            <FontAwesomeIcon icon={faTrash} className="BTN-ExcluiPais BTNtd-Pais"/>
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