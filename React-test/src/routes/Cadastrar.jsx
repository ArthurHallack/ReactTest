import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function SingIn() {

    const [loginCadastro, setLoginCadastro] = useState("")
    const [senhaCadastro, setSenhaCadastro] = useState("")
    const RefCadastro1 = useRef()
    const RefCadastro2 = useRef()
    const RefCadastro3 = useRef()
    const navigate = useNavigate()

    const Gravar = (e) => {
        e.preventDefault()
        var Usuario = RefCadastro1.current.value
        var confirmacao = RefCadastro2.current.value
        var Senha = RefCadastro3.current.value
        if (Senha === confirmacao) {
            setLoginCadastro(Usuario)
            setSenhaCadastro(Senha)
            navigate('/')
        } else {
            alert("Confirmação de senha incorreta")
        }
    };

    const getLoginSenha = () => {
        return { loginCadastro, senhaCadastro };
      };

    return (
        <form>
            <label>Usuário</label>
            <input type="text" ref={RefCadastro1} />
            <label>Senha</label>
            <input type="password" ref={RefCadastro2} />
            <label>Confirme sua Senha</label>
            <input type="password" ref={RefCadastro3} />
            <button type="submit" onClick={Gravar}>Cadastrar</button>
        </form>
    );
}

export default SingIn
