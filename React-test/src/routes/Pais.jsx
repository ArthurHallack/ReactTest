import React from "react";

function PaisCrud() {
    return (
        <div id="Tela-Pais">
            <h1>Pais</h1>
            <div id="Form-Pais-ADD">
                <p><i>Selecionar Informações</i></p>
                <div id="Form-Pais-ADD2">
                    <form action="" method="post" id="FormPais">
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Pais</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Sigla</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Nacionalidade</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Bacen</label>
                            <input type="text" />
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">DDI</label>
                            <input type="number" />
                        </fieldset>
                        <fieldset className="Fieldset-Pais-Form">
                            <label htmlFor="">Situação</label>
                            <input type="checkbox" /> Ativo
                        </fieldset>
                    </form>
                    <button type="submit">Salvar</button>
                </div>
            </div>
            <div id="Div-Form-Pais-Conteudo">
                <div id="Conteudo-Pais-Container">
                    <div className="Td-List">
                        <h1>1</h1>
                        <h1>br</h1>
                        <h1>brasil</h1>
                        <h1>nacionalidade</h1>
                        <button>visu</button>
                        <button>editar</button>
                        <button>excluir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaisCrud;