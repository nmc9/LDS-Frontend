require('./src/bootstrap.js')


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

const Stack = createNativeStackNavigator()

export default function App () {

  return (
    <Provider store={Store}>
    <View style={styles.container}>

    {/*{ Platform.OS === 'web' ? <WebNav></WebNav> : <></> }*/}

    <NavigationContainer>
    <Stack.Navigator>

   

    <Stack.Screen
    name="Profile"
    component={Profile}
    // initialParams={{ user }}
    options={{ title: 'Profile' }}
    />

    <Stack.Screen
    name="Login"
    component={Login}
    // initialParams={{ user }}
    options={{ title: 'Login' }}
    />

     <Stack.Screen
    name="Register"
    component={Register}
    // initialParams={{ user }}
    options={{ title: 'Register' }}
    />


    </Stack.Navigator>
    </NavigationContainer>

    {/*{ Platform.OS !== 'web' ? <MobileNav></MobileNav> : <></> }*/}
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
