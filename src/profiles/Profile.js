import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'

import { useSelector, useDispatch } from 'react-redux';


const Profile = ({ route, navigation }) => {

  const { user, token } = useSelector(state => state.userReducer);

  const [profile, setProfile] = useState({})
  const [errors, setErrors] = useState({})


  /* Need to look at this */
  // useEffect(() => {

  //   if(!localStorage.getItem('token')){
  //     navigation.replace('Login')
  //   }
  //   axios.get('profile')
  //   .then(({ data }) => {
  //     console.log(data.data);
  //     setProfile(data.data);

  //   }).catch((error) => {
  //     const _errors = error?.response?.data?.errors
  //     if (_errors) {
  //       setErrors(_errors)
  //     }

  //     setProfile({id:13,name:"NICK",email:"failed@gmailcomc"})
  //   })
  // }, [])

  return (
    <View style={profileStyles.container}>

    <Text>{JSON.stringify(user)}</Text>
    <Text>{token}</Text>

    <Text style={profileStyles.welcome}>Welcome {profile.name}, Let's Do Stuff</Text>


    <AppField label="Name" content={profile.name}></AppField>
    <AppField label="Email" content={profile.email}></AppField>
    {profile.phone ? <AppField label="Phone Number" content={profile.phone}></AppField> : null}

    </View>
    )
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    // maxWidth: 400,
    // padding: 300,
    backgroundColor: 'lightgrey',
    alignItems: 'left',
    justifyContent: 'center'
  },

  welcome:{
    margin:appMargin,
    padding:appPadding,
    fontSize:"600",
    color:primaryColor,
    fontSize:32,
    borderBottomWidth:2,
    borderColor:primaryColor
  }

})

export default Profile
