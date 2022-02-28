import AxiosRequest from "../../src/utils/AxiosRequest"

export const List = async (PATH: string, AUTH = '') => {
  const usr = await AxiosRequest.get(PATH, { headers: { Authorization: AUTH } })
  if (usr) {
    return usr.data
  } else {
    return null
  }
}
