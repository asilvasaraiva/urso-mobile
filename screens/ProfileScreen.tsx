import { StyleSheet, Pressable, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { Text, View } from '../components/Themed'
import { AuthToken, User } from '../types'
import { List } from '../components/List/List'
import { LinearGradient } from 'expo-linear-gradient'
import ModalResetPassword from './Modal/ModalResetPassword'
import { calculaIdade } from '../src/utils/Utils'

export default function TabProfileScreen({ setToken }: any) {
  const [user, setUser] = useState<User>()

  const navigation = useNavigation()

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
  const logOut = () => {
    AsyncStorage.removeItem('token')
    setToken()
    alert('Desconectado com sucesso')
    // window.location.reload()
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(34, 193, 195, 1)', 'rgba(253, 187, 45, 1)']}
        style={styles.bodyScreenBackGround}
      >
        <ScrollView>
          <View style={styles.bodyHeader}>
            <Text style={styles.LabelsTitle}>
              Nome:{' '}
              <Text>
                {user?.name} {user?.surname}
              </Text>
            </Text>
            <Text style={styles.LabelsTitle}>
              Email (login): <Text>{user?.email}</Text>
            </Text>
            <Text style={styles.LabelsTitle}>
              Idade: <Text>{user?.birth ? calculaIdade(user.birth) : 'não informado'}</Text>
            </Text>
            <Text style={styles.LabelsTitle}>
              Primeiro Login: <Text>{user?.joinDate ? user.joinDate : 'não informado'}</Text>
            </Text>
          </View>
          <View style={styles.bodyPanel}>
            <Text style={styles.title}>Configurações </Text>
            <View style={styles.PanelContent}>
              <Button
                title="Notificações e Depoimentos"
                loadingProps={styles.ButtonTitleStyle}
                buttonStyle={styles.Button}
                onPress={() => navigation.navigate('ModalResetPassword')}
                titleStyle={styles.ButtonTitleStyle}
              />
              <Button
                title="Trocar Senha"
                loadingProps={styles.ButtonTitleStyle}
                buttonStyle={styles.Button}
                onPress={() => navigation.navigate('ModalResetPassword')}
                titleStyle={styles.ButtonTitleStyle}
              />
              <Button
                title="Enviar Duvida / Sugestão"
                loadingProps={styles.ButtonTitleStyle}
                buttonStyle={styles.Button}
                onPress={() => navigation.navigate('ModalResetPassword')}
                titleStyle={styles.ButtonTitleStyle}
              />

              <Button
                title="Desconectar"
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={styles.ButtonLogOut}
                titleStyle={styles.ButtonTitleStyle}
                onPress={() => logOut()}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 5,
    marginBottom: 10,
    top: 5
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  bodyPanel: {
    top: '6%',
    left: '5%',
    width: '90%',
    height: 400,
    backgroundColor: 'rgba(169,169,169,0.5)',
    borderRadius: 30
  },
  bodyHeader: {
    height: 90,
    paddingTop: 10,
    marginBottom: 30,
    backgroundColor: 'transparent',
    borderTopColor: 'rgba(0,0,0,0.5)',
    borderTopWidth: 6
  },
  Labels: {
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 5,
    // textAlign: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold'
  },
  LabelsTitle: {
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    color: 'rgba(0,0,0,0.5)'
  },
  PanelContent: {
    display: 'flex',
    width: '90%',
    fontSize: 1.3,
    left: 15,
    top: 7,
    right: 10,
    bottom: 1,
    backgroundColor: 'transparent'
  },
  Input: {
    marginTop: 5,
    marginBottom: -2,
    fontSize: 20
  },
  Button: {
    marginTop: 20,
    borderRadius: 25,
    elevation: 10,
    fontSize: 1.3,
    fontWeight: 'bold',
    backgroundColor: 'rgb(128,128,0)'
  },
  ButtonLogOut: {
    marginTop: 20,
    borderRadius: 25,
    elevation: 10,
    fontSize: 1.3,
    fontWeight: 'bold',
    backgroundColor: 'rgb(178,34,34)'
  },
  ButtonTitleStyle: {
    fontWeight: '100',
    fontSize: 20,
    color: 'white'
  }
})
