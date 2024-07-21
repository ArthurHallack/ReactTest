import React, { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"
import { faPlus, faDatabase, faPenToSquare, faUnlock } from "@fortawesome/free-solid-svg-icons"

import '../css/componentes.css/userNav.css'

function UserNav ({add, addF, addT, data, dataT, dataF, permi, permiT, permiF, estado, fechar, listaT, listaF}) {

    //add é se o form add esta sendo exibido 
    //addF função que seta add como false
    //addT função que seta add como true
    //data é se o form data esta sendo exibido
    //dataT função que seta data como true
    //dataF função que seta data como false
    //permi estado atual do form permissões
    //permiT função que seta Permi como True
    //permiF função que seta Permi como false
    //estado é o estado desse componente 
    //fechar é uma finção que serve para fechar esse componente
    //listaT função que seta o estado da lista como true
    //listaT função que seta o estado da lista como false

    //effects
    useEffect(()=>{
        if(add===true){
            //em destaque
            window.document.getElementById('add').style.backgroundColor="#161622"
            window.document.getElementById('add').style.color="white"
            window.document.getElementById('add').style.border="1px solid #ffff"
            //apagados
            window.document.getElementById('permi').style.backgroundColor=""
            window.document.getElementById('permi').style.color=""
            window.document.getElementById('permi').style.border="1px double"

            window.document.getElementById('edit').style.backgroundColor=""
            window.document.getElementById('edit').style.color=""
            window.document.getElementById('edit').style.border="1px double"

            window.document.getElementById('data').style.backgroundColor=""
            window.document.getElementById('data').style.color=""
            window.document.getElementById('data').style.border="1px double"
        }
    },[add])// faz o btn add ficar em destaque 

    useEffect(()=>{
        if(data===true){
            addF()
            //em destaque
            window.document.getElementById('data').style.backgroundColor="#161622"
            window.document.getElementById('data').style.color="white"
            window.document.getElementById('data').style.border="1px solid #ffff"
            //apagados
            window.document.getElementById('add').style.backgroundColor=""
            window.document.getElementById('add').style.color=""
            window.document.getElementById('add').style.border="1px double"

            window.document.getElementById('permi').style.backgroundColor=""
            window.document.getElementById('permi').style.color=""
            window.document.getElementById('permi').style.border="1px double"

            window.document.getElementById('edit').style.backgroundColor=""
            window.document.getElementById('edit').style.color=""
            window.document.getElementById('edit').style.border="1px double"
            
            
        }
    },[data])//faz o btn data ficar em destaque 

    useEffect(()=>{
        if(permi===true){
            //em destaque
            window.document.getElementById('permi').style.backgroundColor="#161622"
            window.document.getElementById('permi').style.color="white"
            window.document.getElementById('permi').style.border="1px solid #ffff"
            //apagados

            window.document.getElementById('add').style.backgroundColor=""
            window.document.getElementById('add').style.color=""
            window.document.getElementById('add').style.border="1px double"

            window.document.getElementById('data').style.backgroundColor=""
            window.document.getElementById('data').style.color=""
            window.document.getElementById('data').style.border="1px double"

            window.document.getElementById('edit').style.backgroundColor=""
            window.document.getElementById('edit').style.color=""
            window.document.getElementById('edit').style.border="1px double"
        }
    },[permi])

    useEffect(()=>{
        if(estado===true){
            window.document.getElementById('navUser').style.display="flex"
        }else {
            window.document.getElementById('navUser').style.display="none"
        }
    },[estado])//faz o componente aparecer e desaparecer se o estado for true ou false

    //functions
    function home () {
        fechar()
        listaT()
        dataF()
        addF()
        permiF()
    }// fecha e traz a lista de volta

    function dataBTN () {
        dataT()
        addF()
        permiF()
    }

    function addBTN () {
        addT()
        dataF()
        permiF()
    }

    function permiBTN () {
        permiT()
        dataF()
        addF()
    }

    function editBTN () {

    }


    return(
        <div id="navUser">
            <div id="home" className="navItem" onClick={home}><FontAwesomeIcon icon={faHouseChimney} /></div>
            <div className="space"></div>
            <div id="add" className="navItem" onClick={addBTN}><FontAwesomeIcon icon={faPlus} /></div>
            <div className="space"></div>
            <div id="data" className="navItem" onClick={dataBTN}><FontAwesomeIcon icon={faDatabase} /></div>
            <div className="space"></div>
            <div id="permi" className="navItem" onClick={permiBTN}><FontAwesomeIcon icon={faUnlock} /></div>
            <div className="space"></div>
            <div id="edit" className="navItem" onClick={editBTN}><FontAwesomeIcon icon={faPenToSquare} /></div>
        </div>
    )
}

export default UserNav