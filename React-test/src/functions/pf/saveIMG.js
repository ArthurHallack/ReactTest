export async function SaveImgPF(img) {
    let URL = 'http://remote.integrasis.com.br:8082/datasnap/rest/TsmPFISICA/FOTO_GRAVA'
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord)

    try{
        var dados = await fetch(URL, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': BasicAuth
            },
            body: JSON.stringify(img)
        })

        const dadosJson = await dados.json();
        return dadosJson

    }catch (error) {
        console.log(error)
    }
}