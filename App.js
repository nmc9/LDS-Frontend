import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CreateEvent from './src/pages/CreateEvent.js'
import Events from './src/pages/Events.js'
import Register from './src/profiles/Register.js'


import axios from 'axios'

require('./src/bootstrap.js')

axios.defaults.baseURL = 'http://api.lds.test/api' // process.env.API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common.Accept = 'application/json'
window.axios = axios

const Stack = createNativeStackNavigator()

export default function App () {
  const [user, setUser] = useState({ id: 1, name: 'Test', token: 'ASDB123' })

  const refreshToken = () => {
    const _user = { id: 1, name: 'Joe Smith', token: 'ASDB123' }
    _user.token = '123ABC'
    setUser(_user)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.name}</Text>
      <Button title="Refresh Tokens" onPress={refreshToken}></Button>
      <StatusBar style="auto" />
      <Text style={styles.text}>{user.token}</Text>
    {/*  <View style={styles.centerBox}>
        <Text style={styles.insideBox}>Hello, . You are  </Text>
        <Text style={styles.insideBox}>Hello, . You are  </Text>
        <Text style={styles.insideBox}>Hello, . You are  </Text>
        <View style={styles.insideView}>
          <Text>Bottom</Text>
          <Text>Right</Text>

        </View>
      </View>*/}
{/*      // <Text style={debugStyle.container}>debugStyle</Text>
*/}
      {/*<View style={debugStyle.container}>*/}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
            name="CreateEvent"
            component={Register}
            initialParams={{ user }}
            options={{ title: 'Register' }}
            />
          <Stack.Screen name="Events" component={Events} />
          </Stack.Navigator>
        </NavigationContainer>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'stretch',
    padding: 10,
    // justifyContent: 'center'
  },

  text: {
    fontSize: 30
  },

  centerBox:{
    width:'auto',
    height: 600,
    alignItems:'flex-end',
    justifyContent: 'space-between',
    // justifyContent: 'top',
    backgroundColor: 'orange'
  },

  insideBox:{
        flex: 3,

    //width: 200,
    //height: 50
    //padding: 25
  },

  insideView:{
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    width: 200,
    height: 50,
    backgroundColor: 'purple'
  }
})

const debugStyle = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'pink'
  }
})