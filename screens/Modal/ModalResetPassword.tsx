import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '../../components/Themed'

const changePasswd = () => {
  return (
    <form id="passrwd-form">
      <div className="pusher">
        <div className="ui small form ">
          <div className="two fields">
            <div className="field">
              <label>Nova senha</label>
              <input
                placeholder="digite a senha"
                type="text"
                onChange={e => (this.passwrd = e.target.value)}
                onFocus={() => (this.erroActive = false)}
              />
            </div>
            <div className="field">
              <label>Confirme a senha</label>
              <input
                placeholder="confirme a senha"
                type="text"
                onChange={e => (this.pswd = e.target.value)}
              />
            </div>
          </div>
          <div
            className="ui submit button right "
            onClick={e => this.submitPassrd(e, this.passwrd, this.pswd)}
          >
            Enviar
          </div>
        </div>
      </div>
    </form>
  )
}

const submitPassrd = async (e, password, pswd) => {
  e.preventDefault()
  if (password === pswd) {
    const tokenString = JSON.parse(sessionStorage.getItem('token'))
    let userID = tokenString.id
    const profile = await AxiosRequest.put(
      `/users/${userID}/newpassword`,
      { password: pswd },
      { headers: { Authorization: this.state.Authorization } }
    )
    document.getElementById('passrwd-form').reset()
    this.setState({ erroActive: true })
  } else {
    this.setState({ erroActive: false })
  }
}

export default function ModalResetPassword() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(34, 193, 195, 1)', 'rgba(253, 187, 45, 1)']}
        style={styles.bodyScreenBackGround}
      ></LinearGradient>
      <Text style={styles.title}>Modal Reset de Senha</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/Modal/ModalScreen.tsx" /> */}

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
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -30,
    bottom: 0
  }
})
