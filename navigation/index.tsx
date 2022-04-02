/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/Modal/ModalScreen'
import SignUpScreen from '../screens/SignUpScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import HomeScreen from '../screens/HomeScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import Login from '../screens/LoginScreen'
import { AuthToken, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import TabProfileScreen from '../screens/ProfileScreen'
import TabMessageScreen from '../screens/MessageScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from 'react-native-elements'
import ModalResetPassword from '../screens/Modal/ModalResetPassword'
// import { getRawToken } from '../src/utils/Utils'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          name="ModalSignUp"
          component={SignUpScreen}
          options={{
            title: 'Voltar ',
            headerStyle: {
              backgroundColor: 'rgba(34, 193, 195, 1)'
            }
          }}
        />
        <Stack.Screen
          name="ModalResetPassword"
          component={ModalResetPassword}
          options={{
            title: 'Voltar ',
            headerStyle: {
              backgroundColor: 'rgba(34, 193, 195, 1)'
            }
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  const [token, setToken] = React.useState<AuthToken>()
  const [forgot, setForgot] = React.useState()

  console.log('Checando status do token:')
  console.log(token)

  if (!token) {
    console.log('NÃO AUTENTICADO,INDO PARA PAGINA DE LOGIN')
    return <Login setToken={setToken} setForgot={setForgot} />
  }

  // return <Login setToken={setToken} setForgot={setForgot} />

  const customHeaderStyle = {
    headerStyle: {
      backgroundColor: 'rgba(34, 193, 195, 1)',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomColor: 'red',
      height: 100
    },
    tabBarStyle: {
      backgroundColor: 'rgba(253, 187, 45, 1)'
    }
  }

  const customTittleBar = {
    fontSize: 25,
    color: 'black'
  }

  return (
    <BottomTab.Navigator
      initialRouteName="TabInicio"
      screenOptions={{
        tabBarInactiveTintColor: Colors[colorScheme].text,
        tabBarActiveTintColor: Colors[colorScheme].background
      }}
    >
      <BottomTab.Screen
        name="TabInicio"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabInicio'>) => ({
          title: 'Inicio',
          headerTitleStyle: customTittleBar,
          headerStyle: {
            backgroundColor: 'rgba(34, 193, 195, 1)',
            height: 100
          },
          tabBarStyle: {
            backgroundColor: 'rgba(253, 187, 45, 1)'
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="TabMensagem"
        component={TabMessageScreen}
        options={{
          title: 'Mensagens',
          headerStyle: customHeaderStyle.headerStyle,
          headerTitleStyle: customTittleBar,
          tabBarStyle: customHeaderStyle.tabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />
        }}
      />
      <BottomTab.Screen
        name="TabAdicionar"
        component={TabTwoScreen}
        options={{
          title: 'Criar Chat',
          headerStyle: customHeaderStyle.headerStyle,
          headerTitleStyle: customTittleBar,
          tabBarStyle: customHeaderStyle.tabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />
        }}
      />
      <BottomTab.Screen
        name="TabPerfil"
        children={() => <TabProfileScreen setToken={setToken} />}
        options={{
          title: 'Minha Conta',
          headerStyle: customHeaderStyle.headerStyle,
          headerTitleStyle: customTittleBar,
          tabBarStyle: customHeaderStyle.tabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
