
let idEndPoint = '1'
let ApiGetPais = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/FICHA/${idEndPoint}`

export async function GetPais () {
  const Username = 'INTEGRASIS';
  const PassWord = '32P@&sB@rr0S';
  const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

  try{
    const dados = await fetch(ApiGetPais, {
      method: 'GET',
      headers: {
            'Content-Type': 'application/json',
            'Authorization': BasicAuth
        },
        
    })
    if (!dados.ok) {
      throw new Error('Erro ao enviar dados para a API');
  }
      const dadosJson = await dados.json();
      console.log(dadosJson);

      idEndPoint++
      ApiGetPais = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/FICHA/${idEndPoint}`
      
  }catch (error){

    console.error('Erro:', error)

  }
}