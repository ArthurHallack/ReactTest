async function Cadastrar (data) {
    var url = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmUSUARIO/GRAVA'
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

    var dados = await fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'aplication/json',
            'Authorization': BasicAuth
        },
        body: JSON.stringify(data)
    })

    const dadosJson = await dados.json();
    return dadosJson
    
}