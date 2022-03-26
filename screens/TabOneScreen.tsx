import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { List } from '../components/List/List';

export interface User {
  id: number
  name: string
  qtdProdutos: number
}




export default function HomeScreen({ navigation }: RootTabScreenProps<'TabInicio'>) {
  
  const [user, setUser] = useState<User>()

  const getList = async () => {
    const usr:User =  await List('/profile')
    
    if (usr) {
      setUser(usr)      
    } 
  }
  
  useEffect(() => {
    getList()
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagina Inicial </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Seja Bem vindo  {user?.name} </Text>
    
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
