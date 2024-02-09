import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"




function Login ({loginCadastro, senhaCadastro}) {

    const Ref1 = useRef()
    const Ref2 = useRef()
    const navegate = useNavigate()

    const Cadastrar = (e) => {
        e.preventDefault()
        navegate('/Cadastro')
    }
    
    const Validation = (e)=>{
        
        e.preventDefault()
        const valueLogin = Ref1.current.value
        const valorSenha = Ref2.current.value
        
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
                <button type="button" className="LoginBTN" id="CadastroBTN" onClick={Cadastrar}>Cadastre-se</button>
            </form> 
        </div>
    )
}

export default Login