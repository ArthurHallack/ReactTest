import React from "react";
import { useRef } from "react";




function Login () {

    const Ref1 = useRef()
    const Ref2 = useRef()
    const Value1 = Ref1.current.value
    const Value2 = Ref2.current.value

    const Validation = (Value1, Value2)=>{
        
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
                <button type="button" className="LoginBTN" id="CadastroBTN">Cadastrar</button>
            </form>
        </div>
    )
}

export default Login