import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Text, View } from '../components/Themed'
import { RootStackScreenProps } from '../types'

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(34, 193, 195, 1)', 'rgba(253, 187, 45, 1)']}
        style={styles.bodyScreenBackGround}
      ></LinearGradient>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  bodyScreenBackGround: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -30,
    bottom: 0
  }
})
