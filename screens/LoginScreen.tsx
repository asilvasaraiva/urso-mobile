import React, { useState } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { Button, Text, Input, Divider } from 'react-native-elements'
import { View } from '../components/Themed'

import * as S from './Styles'

import { LinearGradient } from 'expo-linear-gradient'

import AxiosRequest from '../src/utils/AxiosRequest'
// import Spinner from '../Spinner';
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

// import { Text } from '../components/Themed'
const URL_AUTH_SPRING = '/auth/login/'
const URL_OAUTH2 = '/oauth2/authenticate'

async function loginUser(credentials: any, setErroActive: any, setErroConexao: any, path: string) {
  return AxiosRequest.post(path, JSON.stringify(credentials), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(error => {
      if (error !== null) {
        let status = error.status
        if (status === 401) {
          console.log('usuário ou senha inválido')
          setErroActive(true)
        }
      } else {
        console.log('Falha de conexão com o servidor, tente novamente em instantes')
        setErroConexao(true)
      }
    })
}

export default function Login() {
  const [username, setUserName] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [erroActive, setErroActive] = useState(false)
  const [erroConexao, setErroConexao] = useState(false)
  const [spinActive, setSpinActive] = useState(false)
  const [isNotAdmin, setIsNotAdmin] = useState(false)

  const responseFacebook = () => {
    console.log('responseFB')
  }
  const responseGoogle = () => {
    console.log('responseGoogle')
  }

  const handleSubmit = () => {
    alert('funfou')
    console.log('handleSubmit')
  }

  const validateTokent = () => {
    console.log('validateTokent')
  }

  function changePermission() {
    setIsNotAdmin(false)
    setErroActive(false)
    setErroConexao(false)
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(34, 193, 195, 1)', 'rgba(253, 187, 45, 1)']}
        style={styles.bodyScreenBackGround}
      >
        <View style={styles.bodyPanel}>
          <Text style={styles.title}>Bem vindo !! </Text>
          <View style={styles.PanelContent}>
            <View>
              <Text style={styles.Labels}>Meu email: </Text>
            </View>
            <Input
              style={styles.Input}
              onChangeText={value => setUserName(value)}
              placeholder="email@email.com"
              onFocus={() => changePermission()}
            />
            <View>
              <Text style={styles.Labels}>Minha senha: </Text>
            </View>

            <Input style={styles.Input} onChangeText={e => setPassword(e)} placeholder="****" />
            <View>
              <Text
                style={styles.LabelsForgotPass}
                onPress={() => {
                  alert('Esqueceu senha pressionado')
                }}
              >
                Esqueceu a senha?
              </Text>
            </View>

            <View>
              <Button
                title="Log in"
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                  backgroundColor: 'rgba(111, 202, 186, 1)',
                  borderRadius: 25
                }}
                titleStyle={{ fontWeight: '200', fontSize: 23, color: 'black' }}
                containerStyle={{
                  marginHorizontal: 30,
                  height: 50,
                  width: 250,
                  marginVertical: 10
                }}
                onPress={() => handleSubmit()}
              />

              {erroActive && (
                <View class-name="validation">
                  <Text>Credenciais inválidas</Text>
                </View>
              )}
              {isNotAdmin && (
                <View class-name="validation">
                  <Text>Conta informada não é um adminstrador</Text>
                </View>
              )}
              {erroConexao && (
                <View class-name="validation">
                  <Text>Falha de conexão com o servidor, tente novamente em instantes</Text>
                </View>
              )}
              <View style={styles.DividerVertical}>
                <Text>Google</Text>
                <Divider orientation="vertical" />
                <Text>Facebook</Text>
              </View>
            </View>
          </View>
        </View>
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
    top: 5
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  bodyPanel: {
    top: '15%',
    left: '10%',
    width: '80%',
    height: '65%',
    backgroundColor: '#ffffff',
    borderRadius: 30
  },
  Labels: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  LabelsForgotPass: {
    fontSize: 15,
    textAlign: 'right',
    marginBottom: 15,
    marginTop: -10,
    fontWeight: 'bold'
  },
  PanelContent: {
    display: 'flex',
    width: '90%',
    fontSize: 1.3,
    left: 15,
    right: 10,
    top: 10,
    bottom: 1
  },
  Input: {
    marginTop: 5,
    marginBottom: -2,
    fontSize: 20
  },
  Button: {
    marginTop: 20,
    borderRadius: 25,
    width: '80%',
    height: '40%',
    fontSize: 1.3,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgb(34, 193, 195)'
  },
  DividerVertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

// export default function Login({ setToken, setForgot }) {

//     const responseFacebook = async (response) => {
//         console.log(response);
//         let name = response.name.split(" ")
//         let oauthRequest = {
//             "username": response.email,
//             "provider": response.graphDomain,
//             "name": name[0],
//             "surname": name[1],
//             "idProvider": response.userID
//         }
//         const token = await loginUser(oauthRequest, setErroActive, setErroConexao, URL_OAUTH2);
//         validateTokent(token);
//     }

//     const responseGoogle = async (response) => {
//         var profile = response.profileObj;
//         let oauthRequest = {
//             "username": profile.email,
//             "provider": "google",
//             "name": profile.givenName,
//             "surname": profile.familyName,
//             "idProvider": profile.googleId
//         }
//         const token = await loginUser(oauthRequest, setErroActive, setErroConexao, URL_OAUTH2);
//         validateTokent(token);
//     }

//     const handleSubmit = async e => {
//         e.preventDefault();
//         setSpinActive(true);
//         const token = await loginUser({
//             username,
//             password
//         }, setErroActive, setErroConexao, URL_AUTH_SPRING);
//         setSpinActive(false);
//         validateTokent(token);

//     }

//     const validateTokent = (token)=>{
//         if (token !== undefined) {
//             if (token.roles[0] === "ADMIN") {
//                 sessionStorage.setItem('token', JSON.stringify(token));
//                 setToken(token);
//                 history.push("/");
//             } else {
//                 console.log("Usuário não é admin")
//                 setIsNotAdmin(true);
//             }
//         }
//     }

//     if (spinActive) {
//         return <Spinner />;
//     }

//     function teste() {
//         history.push("/forgot");
//         setForgot(true);
//     }

//     return ( //FORM NOVO
//         <div id="loginform">
//             <h3 id="headerTitle">   Bem Vindo!!
//             </h3>
//             <form onSubmit={handleSubmit}>
//                 <div className="row">
//                     <label>
//                         Meu email:
//                     </label>
//                     {/* <div className={`validation ${erroActive ? 'error' : ''}`}> */}
//                     <Input
//                         type="text"
//                         onChange={e => setUserName(e.target.value)}
//                         placeholder="email@email.com"
//                         onFocus={() => changePermission()} />
//                     {/* </div> */}
//                 </div>
//                 <div className="row label-login inline">
//                     <label className="senha">
//                         Minha senha:
//                     </label>
//                     {/* <div className={`validation ${erroActive ? 'error' : ''}`}> */}

//                     {/* </div> */}
//                     <label className="esqueceu-senha forgot-senha" onClick={() => teste()}>Esqueceu a senha?</label>
//                 </div>

//             </form>

//             <div className="ui horizontal divider">
//                 Ou
//             </div>
//             <div className="ui center aligned basic segment">
//                 <FacebookLogin
//                     appId={process.env.REACT_APP_ID_FACEBOOK}
//                     autoLoad={false}
//                     callback={responseFacebook}
//                     fields="name,email"
//                     cssClass="ui circular facebook  button"
//                     icon="fa-facebook"
//                     textButton="  Facebook"
//                 />

//                 <GoogleLogin
//                     clientId={process.env.REACT_APP_ID_GOOGLE}
//                     buttonText="Login"
//                     render={renderProps => (
//                         <button className="ui circular google negative button"
//                             onClick={renderProps.onClick}
//                             disabled={renderProps.disabled}>
//                             <i className="google  icon"></i>
//                             Google
//                         </button>
//                     )}
//                     onSuccess={responseGoogle}
//                     onFailure={responseGoogle}
//                     cookiePolicy={'single_host_origin'}
//                 />
//             </div>
//         </div>
//     )

// }
