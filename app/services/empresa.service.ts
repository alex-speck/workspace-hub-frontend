import axios from "axios";

export async function buscarDadosCnpj(cnpj: string) {
    try {
        debugger;
        const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        if(response.status === 200){
            return response.data;
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }

        console.error(error);
    }
}