import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '../../components/Themed'
import { AuthToken } from '../../types'
import AxiosRequest from '../../src/utils/AxiosRequest'
import { Button, Input } from 'react-native-elements'
import { useState } from 'react'

const submitPassrd = async (password: string, pswd: string, setPass: any, setPassConfirm: any) => {
  const tokenString: AuthToken = JSON.parse(await AsyncStorage.getItem('token'))
  if (password === pswd && tokenString) {
    await AxiosRequest.put(
      `/users/${tokenString.id}/newpassword`,
      { password: pswd },
      { headers: { Authorization: `${tokenString.tokenType} ${tokenString.accessToken}` } }
    )
      .then(() => {
        alert('Senha alterada com sucesso')

        setPass()
        setPassConfirm()
      })
      .catch(() => {
        alert('Problemas Técnicos ao trocar a senha, favor tentar novamente')
      })
  }
}

export default function ModalResetPassword() {
  const [newPass, setNewPass] = useState<string>()
  const [passConfirm, setPassConfirm] = useState<string>()

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(34, 193, 195, 1)', 'rgba(253, 187, 45, 1)']}
        style={styles.bodyScreenBackGround}
      ></LinearGradient>
      <Text style={styles.title}>Troca de Senha</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/Modal/ModalScreen.tsx" /> */}
      <View style={styles.bodyPanel}>
        <Text style={styles.titleInput}>Digite a nova senha</Text>
        <Input
          style={styles.Input}
          onChangeText={e => setNewPass(e)}
          value={newPass}
          placeholder="Digite a senha"
        />

        <Text style={styles.titleInput}>Confirme a senha</Text>
        <Input
          style={styles.Input}
          value={passConfirm}
          onChangeText={e => setPassConfirm(e)}
          placeholder="Repita a senha"
        />
      </View>

      <Button
        title="Alterar senha"
        loadingProps={styles.ButtonTitleStyle}
        buttonStyle={styles.ButtonLogOut}
        onPress={() => submitPassrd(newPass, passConfirm, setNewPass, setPassConfirm)}
        titleStyle={styles.ButtonTitleStyle}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    top: -10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  separator: {
    top: -10,
    marginVertical: 20,
    height: 1.5,
    width: '80%'
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  bodyPanel: {
    left: '1%',
    width: '80%',
    height: 300,
    backgroundColor: 'rgba(169,169,169,0.4)',
    borderRadius: 30
  },
  Input: {
    marginTop: 5,
    marginBottom: -2,
    fontSize: 20
  },
  titleInput: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    fontSize: 23,
    textAlign: 'center'
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
