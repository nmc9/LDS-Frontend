import React, {useEffect, useState} from 'react'
import { StyleSheet,Text,View,Button,TextInput,Pressable } from 'react-native';
import appStyles from '../appStyles';
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

const Register = ({ route, navigation }) => {

  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [email, onChangeEmail] = useState("");

  const [usernameError,onChangeUsernameError] = useState(null)

  const onClear = () => {
    console.log("clear")
    onChangeUsername("")
    onChangePassword("")
    onChangeEmail("")

  }
  const onSubmit = () => {
    axios.post('register',{
      name: username,
      email: email,
      password: password,
      device_name: 'Test Device'
    })
    .then(({data}) => {

      //Take this data and store it as the user token
      console.log(data);
    }).catch((error) => {
      onChangeUsernameError(error.response.data.errors.name)
    })
  }

  return (
    <View style={registerStyles.container}>

    <AppInput 
    error={usernameError}
    onChangeText={onChangeUsername}
    value={username}
    placeholder="Username"
    ></AppInput>

    <AppInput error="There was an error"
    onChangeText={onChangeEmail}
    value={email}
    placeholder="Email"
    textContentType="emailAddress"
    autoComplete="email"
    keyboardType="email-address"
    ></AppInput>


    <AppInput error="There was an error"
    onChangeText={onChangePassword}
    value={password}
    placeholder="Password"
    autoComplete="password-new"
    secureTextEntry={true}
    textContentType="newPassword"
    ></AppInput>



    <View style={registerStyles.buttonHolder}>
    <AppButton content="Clear" onPress={onClear}>
    </AppButton>
    <AppButton content="Register" onPress={onSubmit}>
    </AppButton>



    </View>
    </View>
    );
}

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    // maxWidth: 400,
    // padding: 300,
    backgroundColor: "lightgrey",
    alignItems:'left',
    justifyContent:'center'
  },

  label:{
    paddingTop:10,
    paddingLeft:20,
    alignSelf:'flex-start',
    fontSize: 16,
  },

  buttonHolder:{
    padding: 15,
    flexDirection:'row',
    flexWrap: "wrap",        // backgroundColor: "green",

    paddingTop:0,

    paddingBottom:0,
  },



  
})

export default Register;

