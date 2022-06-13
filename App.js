import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Platform, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CreateEvent from './src/pages/CreateEvent.js'
import Register from './src/profiles/Register.js'
import Login from './src/profiles/Login.js'
import Profile from './src/profiles/Profile.js'

import WebNav from "./src/WebNav";
import MobileNav from "./src/MobileNav";


// Import Redux
import { Provider } from "react-redux";
import {Store} from "./src/redux/store";

import axios from 'axios'

require('./src/bootstrap.js')

axios.defaults.baseURL = 'http://api.lds.test/api' // process.env.API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');;//"Bearer 3|EoJJ7AijUwpuCaVz5QBW2MKm7pkLV7LePXdY3eEW";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common.Accept = 'application/json'
window.axios = axios

const Stack = createNativeStackNavigator()

export default function App () {


  // const [user, setUser] = useState({ id: 1, name: 'Test', token: 'ASDB123' })

  // const refreshToken = () => {
  //   const _user = { id: 1, name: 'Joe Smith', token: 'ASDB123' }
  //   _user.token = '123ABC'
  //   setUser(_user)
  // }

  return (
    <Provider store={Store}>
    <View style={styles.container}>

    { Platform.OS === 'web' ? <WebNav></WebNav> : <></> }

    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
    name="Login"
    component={Login}
    // initialParams={{ user }}
    options={{ title: 'Login' }}
    />
    <Stack.Screen
    name="ViewProfile"
    component={Profile}
    // initialParams={{ user }}
    options={{ title: 'Profile' }}
    />
    
    <Stack.Screen
    name="RegisterProfile"
    component={Register}
    // initialParams={{ user }}
    options={{ title: 'Register' }}
    />

    </Stack.Navigator>
    </NavigationContainer>

    { Platform.OS !== 'web' ? <MobileNav></MobileNav> : <></> }
    </View>
    </Provider>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
    alignItems: 'stretch',
    ...Platform.select({
      ios: {
        backgroundColor: 'red'
      },
      android: {
        backgroundColor: 'green'
      },
      'firefox': {
        'backgroundColor': 'orange',
      },
      'web': {
        backgroundColor: 'pink',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue'
      }
    })
    // justifyContent: 'center'
  },

  text: {
    fontSize: 30
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
