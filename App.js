require('./src/bootstrap.js')


import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Platform, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Register from './src/profiles/Register.js'
import Login from './src/profiles/Login.js'
import Profile from './src/profiles/Profile.js'
import SearchUsers from './src/profiles/SearchUsers.js'
import SearchFriends from "./src/profiles/SearchFriends.js"
import SearchEvents from './src/events/SearchEvents.js'

import Event from './src/events/Event.js'
import CreateEvent from './src/events/CreateEvent.js'
import EditEvent from './src/events/EditEvent.js'

import SearchBringables from './src/bringables/SearchBringables.js'
import Bringable from './src/bringables/Bringable.js'
import CreateBringable from './src/bringables/CreateBringable.js'
import ManageBrinable from './src/bringables/ManageBringable.js'



import SendInvitations from "./src/invitations/SendInvitations.js";

import WebNav from "./src/WebNav";
import MobileNav from "./src/MobileNav";


// Import Redux
import { Provider } from "react-redux";
import {Store} from "./src/redux/store";

const Stack = createNativeStackNavigator()

import { NativeBaseProvider, Box } from "native-base";

export default function App () {

  return (
    <Provider store={Store}>
    <NativeBaseProvider>

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

         <Stack.Screen
    name="Event"
    component={Event}
    // initialParams={{ user }}
    options={{ title: 'Event' }}
    />

         <Stack.Screen
    name="EditEvent"
    component={EditEvent}
    // initialParams={{ user }}
    options={{ title: 'Edit Event' }}
    />

         <Stack.Screen
    name="CreateEvent"
    component={CreateEvent}
    // initialParams={{ user }}
    options={{ title: 'Create Event' }}
    />


         <Stack.Screen
    name="CreateBringable"
    component={CreateBringable}
    // initialParams={{ user }}
    options={{ title: 'Create Bringable' }}
    />


        <Stack.Screen
    name="SearchBringables"
    component={SearchBringables}
    // initialParams={{ user }}
    options={{ title: 'Search Bringables' }}
    />   

           <Stack.Screen
    name="ManageBrinable"
    component={ManageBrinable}
    // initialParams={{ user }}
    options={{ title: 'Manage Bringables' }}
    />  


    <Stack.Screen
    name="SearchUsers"
    component={SearchUsers}
    // initialParams={{ user }}
    options={{ title: 'Search Users' }}
    />   

    <Stack.Screen
    name="SearchEvents"
    component={SearchEvents}
    // initialParams={{ user }}
    options={{ title: 'Search Events' }}
    />   



    <Stack.Screen
    name="SearchFriends"
    component={SearchFriends}
    // initialParams={{ user }}
    options={{ title: 'Search Friends' }}
    />   



    <Stack.Screen
    name="SendInvitations"
    component={SendInvitations}
    // initialParams={{ user }}
    options={{ title: 'Event Invitations' }}
    />

    </Stack.Navigator>
    </NavigationContainer>

    {/*{ Platform.OS !== 'web' ? <MobileNav></MobileNav> : <></> }*/}
    </View>
        </NativeBaseProvider>

    </Provider>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
    alignItems: 'stretch',
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: 'red'
    //   },
    //   android: {
    //     backgroundColor: 'green'
    //   },
    //   'web': {
    //     backgroundColor: 'pink',
    //   },
    //   default: {
    //     // other platforms, web for example
    //     backgroundColor: 'blue'
    //   }
    // })
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
