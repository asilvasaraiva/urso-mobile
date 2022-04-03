import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

export default function TabCreacteChat() {
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
          <Text style={styles.title}>Criar Chat</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.LabelsTitle}>Espaço destinado a criação de um novo Chat</Text>
          {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
        </View>
      </ImageBackground>
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
    top: 0,
    bottom: 0
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
