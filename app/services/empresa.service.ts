import axios from "axios";

export async function buscarDadosCnpj(cnpj: string) {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        if(response.status === 200){
            return response.data;
        }

        throw new Error(response.data);
    } catch (error) {
        console.error(error);
    }
}