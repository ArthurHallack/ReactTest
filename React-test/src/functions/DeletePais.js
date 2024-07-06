 

export async function ApiDelete (id) {
    let ApiDeletePais = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/EXCLUI/${id}`
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

    try {
        const dados = await fetch(ApiDeletePais, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BasicAuth
            },
        })
        
        const dadosjson = await dados.json()
        return dadosjson
    }catch (error){
        console.error('Erro:', error)
    }
}