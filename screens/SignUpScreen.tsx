import React, { useState } from 'react'
import { Keyboard, Linking, ScrollView, StyleSheet } from 'react-native'
import { Button, Text, Input, Divider } from 'react-native-elements'
import { View } from '../components/Themed'
import DateTimePicker from '@react-native-community/datetimepicker'

import { LinearGradient } from 'expo-linear-gradient'

import AxiosRequest from '../src/utils/AxiosRequest'
import { User } from '../types'

const URL_AUTH_SPRING = '/auth/create'
const URL_OAUTH2 = '/oauth2/authenticate'

async function createUser(
  credentials: any,
  setErroActive: any,
  setErroConexao: any,
  path: string,
  setSpinActive: any
) {
  console.log('tentando conexão com o servidor')
  console.log(credentials)
  return AxiosRequest.post(path, credentials, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(error => {
      setSpinActive(false)
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

export default function SignUpScreen({ setToken, setForgot }: any) {
  const [name, setName] = useState<string>()
  const [surname, setSurname] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [birth, setBirth] = useState<Date>()
  const [password, setPassword] = useState<string>()
  const [erroActive, setErroActive] = useState(false)
  const [erroConexao, setErroConexao] = useState(false)
  const [spinActive, setSpinActive] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [date, setDate] = useState(new Date(Date.now()))
  const [mode, setMode] = useState<any>('date')
  const [show, setShow] = useState(false)

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
    setBirth(currentDate.toLocaleDateString())
    console.log('aniversario :')
    console.log(birth)
  }

  const showMode = (currentMode: any) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const responseFacebook = () => {
    console.log('responseFB')
  }
  const responseGoogle = () => {
    console.log('responseGoogle')
  }

  const handleSubmit = async () => {
    setSpinActive(true)
    console.log('inciando Criação de usuario com o servidor')

    const token = await createUser(
      {
        name,
        surname,
        email,
        birth,
        password
      },
      setErroActive,
      setErroConexao,
      URL_AUTH_SPRING,
      setSpinActive
    )
    setSpinActive(false)
    setButtonDisabled(true)
    console.log('token')
    console.log(token)
    alert('Cadastro Realizado com Sucesso')
  }

  function changePermission() {
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
        <ScrollView>
          <View style={{ backgroundColor: 'transparent', marginLeft: 6, marginRight: 6 }}>
            <Text style={styles.title}>Cadastro </Text>
            <Text style={styles.subTitle}>
              Por favor, preencha o formulário abaixo para continuar.{' '}
            </Text>
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={{ fontSize: 20 }}>Seu Nome: </Text>

              <Input
                style={{ fontSize: 20 }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                onChangeText={e => setName(e)}
                placeholder="Informe seu Nome"
              />

              <View style={{ backgroundColor: 'transparent', flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'transparent', flex: 2 }}>
                  <Text style={styles.Labels}>Sobrenome: </Text>
                  <Input onChangeText={value => setSurname(value)} placeholder="Sobrenome" />
                </View>
                <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                  <Text style={styles.Labels}>Idade: </Text>
                  <Input
                    onPressOut={showDatepicker}
                    style={{ flex: 1, borderStartColor: 'red' }}
                    placeholder="Data"
                    value={birth}
                  />
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      dateFormat={'day month year'}
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>

              <Text style={styles.Labels}>Endereço de email: </Text>
              <Input
                style={styles.Input}
                onChangeText={value => setEmail(value)}
                placeholder="email@email.com"
                onFocus={() => changePermission()}
              />
              <Text style={styles.Labels}>Informe uma senha: </Text>
              <Input
                style={styles.Input}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                onChangeText={e => setPassword(e)}
                placeholder="****"
              />

              {/* <View> */}
              <Button
                title="Realizar Cadastro"
                disabled={buttonDisabled}
                loading={spinActive}
                style={{ display: 'flex', justifyContent: 'center' }}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                  backgroundColor: 'rgba(111, 202, 186, 1)',
                  borderRadius: 25
                }}
                titleStyle={{ fontWeight: '200', fontSize: 23, color: 'black' }}
                onPress={() => handleSubmit()}
              />

              {erroConexao && (
                <View class-name="validation">
                  <Text>Falha de conexão com o servidor, tente novamente em instantes</Text>
                </View>
              )}
              {/* </View> */}
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
    textAlign: 'left',
    letterSpacing: 2,

    top: 5
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 25,
    fontWeight: 'bold'
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  Labels: {
    fontSize: 20,
    marginBottom: 5
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
  }
})
