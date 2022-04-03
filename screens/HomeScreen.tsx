import { ImageBackground, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from '../components/Themed'
import { AuthToken, RootTabScreenProps, User } from '../types'
import { List } from '../components/List/List'
import { Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'

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
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(34, 193, 195, 1)', 'rgba(253, 187, 45, 1)']}
        style={styles.bodyScreenBackGround}
      />

      <ImageBackground
        source={require('../assets/images/urso-bg.png')}
        imageStyle={{ resizeMode: 'contain', opacity: 0.4 }}
        style={{ width: 400, height: 400 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Pagina Inicial </Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.LabelsTitle}>
            Seja Bem vindo <Text>{user?.name}</Text>{' '}
          </Text>
        </View>
      </ImageBackground>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -30,
    bottom: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  LabelsTitle: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    color: 'rgba(0,0,0,0.5)'
  }
})

//center,contain,cover, repeat, stretch
