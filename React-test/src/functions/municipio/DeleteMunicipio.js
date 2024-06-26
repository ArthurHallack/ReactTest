export async function ApiDeleteMunicipio (id) {
    let ApiDeletePais = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmMUNICIPIO/EXCLUI/${id}`
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
        if (!dados.ok){

            throw new Error('Erro ao enviar dados para a API')
        }else {
            console.log ("Dados deletados com sucesso!")
        }
    }catch (error){
        console.error('Erro:', error)
    }
}