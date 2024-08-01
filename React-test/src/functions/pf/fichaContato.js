export async function FichaPFcontato (id) {

    let url = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmRCONTATO/FICHA/${id}`
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

    try{
        const dados = await fetch (url,{
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