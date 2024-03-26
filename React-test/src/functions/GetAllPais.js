let urlApi = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/PAGINA'

export async function GetAll () {
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);
    const Corpo = {}

    try{
        const dados = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'content-type': 'aplication/json',
                'Authorization': BasicAuth    
            },
            body: JSON.stringify(Corpo)
        })

        const dadosjson = await dados.json()
        return dadosjson

    }catch(error){

        alert.error('Erro:', error)
    }
}