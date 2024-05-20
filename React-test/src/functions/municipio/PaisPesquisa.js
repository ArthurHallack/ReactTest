
export async function PaisPesquisa (Data) {

    const Caminho = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/PESQUISA/PAIS/${Data}`
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

    try{
        const dados = await fetch (Caminho,{
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': BasicAuth
                },
        })

        const dadosPesquisa = await dados.json()
        return dadosPesquisa

    }catch(error){
        alert.error('Erro:', error)
    }
}