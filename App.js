import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CreateEvent from './src/pages/CreateEvent.js'
import Events from './src/pages/Events.js'

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
    const _user = { id: 1, name: 'Test', token: 'ASDB123' }
    _user.token = '123ABC'
    setUser(_user)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.name}</Text>
      <Button title="Refresh Tokens" onPress={refreshToken}></Button>
      <StatusBar style="auto" />
      <Text style={styles.text}>{user.token}</Text>
          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="CreateEvent"
              component={CreateEvent}
              initialParams={{ user }}
              options={{ title: 'Create Evesdnt' }}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 30
  }
})
