import React, {useEffect, useState} from 'react'
import { StyleSheet,Text,View,Button,TextInput,Pressable } from 'react-native';
import appStyles from '../appStyles';
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

const Login = ({ route, navigation }) => {


  const data = {
    name:"",
    email:"",
    password:"",
    phone:"",
    device_name:"Test",
  };
  const [form,_setForm] = useState(data);
  const [errors,setErrors] = useState({});

  const setForm = (_key,_value) => {
    _setForm({...form, [_key]: _value});
  }

  const onClear = () => {
    _setForm(data);
    setErrors({})
  }

  const onSubmit = () => {
    axios.post('register',form)
    .then(({data}) => {
      onClear();
      //Take this data and store it as the user token
      console.log(data);
    }).catch((error) => {

      let _errors = error?.response?.data?.errors;
      if(!!_errors){
        setErrors(_errors);
      }
    })
  }

  return (
    <View style={registerStyles.container}>
    <Text>{JSON.stringify(form)}</Text>
    <AppInput 
    error={errors.name}
    onChangeText={(e) => {setForm('name',e);}}
    value={form.name}
    placeholder="Username"
    ></AppInput>

    <AppInput
    onChangeText={(e) => {setForm('email',e);}}
    value={form.email}
    error={errors.email}

    placeholder="Email"
    textContentType="emailAddress"
    autoComplete="email"
    keyboardType="email-address"
    ></AppInput>


    <AppInput
    onChangeText={(e) => {setForm('password',e);}}
    value={form.password}
    error={errors.password}

    placeholder="Password"
    autoComplete="password-new"
    secureTextEntry={true}
    textContentType="newPassword"
    ></AppInput>

    <AppInput
    onChangeText={(e) => {setForm('phone',e);}}
    value={form.phone}
    error={errors.phone}

    placeholder="Phone - Optional"
    dataDetectorTypes="phoneNumber"
    keyboardType="phone-pad"
    textContentType="telephoneNumber"
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

