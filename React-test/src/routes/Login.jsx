import React, { useRef, useState, useHistory } from "react";
import Modal from "../modals/ModalLogin";



function Login () {

    const Ref1 = useRef()
    const Ref2 = useRef()
    const [ModalOpen, setModalOpen] = useState (false)
    const [UserName, setUserName]= useState ("")
    const [Senha, setSenha]= useState ("")

    const Validation = (e)=>{
        
        e.preventDefault()
        const valueLogin = Ref1.current.value
        const valorSenha = Ref2.current.value
        console.log (UserName)
        console.log(Senha)
    }

    const OpenModal = ()=>{
        setModalOpen(true)
    }

    return(
        <div id="Container-Login">
            <form id="Form-Login">
                <h1 id="H1Login">Login</h1>
                <label htmlFor="" className="LabelLogin">Usuario</label>
                <input type="text" className="InputLogin" ref={Ref1}/>
                <label className="LabelLogin">Senha</label>
                <input type="password" className="InputLogin" ref={Ref2}/>
                <button type="submit" className="LoginBTN" onClick={Validation}>Login</button>
                <button type="button" className="LoginBTN" id="CadastroBTN" onClick={OpenModal}>Cadastrar</button>
            </form>
            <Modal display={ModalOpen ? "flex" : "none"} /> 
        </div>
    )
}

export default Login