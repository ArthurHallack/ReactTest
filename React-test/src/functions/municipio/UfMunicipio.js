export async function UfList () {
    let ApiUf = 'http://remote.integrasis.com.br:8082/datasnap/rest/Tsmsistema/uf_tabela'

    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

    try{
        var dados = await fetch(ApiUf,{
            method: 'GET',
            headers: {
                'content-type': 'aplication/json',
                'Authorization': BasicAuth
            },
        })
        const dadosUf = await dados.json()
        return dadosUf

    }catch(error){

        alert.error('Erro:', error)

    }
}