import React from "react"

function PaisCrud () {
    return (
        <div>
            <h1>Pais</h1>
            <form action="" method="post">
                <h1>Selecionar Informações</h1>
                <label htmlFor="">Pais</label>
                <input type="text" />
                <label htmlFor="">Sigla</label>
                <input type="text" />
                <label htmlFor="">Nacionalidade</label>
                <input type="text" />
                <label htmlFor="">Situação</label>
                <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                <label htmlFor="">Atualização Maior que</label>
                <input type="date" />
                <label htmlFor="">Atualização Menor que</label>
                <input type="date" />

                <button>Fechar</button>
                <button>Limpar</button>
                <button>Filtrar</button>
            </form>
            <div>
                
            </div>
        </div>
    )
}