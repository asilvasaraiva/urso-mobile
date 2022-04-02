import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getRawToken() {
  try {
    // return  await AsyncStorage.getItem('token').then(res=>console.log(JSON.parse(res)));
    const myToken: any = await AsyncStorage.getItem('token')
    return myToken.data != undefined ? JSON.parse(myToken) : null
  } catch (error) {
    console.log('Erro ao carregar token')
    return null
  }
}

export const retrieveToken = async () => {
  try {
    let userToken = JSON.parse(await AsyncStorage.getItem('token'))
    return `${userToken.tokenType} ${userToken.accessToken}`
  } catch (error) {
    console.log('Erro ao carregar token')
    return null
  }
}

export const calculaIdade = (nascimento: any) => {
  let nasc = new Date(nascimento)
  let hoje = new Date(Date.now())
  return Math.floor(
    Math.ceil(Math.abs(nasc.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25
  )
}
