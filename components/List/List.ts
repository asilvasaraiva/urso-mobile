import AxiosRequest from "../../src/utils/AxiosRequest"

export const List = async (PATH: string|any, AUTH = '') => {
  try {
    return  (await AxiosRequest.get(PATH, { headers: { Authorization: AUTH } })).data    
  } catch (error:any) {
    console.log("erro ao recuperar dados da api, fazendo a chamada: ", PATH)  
  }  
}
