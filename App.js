import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CreateEvent from './src/pages/CreateEvent.js'
import Events from './src/pages/Events.js'
import Register from './src/profiles/Register.js'
import Login from './src/profiles/Login.js'
import Profile from './src/profiles/Profile.js'

import axios from 'axios'

require('./src/bootstrap.js')

axios.defaults.baseURL = 'http://api.lds.test/api' // process.env.API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');;//"Bearer 3|EoJJ7AijUwpuCaVz5QBW2MKm7pkLV7LePXdY3eEW";
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
            name="CreateEvent"
            component={Profile}
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
    alignItems: 'stretch'
    // justifyContent: 'center'
  },

  text: {
    fontSize: 30
  },

  centerBox: {
    width: 'auto',
    height: 600,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // justifyContent: 'top',
    backgroundColor: 'orange'
  },

  insideBox: {
    flex: 3

    // width: 200,
    // height: 50
    // padding: 25
  },

  insideView: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
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
