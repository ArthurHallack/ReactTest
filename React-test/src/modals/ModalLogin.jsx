import React, { useRef } from "react";

function Modal ({display, setUserName, setSenha}) {

    const value1 = useRef()
    const value2 = useRef()

    const CadastroCreate = (e)=>{
        e.preventDefault()
        const ValorLogin = value1.current.value
        const ValorSenha = value2.current.value
        setUserName(ValorLogin)
        setSenha(ValorSenha)

    }

    return(
        <div id="ModalLogin" style={{display: display}}>
            <label>Usuario</label>
            <input type="text" ref={value1}/>
            <label>Senha</label>
            <input type="password" ref={value2}/>
            <button type="button" onClick={CadastroCreate}>Cadastrar</button>
        </div>
    )
}

export default Modal