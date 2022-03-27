import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from '../components/Themed'
import { AuthToken, RootTabScreenProps, User } from '../types'
import { List } from '../components/List/List'
import { Button } from 'react-native-elements'

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabInicio'>) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const tokenString: AuthToken = JSON.parse(await AsyncStorage.getItem('token'))
    if (tokenString) {
      const usr: User = await List(
        '/users/' + tokenString.id,
        `${tokenString.tokenType} ${tokenString.accessToken}`
      )
      console.log(`Recuperando usuário no BE`)
      console.log(usr)

      if (usr) {
        console.log('usr')
        console.log(usr)
        setUser(usr)
      }
    } else {
      alert('erro ao carregar Usuário')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagina Inicial </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Seja Bem vindo {user?.name} </Text>

      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
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
