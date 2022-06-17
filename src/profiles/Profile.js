import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import appStyles, {appPadding,appMargin,primaryColor} from '../appStyles'
import AppField from '../components/AppField'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'

import { useSelector, useDispatch } from 'react-redux';
import { setUser,setToken } from "../redux/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {

  const { user, token, auth } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  const [thing,setThing] = useState(null);

  const [profile, setProfile] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    Auth.load(() => {
      axios.get('profile').then(({data}) => {
      setProfile(data.data);
      setThing(JSON.stringify(data));

    }).catch((error) => {

    console.log("DUMP OUT TO A FILE");

      // console.log(error.response.status)
      onAuthFail(error,navigation);
    });
  })


},[])

const onAuthFail = (error,navigation) => {
  if(error?.response?.status == 401){
    Auth.clear();

    navigation.replace('Login');
  }
}


const logout = () => {
    // dispatch(removeAuth());
    Auth.clear();
    navigation.replace('Login');
  }




  return (
    <View style={profileStyles.container}>

      <Text style={profileStyles.welcome}>Welcome {profile?.name}, Let's Do Stuff</Text>


      <AppField label="Name" content={profile?.name}></AppField>
      <AppField label="Email" content={profile?.email}></AppField>
      {profile?.phone ? <AppField label="Phone Number" content={profile?.phone}></AppField> : null}

      <Button onPress={logout} title="Logout"></Button>

      </View>
      )
  }

  const profileStyles = StyleSheet.create({
    container: {
      flex: 1,
    // maxWidth: 400,
    // padding: 300,
    backgroundColor: 'lightgrey',
    alignItems: 'flex-start',
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
