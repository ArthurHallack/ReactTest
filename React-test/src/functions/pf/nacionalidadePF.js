export async function NaciPesquisa(data) {
    const Caminho = `http://remote.integrasis.com.br:8082/datasnap/rest/TsmPAIS/PESQUISA/NACIONALIDADE/${data}`;
    const Username = 'INTEGRASIS';
    const PassWord = '32P@&sB@rr0S';
    const BasicAuth = 'Basic ' + btoa(Username + ':' + PassWord);

    try {
        const response = await fetch(Caminho, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BasicAuth
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.statusText}`);
        }

        const dadosPesquisa = await response.json();
        return dadosPesquisa;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}
