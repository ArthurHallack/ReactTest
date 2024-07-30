export async function ContatosGet (data) {
    var url = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmRCONTATO/PAGINA'
    const Username = 'INTEGRASIS'
    const PassWord = '32P@&sB@rr0S'
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord)

    try{
        const dados = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'aplication/json',
                'Authorization': BasicAuth
            },
            body: JSON.stringify(data)
        })

        const dadosjson = dados
        return dadosjson

    }catch(error){

        console.error('Erro:', error)

    }
}