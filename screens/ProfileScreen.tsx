import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Button } from 'react-native-elements'

import { Text, View } from '../components/Themed'
import { User } from '../types'
import { List } from '../components/List/List'

export default function TabProfileScreen({ setToken }: any) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const tokenString: AuthToken = JSON.parse(await AsyncStorage.getItem('token'))
    if (tokenString) {
      const usr: User = await List(
        '/users/' + tokenString.id,
        `${tokenString.tokenType} ${tokenString.accessToken}`
      )
      console.log(`Recuperando usuário no BE`)

      setUser(usr != null ? usr : undefined)
    } else {
      alert('erro ao carregar Usuário')
    }
  }
  const logOut = () => {
    AsyncStorage.removeItem('token')
    setToken()
    alert('Desconectado com sucesso')
    // window.location.reload()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Mensagens</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>
        Área destinada ao perfil do usuário: {user?.name} {user?.surname}
      </Text>

      <Button
        title="Log out"
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: 'rgba(101, 102, 186, 1)',
          borderRadius: 25
        }}
        titleStyle={{ fontWeight: '200', fontSize: 23, color: 'black' }}
        containerStyle={{
          marginHorizontal: 30,
          height: 50,
          width: 250,
          marginVertical: 10
        }}
        onPress={() => logOut()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
