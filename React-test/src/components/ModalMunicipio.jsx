import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function ModalMunicipio ({ fecharModal, dados, idElement }) {
    // FUNÇÕES DE ABRIR E FECHAR
    const [modalAberto, setModalAberto] = useState(true);
    const [array, setArray] = useState([]);
    const [id, setId] = useState('');
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const CloseModal = () => {
        fecharModal();
    };

    const toggleModal = () => {
        setModalAberto(!modalAberto);
    };

    // FUNÇÃO PARA FORMATAR OS DADOS
    const dadosArray = () => {
        const formattedArray = dados.map(item => {
            return {
                id: item.id,
                pais: item.pais,
                municipio: item.municipio,
                UF: item.uf,
                DDD: item.ddd,
                IBGE: item.ibge,
                situacao: item.situacao
            };
        });
        console.log("Formatted Array:", formattedArray); // Adicionado para depuração
        setArray(formattedArray);
    };

    // CHAMADA DA FUNÇÃO DE FORMATAÇÃO DE DADOS
    useEffect(() => {
        dadosArray(); // Chamar a função dadosArray para formatar os dados
    }, [dados]);

    // ATUALIZAR O ITEM SELECIONADO QUANDO O ID MUDAR
    useEffect(() => {
        const itemEncontrado = array.find(item => item.id === idElement);
        console.log("Item Encontrado:", itemEncontrado); // Adicionado para depuração
        setItemSelecionado(itemEncontrado);
    }, [idElement, array]);

    return (
        <div className="ModalPais" style={{ display: modalAberto ? "block" : "none" }}>
            <div className="ModalTop">
                <span>
                    <i>consulta</i>
                    <h1>Pais</h1>
                </span>
                <FontAwesomeIcon icon={faXmark} onClick={CloseModal} />
            </div>
            <div className="ModalPais-conteudo">
                {itemSelecionado && (
                    <ul>
                        <li>id: {itemSelecionado.id}</li>
                        <li>Pais: {itemSelecionado.pais}</li>
                        <li>Municipio: {itemSelecionado.municipio}</li>
                        <li>UF: {itemSelecionado.UF}</li>
                        <li>DDD: {itemSelecionado.DDD}</li>
                        <li>IBGE: {itemSelecionado.IBGE}</li>
                        <li>Situação: {itemSelecionado.situacao ? 'Ativo' : 'Inativo'}</li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ModalMunicipio;